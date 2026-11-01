"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminTickets } from "@/components/admin/AdminTickets";
import { cn } from "@/lib/utils";

type Tab = "overview" | "analytics" | "tickets" | "site";

interface AnalyticsReport {
  range: string;
  totals: {
    visitors: number;
    sessions: number;
    pageviews: number;
    conversionsOk: number;
    conversionsFail: number;
    urlImportsOk: number;
    urlImportsFail: number;
    successRate: number | null;
    avgFileBytes: number | null;
    avgConversionMs: number | null;
  };
  series: Array<{ date: string; pageviews: number; sessions: number; conversionsOk: number }>;
  top: {
    paths: Array<{ name: string; value: number }>;
    referrers: Array<{ name: string; value: number }>;
    locales: Array<{ name: string; value: number }>;
    browsers: Array<{ name: string; value: number }>;
    countries: Array<{ name: string; value: number }>;
    formatsOut: Array<{ name: string; value: number }>;
  };
}

interface SiteConfigState {
  theme: string;
  adsEnabled: boolean;
  analyticsEnabled: boolean;
  urlImportEnabled: boolean;
  localesEnabled: string[];
}

const ranges = [
  { id: "today", label: "Aujourd’hui" },
  { id: "yesterday", label: "Hier" },
  { id: "7d", label: "7 jours" },
  { id: "30d", label: "30 jours" },
  { id: "90d", label: "90 jours" },
  { id: "365d", label: "12 mois" },
] as const;

export function AdminConsole() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [range, setRange] = useState<(typeof ranges)[number]["id"]>("7d");
  const [report, setReport] = useState<AnalyticsReport | null>(null);
  const [config, setConfig] = useState<SiteConfigState | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    setAnalyticsError(null);
    const response = await fetch(`/api/admin/analytics?range=${range}`, { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    if (!response.ok) {
      setAnalyticsError("Impossible de charger les analytics.");
      return;
    }
    setReport((await response.json()) as AnalyticsReport);
  }, [range]);

  const loadConfig = useCallback(async () => {
    const response = await fetch("/api/admin/site-config", { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    if (!response.ok) {
      return;
    }
    setConfig((await response.json()) as SiteConfigState);
  }, []);

  useEffect(() => {
    if (!authed) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (tab === "analytics") {
        void loadAnalytics();
      }
      if (tab === "site") {
        void loadConfig();
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [tab, authed, loadAnalytics, loadConfig]);

  const saveConfig = async (partial: Partial<SiteConfigState>) => {
    setMessage(null);
    const response = await fetch("/api/admin/site-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partial),
    });
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    if (!response.ok) {
      setMessage("Enregistrement impossible.");
      return;
    }
    setConfig((await response.json()) as SiteConfigState);
    setMessage("Configuration enregistrée.");
  };

  if (!authed) {
    return <AdminDashboard onAuthChange={setAuthed} />;
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <div className="flex flex-wrap gap-2 border-b border-line pb-3">
          {(
            [
              ["overview", "Vue d’ensemble"],
              ["tickets", "Tickets"],
              ["analytics", "Analytics"],
              ["site", "Gestion du site"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium",
                tab === id ? "bg-violet/15 text-glow" : "text-muted hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {message ? <p className="mt-4 text-sm text-ok">{message}</p> : null}
      </div>

      {tab === "overview" ? <AdminDashboard onAuthChange={setAuthed} /> : null}

      {tab === "tickets" ? <AdminTickets onUnauthorized={() => setAuthed(false)} /> : null}

      {tab === "analytics" ? (
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="flex flex-wrap gap-2">
            {ranges.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRange(item.id)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium",
                  range === item.id ? "border-violet bg-violet/10 text-glow" : "border-line text-muted",
                )}
              >
                {item.label}
              </button>
            ))}
            <a
              href={`/api/admin/analytics?range=${range}&format=csv`}
              className="ml-auto rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:text-ink"
            >
              Export CSV
            </a>
          </div>

          {analyticsError ? <p className="mt-8 text-sm text-danger">{analyticsError}</p> : null}

          {!report && !analyticsError ? (
            <p className="mt-8 text-sm text-muted">
              Chargement des analytics… Les chiffres restent à zéro tant qu’aucun visiteur n’a consenti et généré d’événements.
            </p>
          ) : null}

          {report ? (
            <>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Metric label="Visiteurs" value={String(report.totals.visitors)} />
                <Metric label="Sessions" value={String(report.totals.sessions)} />
                <Metric label="Pages vues" value={String(report.totals.pageviews)} />
                <Metric
                  label="Taux de réussite"
                  value={report.totals.successRate == null ? "—" : `${report.totals.successRate} %`}
                />
                <Metric label="Conversions OK" value={String(report.totals.conversionsOk)} />
                <Metric label="Échecs" value={String(report.totals.conversionsFail)} />
                <Metric label="Imports URL OK" value={String(report.totals.urlImportsOk)} />
                <Metric
                  label="Durée moy. conversion"
                  value={
                    report.totals.avgConversionMs == null
                      ? "—"
                      : `${Math.round(report.totals.avgConversionMs / 1000)} s`
                  }
                />
              </div>

              <section className="mt-8 rounded-2xl border border-line bg-card/80 p-5">
                <h2 className="text-lg font-semibold">Évolution</h2>
                <div className="mt-4 flex h-40 items-end gap-1">
                  {report.series.length === 0 ? (
                    <p className="text-sm text-muted">Pas encore de série journalière.</p>
                  ) : (
                    report.series.map((row) => {
                      const max = Math.max(1, ...report.series.map((item) => item.pageviews));
                      const height = Math.max(4, Math.round((row.pageviews / max) * 100));
                      return (
                        <div key={row.date} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-violet to-signal"
                            style={{ height: `${height}%` }}
                            title={`${row.date}: ${row.pageviews}`}
                          />
                          <span className="hidden text-[9px] text-muted sm:block">{row.date.slice(5)}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <Ranking title="Pages" rows={report.top.paths} />
                <Ranking title="Sources" rows={report.top.referrers} />
                <Ranking title="Langues" rows={report.top.locales} />
                <Ranking title="Navigateurs" rows={report.top.browsers} />
                <Ranking title="Pays" rows={report.top.countries} />
                <Ranking title="Formats de sortie" rows={report.top.formatsOut} />
              </div>
            </>
          ) : null}
        </main>
      ) : null}

      {tab === "site" ? (
        <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
          <h2 className="text-2xl font-semibold">Gestion du site</h2>
          {!config ? (
            <p className="mt-6 text-sm text-muted">Chargement de la configuration…</p>
          ) : (
            <div className="mt-6 space-y-4 rounded-2xl border border-line bg-card/80 p-6">
              <Toggle
                label="Publicités"
                checked={config.adsEnabled}
                onChange={(adsEnabled) => void saveConfig({ adsEnabled })}
              />
              <Toggle
                label="Analytics"
                checked={config.analyticsEnabled}
                onChange={(analyticsEnabled) => void saveConfig({ analyticsEnabled })}
              />
              <Toggle
                label="Import depuis un lien"
                checked={config.urlImportEnabled}
                onChange={(urlImportEnabled) => void saveConfig({ urlImportEnabled })}
              />
              <p className="text-xs leading-5 text-muted">
                Les publicités ne s’affichent que si cette option est active et que le visiteur a choisi « Tout accepter ».
                Les thèmes se gèrent dans l’onglet Vue d’ensemble. Aucune statistique inventée : les compteurs restent à zéro sans trafic réel.
              </p>
            </div>
          )}
        </main>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card/80 p-4">
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Ranking({ title, rows }: { title: string; rows: Array<{ name: string; value: number }> }) {
  return (
    <section className="rounded-2xl border border-line bg-card/80 p-5">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {rows.length === 0 ? <li className="text-sm text-muted">Pas encore de données.</li> : null}
        {rows.map((row) => (
          <li key={row.name} className="flex justify-between gap-3 text-sm">
            <span className="truncate text-muted">{row.name}</span>
            <span className="font-medium">{row.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn("relative h-7 w-12 rounded-full transition", checked ? "bg-violet" : "bg-line")}
      >
        <span
          className={cn("absolute top-0.5 size-6 rounded-full bg-white transition", checked ? "left-5" : "left-0.5")}
        />
      </button>
    </label>
  );
}
