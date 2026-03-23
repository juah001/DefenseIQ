export const dynamic = "force-dynamic";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getAnalytics() {
  if (!API) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return null;
  }

  try {
    const res = await fetch(`${API}/analytics/summary`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Analytics API failed:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return null;
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  if (!analytics) {
    return (
      <main>
        <h1>Analytics</h1>
        <p>Failed to load analytics.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Analytics</h1>

      <section style={{ marginBottom: "24px" }}>
        <h2>Total Events</h2>
        <p>{analytics.totalEvents}</p>
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2>Events by Type</h2>
        <ul>
          {analytics.eventsByType?.map((item) => (
            <li key={item.eventName}>
              {item.eventName}: {item.count}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent Events</h2>
        <pre>{JSON.stringify(analytics.recentEvents, null, 2)}</pre>
      </section>
    </main>
  );
}