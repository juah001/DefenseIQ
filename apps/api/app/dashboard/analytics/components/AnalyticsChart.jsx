export default function AnalyticsChart({ trends }) {
  if (!trends || trends.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Daily Trends</h2>
        <p className="text-sm text-gray-500">No trend data available yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Daily Trends</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Page Views</th>
              <th className="py-2 pr-4">Unique Visitors</th>
              <th className="py-2 pr-4">Custom Events</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((item) => (
              <tr key={item.date} className="border-b last:border-b-0">
                <td className="py-2 pr-4">{item.date}</td>
                <td className="py-2 pr-4">{item.pageViews}</td>
                <td className="py-2 pr-4">{item.uniqueVisitors}</td>
                <td className="py-2 pr-4">{item.customEvents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}