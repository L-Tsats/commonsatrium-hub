import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          include: { membership: true },
        });

        if (!user) return null;

        const isValidPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isValidPassword) return null;

        return {
          id: String(user.id),
          email: user.email,
          membershipStatus: user.membership?.status ?? "inactive",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "membershipStatus" in user) {
        token.membershipStatus = user.membershipStatus as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.membershipStatus =
          (token.membershipStatus as string | undefined) ?? "inactive";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});