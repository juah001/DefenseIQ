const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getAnalytics() {
  try {
    const res = await fetch(`${API}/analytics/progress`, { cache: "no-store" });
    return res.json();
  } catch {
    return null;
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  if (!data) {
    return <div className="card">Analytics unavailable.</div>;
  }

  return (
    <div className="grid grid-3">
      <div className="card">
        <div className="metric">{data.cardsReviewedToday}</div>
        <div>Cards reviewed today</div>
      </div>

      <div className="card">
        <div className="metric">{data.accuracy}%</div>
        <div>Accuracy</div>
      </div>

      <div className="card">
        <div className="metric">{data.masteryLevel}%</div>
        <div>Mastery</div>
      </div>

      <div className="card">
        <h3>Strong Topics</h3>
        <ul className="clean">
          {data.strongTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Weak Topics</h3>
        <ul className="clean">
          {data.weakTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Weekly Reviews</h3>
        <p>{data.weeklyReviews.join(" • ")}</p>
      </div>
    </div>
  );
}
