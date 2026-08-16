// lib/credits.ts
// Central place for checking/deducting/logging credits — every credit
// mutation goes through here so CreditLog stays consistent with User.credits.
import { prisma } from "./prisma";

export const CREDIT_COSTS = {
  ROUTE_PLAN: 5, // cost per full route-plan request (geocode+route+battery+stations+AI)
};

export class InsufficientCreditsError extends Error {
  constructor(public required: number, public available: number) {
    super(`Insufficient credits: need ${required}, have ${available}`);
    this.name = "InsufficientCreditsError";
  }
}

// ── Check + deduct atomically ──────────────────────────────────────────────
// Uses a transaction with a conditional update so two concurrent requests
// from the same user can't both pass the balance check and overdraw credits.
export async function deductCredits(
  userId: string,
  amount: number,
  reason: string
): Promise<{ balanceAfter: number }> {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.credits < amount) {
      throw new InsufficientCreditsError(amount, user.credits);
    }

    const updated = await tx.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } },
      select: { credits: true },
    });

    await tx.creditLog.create({
      data: {
        userId,
        amount: -amount,
        reason,
        balanceAfter: updated.credits,
      },
    });

    return { balanceAfter: updated.credits };
  });
}

// ── Refund on failure ────────────────────────────────────────────────────
// Call this if a route-plan request fails partway AFTER credits were
// already deducted, so the user isn't charged for a broken request.
export async function refundCredits(
  userId: string,
  amount: number,
  reason: string
): Promise<{ balanceAfter: number }> {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
      select: { credits: true },
    });

    await tx.creditLog.create({
      data: {
        userId,
        amount,
        reason,
        balanceAfter: updated.credits,
      },
    });

    return { balanceAfter: updated.credits };
  });
}

export async function getCreditBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

export async function getCreditHistory(userId: string, limit = 50) {
  return prisma.creditLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}