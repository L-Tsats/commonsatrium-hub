import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = {};

  // 1. Check env vars
  checks.DATABASE_URL = process.env.DATABASE_URL ? "set" : "MISSING";
  checks.AUTH_SECRET = process.env.AUTH_SECRET ? "set" : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "set" : "MISSING";
  checks.NEXTAUTH_URL = process.env.NEXTAUTH_URL ? "set" : "MISSING";

  // 2. Check Prisma + DB connection
  try {
    const { prisma } = await import("@/lib/prisma");
    const count = await prisma.user.count();
    checks.prisma = `connected (${count} users)`;
  } catch (err: unknown) {
    checks.prisma = `FAILED: ${err instanceof Error ? err.message : String(err)}`;
  }

  // 3. Check bcrypt
  try {
    const bcrypt = await import("bcryptjs");
    const hash = await bcrypt.hash("test", 4);
    const valid = await bcrypt.compare("test", hash);
    checks.bcrypt = valid ? "working" : "FAILED: compare returned false";
  } catch (err: unknown) {
    checks.bcrypt = `FAILED: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json(checks, { status: 200 });
}
