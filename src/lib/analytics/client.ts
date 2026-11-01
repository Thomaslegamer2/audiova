"use client";

import type { AnalyticsEventName } from "@/lib/analytics/store";

const CONSENT_KEY = "audiova.consent";
const SESSION_KEY = "audiova.session";

export type ConsentLevel = "essential" | "analytics" | "all";

export function readConsent(): ConsentLevel {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value === "analytics" || value === "all" || value === "essential") {
      return value;
    }
  } catch {
    // Ignore.
  }
  return "essential";
}

export function writeConsent(level: ConsentLevel) {
  try {
    window.localStorage.setItem(CONSENT_KEY, level);
    window.dispatchEvent(new Event("audiova-consent"));
  } catch {
    // Ignore.
  }
}

function takeSessionFlag(): boolean {
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) {
      return false;
    }
    window.sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  } catch {
    return false;
  }
}

export async function trackEvent(
  name: AnalyticsEventName,
  payload: Record<string, string | number | undefined> = {},
): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }
  const consent = readConsent();
  if (consent !== "analytics" && consent !== "all") {
    return;
  }

  const newSession = name === "pageview" ? takeSessionFlag() : false;
  try {
    await fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        consent,
        newSession,
        event: {
          name,
          path: window.location.pathname,
          referrer: document.referrer || undefined,
          locale: document.documentElement.lang || undefined,
          ...payload,
        },
      }),
    });
  } catch {
    // Ne jamais bloquer l'UI pour l'analytics.
  }
}
