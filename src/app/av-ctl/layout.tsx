import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Console",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-dvh bg-canvas text-ink">
      <div className="atmosphere pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
