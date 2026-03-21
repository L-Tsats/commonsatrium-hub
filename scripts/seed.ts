import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@commonsatrium.com" },
    update: {
      passwordHash,
      membership: {
        upsert: {
          update: {
            status: "active",
          },
          create: {
            status: "active",
          },
        },
      },
    },
    create: {
      email: "test@commonsatrium.com",
      passwordHash,
      membership: {
        create: {
          status: "active",
        },
      },
    },
    include: {
      membership: true,
    },
  });

  console.log("Seeded user:", user.email);
  console.log("Membership status:", user.membership?.status);
}
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });