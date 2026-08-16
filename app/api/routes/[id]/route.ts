// app/api/routes/[id]/route.ts
// Fetch a single saved route (with its full station list), or delete it.
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const route = await prisma.savedRoute.findFirst({
    where: { id: params.id, userId }, // scoped to the owner — no cross-user access
    include: { chargingStations: true },
  });

  if (!route) {
    return NextResponse.json({ error: "Route not found" }, { status: 404 });
  }

  return NextResponse.json({ route });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const route = await prisma.savedRoute.findFirst({
    where: { id: params.id, userId },
    select: { id: true },
  });

  if (!route) {
    return NextResponse.json({ error: "Route not found" }, { status: 404 });
  }

  // chargingStations cascade-delete automatically (onDelete: Cascade in schema)
  await prisma.savedRoute.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}