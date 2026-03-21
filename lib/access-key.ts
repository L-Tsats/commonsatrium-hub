import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { randomUUID } from "crypto";

export async function getOrCreateCurrentAccessKey() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No current user found.");
  }

  const existingKey = await prisma.accessKey.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (existingKey) {
    return existingKey;
  }

  return prisma.accessKey.create({
    data: {
      userId: user.id,
      key: randomUUID(),
    },
  });
}

export async function consumeAccessKey(key: string) {
  const accessKey = await prisma.accessKey.findUnique({
    where: {
      key,
    },
  });

  if (!accessKey) {
    throw new Error("Access key not found.");
  }

  if (accessKey.isConsumed) {
    throw new Error("Access key has already been consumed.");
  }

  return prisma.accessKey.update({
    where: {
      key,
    },
    data: {
      isConsumed: true,
      consumedAt: new Date(),
    },
  });
}