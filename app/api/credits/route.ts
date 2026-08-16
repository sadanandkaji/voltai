// app/api/credits/route.ts
// Current balance + recent CreditLog history for the signed-in user.
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getCreditBalance, getCreditHistory } from "../../lib/credits";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const [balance, history] = await Promise.all([
    getCreditBalance(userId),
    getCreditHistory(userId, 30),
  ]);

  return NextResponse.json({ balance, history });
}