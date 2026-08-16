// app/api/vehicles/route.ts
// CRUD for the user's saved vehicle presets (Vehicle model).
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const vehicles = await prisma.vehicle.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ vehicles });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const { label, rangeKm, isDefault = false } = await req.json();

  if (!label || !Number.isFinite(rangeKm)) {
    return NextResponse.json({ error: "label and rangeKm are required" }, { status: 400 });
  }

  // If this one is marked default, unset any existing default first.
  if (isDefault) {
    await prisma.vehicle.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  const vehicle = await prisma.vehicle.create({
    data: { userId, label, rangeKm, isDefault, isPreset: false },
  });

  return NextResponse.json({ vehicle });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const vehicle = await prisma.vehicle.findFirst({ where: { id, userId } });
  if (!vehicle) {
    return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
  }

  await prisma.vehicle.delete({ where: { id } });
  return NextResponse.json({ success: true });
}