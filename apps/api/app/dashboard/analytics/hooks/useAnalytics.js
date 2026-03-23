"use client";

import { useEffect, useState } from "react";

export default function useAnalytics(days = 30) {
  const [data, setData] = useState({
    totals: {
      totalEvents: 0,
      pageViews: 0,
      uniqueVisitors: 0,
      customEvents: 0,
    },
    topPages: [],
    eventBreakdown: [],
    trends: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAnalytics() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/analytics?days=${days}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load analytics");
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error("useAnalytics error:", err);
      setError("Unable to load analytics data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}