const SESSION_KEY = "defenseiq_analytics_session_id";

function createSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `sess_${crypto.randomUUID()}`;
  }

  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const newId = createSessionId();
  window.localStorage.setItem(SESSION_KEY, newId);
  return newId;
}

export async function trackEvent({
  eventName,
  userId,
  path,
  metadata = {},
  referrer,
}) {
  try {
    const sessionId = getOrCreateSessionId();

    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        userId: userId || null,
        sessionId,
        path: path || (typeof window !== "undefined" ? window.location.pathname : null),
        referrer:
          referrer ||
          (typeof document !== "undefined" ? document.referrer : null),
        metadata,
      }),
      keepalive: true,
    });
  } catch (error) {
    console.error("Analytics trackEvent error:", error);
  }
}

export async function trackPageView(path, userId) {
  await trackEvent({
    eventName: "page_view",
    path,
    userId,
    metadata: {},
  });
}