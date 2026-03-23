import prisma from "../src/lib/db.ts";

async function main() {
  const event = await prisma.analyticsEvent.create({
    data: {
      eventName: "page_view",
      userId: "test-user-123",
      metadata: {
        page: "dashboard",
        source: "manual-test",
      },
    },
  });

  console.log("✅ Event created:", event);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });