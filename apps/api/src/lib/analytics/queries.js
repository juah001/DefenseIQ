import { db } from "@/lib/db";

export async function createAnalyticsEvent(data) {
  return db.analyticsEvent.create({
    data: {
      eventName: data.eventName,
      sessionId: data.sessionId || null,
      userId: data.userId || null,
      path: data.path || null,
      referrer: data.referrer || null,
      deviceType: data.deviceType || null,
      metadata: data.metadata || {},
    },
  });
}

export async function getAnalyticsEventsSince(fromDate) {
  return db.analyticsEvent.findMany({
    where: {
      createdAt: {
        gte: fromDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      eventName: true,
      sessionId: true,
      userId: true,
      path: true,
      referrer: true,
      deviceType: true,
      metadata: true,
      createdAt: true,
    },
  });
}