"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type SignupResult =
  | { success: true }
  | { success: false; error: string };

export async function signupAction(
  email: string,
  password: string,
  displayName: string
): Promise<SignupResult> {
  if (!email || !password || !displayName) {
    return { success: false, error: "All fields are required." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      displayName,
      membership: {
        create: {
          status: "inactive",
        },
      },
    },
  });

  return { success: true };
}
