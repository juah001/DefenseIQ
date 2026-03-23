"use client";

import { useEffect, useState } from "react";
import useAnalytics from "./hooks/useAnalytics";
import Filters from "./components/Filters";
import MetricsCard from "./components/MetricsCard";
import AnalyticsChart from "./components/AnalyticsChart";
import { trackPageView } from "@/lib/analytics/tracker";

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const { data, loading, error } = useAnalytics(days);

  useEffect(() => {
    trackPageView("/dashboard/analytics");
  }, []);

  return (
    <main className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Better analytics from persisted database events.
          </p>
        </div>

        <Filters days={days} setDays={setDays} />
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Loading analytics...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricsCard label="Total Events" value={data.totals.totalEvents} />
            <MetricsCard label="Page Views" value={data.totals.pageViews} />
            <MetricsCard label="Unique Visitors" value={data.totals.uniqueVisitors} />
            <MetricsCard label="Custom Events" value={data.totals.customEvents} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Top Pages</h2>

              {data.topPages.length === 0 ? (
                <p className="text-sm text-gray-500">No page view data yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.topPages.map((page) => (
                    <div
                      key={page.path}
                      className="flex items-center justify-between border-b pb-2 last:border-b-0"
                    >
                      <span className="truncate pr-4">{page.path}</span>
                      <span className="font-medium">{page.views}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Event Breakdown</h2>

              {data.eventBreakdown.length === 0 ? (
                <p className="text-sm text-gray-500">No tracked events yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.eventBreakdown.map((event) => (
                    <div
                      key={event.eventName}
                      className="flex items-center justify-between border-b pb-2 last:border-b-0"
                    >
                      <span>{event.eventName}</span>
                      <span className="font-medium">{event.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <AnalyticsChart trends={data.trends} />
        </>
      )}
    </main>
  );
}