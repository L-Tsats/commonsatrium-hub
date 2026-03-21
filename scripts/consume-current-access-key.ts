import { prisma } from "../lib/prisma";
import { getOrCreateCurrentAccessKey, consumeAccessKey } from "../lib/access-key";

async function main() {
  const currentKey = await getOrCreateCurrentAccessKey();

  console.log("Current key:", currentKey.key);
  console.log("Consumed before:", currentKey.isConsumed);

  const consumed = await consumeAccessKey(currentKey.key);

  console.log("Consumed after:", consumed.isConsumed);
  console.log("Consumed at:", consumed.consumedAt);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });