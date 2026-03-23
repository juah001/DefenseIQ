const API = process.env.NEXT_PUBLIC_API_URL;

export async function trackEvent(eventName, userId = null, metadata = {}) {
  if (!API) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return null;
  }

  try {
    const res = await fetch(`${API}/analytics/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        userId,
        metadata,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to track event: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to track event:", error);
    return null;
  }
}

export async function getAnalyticsSummary() {
  if (!API) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return null;
  }

  try {
    const res = await fetch(`${API}/analytics/summary`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch analytics summary: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch analytics summary:", error);
    return null;
  }
}