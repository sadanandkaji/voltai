// app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

const STARTING_CREDITS = 100;
const CREDITS_PER_TRIP = 50;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      credits: true,
      createdAt: true,
      _count: { select: { savedRoutes: true } },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // CreditLog already records every credit-affecting event with a reason
  // and the resulting balance, so it's a truer "recent activity" feed
  // than re-deriving cost from SavedRoute rows.
  const recentLogs = await prisma.creditLog.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 8,
    select: {
      id: true,
      amount: true,
      reason: true,
      balanceAfter: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    credits: user.credits ?? STARTING_CREDITS,
    creditsPerTrip: CREDITS_PER_TRIP,
    startingCredits: STARTING_CREDITS,
    memberSince: user.createdAt,
    tripsPlanned: user._count.savedRoutes,
    recentActivity: recentLogs.map((l) => ({
      id: l.id,
      reason: l.reason,
      amount: l.amount, // negative = spent, positive = added
      balanceAfter: l.balanceAfter,
      date: l.createdAt,
    })),
  });
}