"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/tracker";

export default function AnalyticsClientTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    if (!fullPath) return;

    trackPageView(fullPath);
  }, [pathname, searchParams]);

  return null;
}