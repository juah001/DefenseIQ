async function getAnalytics() {
  try {
    const res = await fetch("http://localhost:5000/analytics/progress", { cache: "no-store" });
    return res.json();
  } catch {
    return null;
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  if (!data) return <div className="card">Analytics unavailable.</div>;

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
        <ul className="clean">{data.strongTopics.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="card">
        <h3>Weak Topics</h3>
        <ul className="clean">{data.weakTopics.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="card">
        <h3>Weekly Reviews</h3>
        <p>{data.weeklyReviews.join(" • ")}</p>
      </div>
    </div>
  );
}
