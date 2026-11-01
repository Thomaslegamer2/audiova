"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/client";

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/av-ctl")) {
      return;
    }
    void trackEvent("pageview");
  }, [pathname]);

  return null;
}
