// app/api/routes/route.ts
// List the current user's saved routes, or delete-all if requested.
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "20", 10), 100);

  const routes = await prisma.savedRoute.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      originName: true,
      destName: true,
      distanceKm: true,
      durationMin: true,
      remainingBattery: true,
      willReachDestination: true,
      aiVerdict: true,
      createdAt: true,
      _count: { select: { chargingStations: true } },
    },
  });

  return NextResponse.json({ routes });
}