import { Router } from "express";
import prisma from "../../lib/db.js";

const router = Router();

router.post("/ingest", async (req, res) => {
  try {
    const { eventName, userId, metadata } = req.body;

    if (!eventName || typeof eventName !== "string") {
      return res.status(400).json({ error: "eventName is required" });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        eventName,
        userId: userId ?? null,
        metadata: metadata ?? null,
      },
    });

    return res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("analytics ingest error:", error);
    return res.status(500).json({ error: "Failed to ingest analytics event" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const totalEvents = await prisma.analyticsEvent.count();

    const eventsByType = await prisma.analyticsEvent.groupBy({
      by: ["eventName"],
      _count: {
        eventName: true,
      },
      orderBy: {
        _count: {
          eventName: "desc",
        },
      },
    });

    const recentEvents = await prisma.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return res.json({
      totalEvents,
      eventsByType: eventsByType.map((item) => ({
        eventName: item.eventName,
        count: item._count.eventName,
      })),
      recentEvents,
    });
  } catch (error) {
    console.error("analytics summary error:", error);
    return res.status(500).json({ error: "Failed to fetch analytics summary" });
  }
});

export { router as analyticsRouter };
export default router;