"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { AnalyticsBeacon } from "@/components/layout/AnalyticsBeacon";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeEffects } from "@/components/layout/ThemeEffects";
import { useI18n } from "@/components/providers";
import { ADMIN_PATH } from "@/lib/admin/constants";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useI18n();
  const isAdmin = pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ThemeEffects />
      <AnalyticsBeacon />
      <div className="relative z-10 flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
        >
          {t.skip}
        </a>
        <Suspense fallback={<div className="h-16 border-b border-line bg-canvas" />}>
          <Navbar />
        </Suspense>
        <div id="contenu" className="flex-1">
          {children}
        </div>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
      <ConsentBanner />
    </>
  );
}
