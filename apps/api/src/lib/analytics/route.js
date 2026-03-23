import { NextResponse } from "next/server";
import { createAnalyticsEvent } from "@/lib/analytics/queries";
import { getAnalyticsSummary } from "@/lib/analytics/processor";

function getDeviceType(userAgent = "") {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/mobi|android|iphone/.test(ua)) return "mobile";
  if (ua) return "desktop";

  return "unknown";
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.eventName || typeof body.eventName !== "string") {
      return NextResponse.json(
        { error: "eventName is required" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || "";

    await createAnalyticsEvent({
      eventName: body.eventName,
      sessionId: body.sessionId,
      userId: body.userId,
      path: body.path,
      referrer: body.referrer,
      deviceType: body.deviceType || getDeviceType(userAgent),
      metadata: body.metadata || {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/analytics error:", error);
    return NextResponse.json(
      { error: "Failed to persist analytics event" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "30";

    const summary = await getAnalyticsSummary(Number(days));

    return NextResponse.json(summary);
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics summary" },
      { status: 500 }
    );
  }
}