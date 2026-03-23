import { getAnalyticsEventsSince } from "@/lib/analytics/queries";

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDateKey(date) {
  return date.toISOString().slice(0, 10);
}

export async function getAnalyticsSummary(days = 30) {
  const safeDays = Math.min(Math.max(Number(days) || 30, 1), 365);

  const now = new Date();
  const from = startOfDay(
    new Date(now.getTime() - (safeDays - 1) * 24 * 60 * 60 * 1000)
  );

  const events = await getAnalyticsEventsSince(from);

  const totalEvents = events.length;
  const pageViews = events.filter((event) => event.eventName === "page_view").length;
  const customEvents = events.filter((event) => event.eventName !== "page_view").length;

  const uniqueVisitors = new Set(
    events.map((event) => event.sessionId).filter(Boolean)
  ).size;

  const topPagesMap = new Map();

  for (const event of events) {
    if (event.eventName === "page_view" && event.path) {
      topPagesMap.set(event.path, (topPagesMap.get(event.path) || 0) + 1);
    }
  }

  const topPages = Array.from(topPagesMap.entries())
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const eventBreakdownMap = new Map();

  for (const event of events) {
    eventBreakdownMap.set(
      event.eventName,
      (eventBreakdownMap.get(event.eventName) || 0) + 1
    );
  }

  const eventBreakdown = Array.from(eventBreakdownMap.entries())
    .map(([eventName, count]) => ({ eventName, count }))
    .sort((a, b) => b.count - a.count);

  const trendMap = new Map();

  for (let i = 0; i < safeDays; i++) {
    const date = new Date(from.getTime() + i * 24 * 60 * 60 * 1000);
    trendMap.set(formatDateKey(date), {
      pageViews: 0,
      customEvents: 0,
      sessions: new Set(),
    });
  }

  for (const event of events) {
    const key = formatDateKey(event.createdAt);
    const bucket = trendMap.get(key);
    if (!bucket) continue;

    if (event.eventName === "page_view") {
      bucket.pageViews += 1;
    } else {
      bucket.customEvents += 1;
    }

    if (event.sessionId) {
      bucket.sessions.add(event.sessionId);
    }
  }

  const trends = Array.from(trendMap.entries()).map(([date, values]) => ({
    date,
    pageViews: values.pageViews,
    uniqueVisitors: values.sessions.size,
    customEvents: values.customEvents,
  }));

  return {
    totals: {
      totalEvents,
      pageViews,
      uniqueVisitors,
      customEvents,
    },
    topPages,
    eventBreakdown,
    trends,
  };
}