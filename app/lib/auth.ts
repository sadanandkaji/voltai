// lib/auth.ts
// NextAuth config — Google login backed by the Prisma schema's
// User/Account/Session/VerificationToken models.
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database", // uses the Session model — matches the schema
  },
  callbacks: {
    async session({ session, user }) {
      // Expose id + credits on the session object so the client/API routes
      // don't need a separate DB round trip just to know the user's id.
      if (session.user) {
        (session.user as any).id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { credits: true },
        });
        (session.user as any).credits = dbUser?.credits ?? 0;
      }
      return session;
    },
  },
  events: {
    // New users get their 100 credits from the schema default automatically
    // on creation — no extra logic needed here, but log it for visibility.
    async createUser({ user }) {
      console.log(`New user created: ${user.email} — starting credits: 100`);
    },
  },
  pages: {
    signIn: "/login",
  },
};