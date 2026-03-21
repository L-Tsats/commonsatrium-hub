import { prisma } from "../lib/prisma";

async function main() {
  console.log("Script started");

  const user = await prisma.user.findUnique({
    where: {
      email: "test@commonsatrium.com",
    },
    include: {
      membership: true,
    },
  });

  console.log("User found:", user);

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.membership) {
    throw new Error("Membership not found for test user.");
  }

  const updated = await prisma.membership.update({
    where: {
      id: user.membership.id,
    },
    data: {
      status: "active",
    },
  });

  console.log("Updated membership status to:", updated.status);
}

main()
  .catch((error) => {
    console.error("Script error:", error);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting Prisma");
    await prisma.$disconnect();
  });