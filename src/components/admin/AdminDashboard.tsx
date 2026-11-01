"use client";

import {
  Activity,
  BookOpen,
  Clover,
  Egg,
  Flag,
  Flower2,
  Gauge,
  Ghost,
  HardDrive,
  Heart,
  Leaf,
  Link2,
  Lock,
  LogOut,
  PartyPopper,
  Palette,
  RefreshCw,
  Server,
  Snowflake,
  Sparkles,
  Sun,
  TreePine,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminStats } from "@/lib/admin/stats";
import { HISTORY_KEY, parseHistory } from "@/lib/history";
import { SITE_THEMES, type SiteTheme, themeLabel } from "@/lib/theme-catalog";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  if (m > 0) {
    return `${m}m ${s}s`;
  }
  return `${s}s`;
}

function formatWhen(value: string | null): string {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

interface BrowserIntel {
  historyCount: number;
  historyFormats: Record<string, number>;
  storageKeys: number;
  locale: string;
  language: string;
  online: boolean;
  cookiesEnabled: boolean;
  userAgent: string;
  viewport: string;
  deviceMemory: string;
  hardwareConcurrency: number | null;
}

function readBrowserIntel(): BrowserIntel {
  const history = parseHistory(window.localStorage.getItem(HISTORY_KEY));
  const formats: Record<string, number> = {};
  for (const entry of history) {
    formats[entry.format] = (formats[entry.format] ?? 0) + 1;
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  return {
    historyCount: history.length,
    historyFormats: formats,
    storageKeys: window.localStorage.length,
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
    language: navigator.language,
    online: navigator.onLine,
    cookiesEnabled: navigator.cookieEnabled,
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    deviceMemory: typeof nav.deviceMemory === "number" ? `${nav.deviceMemory} Go` : "—",
    hardwareConcurrency: navigator.hardwareConcurrency || null,
  };
}

const themeIcons: Record<SiteTheme, typeof Sparkles> = {
  default: Sparkles,
  newyear: PartyPopper,
  valentine: Heart,
  carnival: PartyPopper,
  stpatrick: Clover,
  easter: Egg,
  spring: Flower2,
  summer: Sun,
  bastille: Flag,
  backtoschool: BookOpen,
  autumn: Leaf,
  halloween: Ghost,
  christmas: TreePine,
  winter: Snowflake,
};

export function AdminDashboard({ onAuthChange }: { onAuthChange?: (authed: boolean) => void } = {}) {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [browser, setBrowser] = useState<BrowserIntel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [themeBusy, setThemeBusy] = useState<SiteTheme | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    const response = await fetch("/api/admin/stats", { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      onAuthChange?.(false);
      setStats(null);
      return false;
    }
    if (!response.ok) {
      throw new Error("Impossible de charger les statistiques.");
    }
    const data = (await response.json()) as AdminStats;
    setStats(data);
    setAuthed(true);
    onAuthChange?.(true);
    return true;
  }, [onAuthChange]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadStats();
      } catch {
        // Pas encore connecté.
      } finally {
        if (!cancelled) {
          setBootstrapped(true);
          setBrowser(readBrowserIntel());
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadStats]);

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        let message = "Connexion impossible.";
        try {
          const payload = (await response.json()) as { error?: string; retryAfter?: number; message?: string };
          if (payload.error === "unauthorized") {
            message = "Mot de passe incorrect.";
          } else if (payload.error === "locked") {
            message = `Trop de tentatives. Réessayez dans ${payload.retryAfter ?? 900} s.`;
          } else if (payload.error === "admin-unconfigured") {
            message = payload.message ?? "Administration non configurée (.env.local).";
          } else if (payload.error === "forbidden") {
            message = "Requête refusée (origine).";
          }
        } catch {
          // Ignore.
        }
        setError(message);
        return;
      }
      setPassword("");
      await loadStats();
      setBrowser(readBrowserIntel());
    } catch {
      setError("Connexion impossible.");
    } finally {
      setBusy(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    onAuthChange?.(false);
    setStats(null);
    setMessage(null);
  };

  const onRefresh = async () => {
    setBusy(true);
    setError(null);
    try {
      await loadStats();
      setBrowser(readBrowserIntel());
      setMessage("Données actualisées.");
    } catch {
      setError("Actualisation impossible.");
    } finally {
      setBusy(false);
    }
  };

  const applyTheme = async (theme: SiteTheme) => {
    setThemeBusy(theme);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (!response.ok) {
        setError("Changement de thème refusé.");
        return;
      }
      document.documentElement.setAttribute("data-theme", theme);
      try {
        window.localStorage.setItem("audiova.site-theme", theme);
      } catch {
        // Stockage indisponible.
      }
      await loadStats();
      setMessage(`Thème « ${themeLabel(theme)} » appliqué sur tout le site.`);
    } catch {
      setError("Changement de thème impossible.");
    } finally {
      setThemeBusy(null);
    }
  };

  const failureRows = useMemo(() => {
    if (!stats) {
      return [];
    }
    return Object.entries(stats.metrics.urlImports.failures).sort((a, b) => b[1] - a[1]);
  }, [stats]);

  if (!bootstrapped) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-6xl items-center justify-center px-5">
        <p className="text-sm text-muted">Chargement de la console…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-16">
        <div className="card-glow rounded-2xl border border-line bg-card/90 p-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-violet/15 text-glow">
            <Lock className="size-5" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Console Audiova</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Espace privé. Aucun lien public n’y mène. Entrez le mot de passe admin pour continuer.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onLogin}>
            <label className="block">
              <span className="mb-2 block text-xs font-medium tracking-wide text-muted uppercase">Mot de passe</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border border-line bg-panel px-4 text-ink outline-none focus:border-signal"
                required
              />
            </label>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <button type="submit" disabled={busy} className="btn-brand inline-flex h-12 w-full items-center justify-center rounded-xl font-semibold">
              {busy ? "Vérification…" : "Ouvrir la console"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Audiova · Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Tableau de bord</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Vue technique du convertisseur, métriques d’import URL, limites et thèmes du site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={busy}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-panel px-4 text-sm font-medium hover:border-violet/50"
          >
            <RefreshCw className={cn("size-4", busy && "animate-spin")} aria-hidden="true" />
            Actualiser
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-panel px-4 text-sm font-medium hover:border-danger/40"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Quitter
          </button>
        </div>
      </header>

      {message ? <p className="mt-6 rounded-xl border border-ok/30 bg-ok/10 px-4 py-3 text-sm text-ok">{message}</p> : null}
      {error ? <p className="mt-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}

      <section className="mt-8">
        <SectionTitle icon={Palette} title="Thème du site" subtitle="Le choix s’applique immédiatement à tous les visiteurs." />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SITE_THEMES.map((theme) => {
            const Icon = themeIcons[theme];
            const meta = stats.theme.catalog.find((item) => item.id === theme);
            const active = stats.theme.current === theme;
            return (
              <button
                key={theme}
                type="button"
                disabled={themeBusy !== null}
                onClick={() => applyTheme(theme)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition",
                  active ? "border-violet bg-violet/10 card-glow" : "border-line bg-card/70 hover:border-violet/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-panel text-glow">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {active ? (
                    <span className="rounded-full bg-ok/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-ok uppercase">Actif</span>
                  ) : null}
                </div>
                <p className="mt-4 text-lg font-semibold">{meta?.label ?? theme}</p>
                <p className="mt-1 text-xs font-medium tracking-wide text-glow uppercase">{meta?.when}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{meta?.description}</p>
                <p className="mt-4 text-xs text-muted">
                  {themeBusy === theme ? "Application…" : active ? `Depuis ${formatWhen(stats.theme.updatedAt)}` : "Cliquer pour activer"}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Version" value={`v${stats.site.version}`} hint={stats.site.nodeEnv} />
        <StatCard label="Uptime process" value={formatDuration(stats.runtime.uptimeSeconds)} hint={`PID ${stats.runtime.pid}`} />
        <StatCard label="Imports URL OK" value={String(stats.metrics.urlImports.success)} hint={`${stats.metrics.urlImports.total} tentatives`} />
        <StatCard label="Mémoire heap" value={stats.runtime.memory.heapUsedLabel} hint={`RSS ${stats.runtime.memory.rssLabel}`} />
        <StatCard
          label="Pages vues (aujourd’hui)"
          value={String(stats.today.pageviews)}
          hint={`${stats.today.visitors} visiteur(s) · consentement requis`}
        />
        <StatCard
          label="Conversions OK (aujourd’hui)"
          value={String(stats.today.conversionsOk)}
          hint={stats.today.successRate == null ? "Pas encore de taux" : `Réussite ${stats.today.successRate} %`}
        />
        <StatCard
          label="Analytics"
          value={stats.site.analyticsEnabled ? "actives" : "coupées"}
          hint={stats.site.urlImportEnabled ? "Import URL ouvert" : "Import URL coupé"}
        />
        <StatCard
          label="Publicités"
          value={stats.site.adsEnabled ? "activées" : "désactivées"}
          hint="Consentement « tout accepter » requis"
        />
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Panel icon={Link2} title="Imports depuis un lien">
          <InfoRow label="Succès" value={String(stats.metrics.urlImports.success)} />
          <InfoRow label="Tentatives" value={String(stats.metrics.urlImports.total)} />
          <InfoRow label="Rate limit" value={String(stats.metrics.urlImports.rateLimited)} />
          <InfoRow label="Serveur occupé" value={String(stats.metrics.urlImports.busyRejected)} />
          <InfoRow label="Octets servis" value={`${(stats.metrics.urlImports.bytesServed / (1024 * 1024)).toFixed(2)} Mo`} />
          <InfoRow label="Dernier import" value={formatWhen(stats.metrics.urlImports.lastAt)} />
          <InfoRow label="Dernier hôte" value={stats.metrics.urlImports.lastHost ?? "—"} />
          <InfoRow
            label="Fenêtre limite"
            value={`${stats.limits.urlImport.rateLimit} / ${Math.round(stats.limits.urlImport.rateWindowMs / 1000)}s`}
          />
          {failureRows.length > 0 ? (
            <div className="mt-4 border-t border-line pt-4">
              <p className="text-xs tracking-wide text-muted uppercase">Échecs par code</p>
              <ul className="mt-3 space-y-2">
                {failureRows.map(([code, count]) => (
                  <li key={code} className="flex items-center justify-between text-sm">
                    <span className="font-mono text-danger">{code}</span>
                    <span className="text-muted">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Aucun échec enregistré depuis le démarrage.</p>
          )}
        </Panel>

        <Panel icon={Gauge} title="Limites convertisseur">
          <InfoRow label="Fichiers max" value={String(stats.limits.maxFiles)} />
          <InfoRow label="Taille max" value={stats.limits.maxFileLabel} />
          <InfoRow label="Historique" value={`${stats.limits.maxHistory} entrées`} />
          <InfoRow label="Timeout conversion" value={`${Math.round(stats.limits.conversionTimeoutMs / 60000)} min`} />
          <InfoRow label="Débits" value={stats.limits.bitrates.map((rate) => `${rate}`).join(" · ")} />
          <InfoRow label="Formats entrée" value={String(stats.limits.inputFormats)} />
          <InfoRow label="Formats sortie" value={stats.limits.outputFormats.join(", ").toUpperCase()} />
          <InfoRow label="Timeout import URL" value={`${Math.round(stats.limits.urlImport.timeoutMs / 60000)} min`} />
        </Panel>

        <Panel icon={Server} title="Runtime serveur">
          <InfoRow label="Node" value={stats.runtime.node} />
          <InfoRow label="Plateforme" value={`${stats.runtime.platform}/${stats.runtime.arch}`} />
          <InfoRow label="Fuseau" value={stats.runtime.timezone} />
          <InfoRow label="URL publique" value={stats.site.url} />
          <InfoRow label="Contact" value={stats.site.contactEmail ?? "non configuré"} />
          <InfoRow label="Pubs" value={stats.site.adsEnabled ? "activées" : "désactivées"} />
          <InfoRow label="Analytics" value={stats.site.analyticsEnabled ? "activées" : "désactivées"} />
          <InfoRow label="Import URL" value={stats.site.urlImportEnabled ? "activé" : "désactivé"} />
          <InfoRow label="Dossier" value={stats.runtime.cwd} />
          <InfoRow label="Snapshot" value={formatWhen(stats.generatedAt)} />
        </Panel>

        <Panel icon={HardDrive} title="Navigateur (cette session)">
          {browser ? (
            <>
              <InfoRow label="Historique local" value={`${browser.historyCount} fichier(s)`} />
              <InfoRow
                label="Formats historiques"
                value={
                  Object.keys(browser.historyFormats).length
                    ? Object.entries(browser.historyFormats)
                        .map(([format, count]) => `${format.toUpperCase()}×${count}`)
                        .join(" · ")
                    : "—"
                }
              />
              <InfoRow label="Clés localStorage" value={String(browser.storageKeys)} />
              <InfoRow label="Langue" value={`${browser.language} / ${browser.locale}`} />
              <InfoRow label="Viewport" value={browser.viewport} />
              <InfoRow label="Mémoire appareil" value={browser.deviceMemory} />
              <InfoRow label="Cœurs CPU" value={browser.hardwareConcurrency ? String(browser.hardwareConcurrency) : "—"} />
              <InfoRow label="En ligne" value={browser.online ? "oui" : "non"} />
              <InfoRow label="Cookies" value={browser.cookiesEnabled ? "oui" : "non"} />
              <p className="mt-4 break-all text-xs leading-5 text-muted">{browser.userAgent}</p>
            </>
          ) : (
            <p className="text-sm text-muted">Lecture navigateur indisponible.</p>
          )}
        </Panel>
      </div>

      <section className="mt-10">
        <SectionTitle icon={Lock} title="Sécurité" subtitle="Connexions admin récentes (sans mots de passe ni jetons)." />
        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-card/80">
          {stats.security.recentEvents.length === 0 ? (
            <p className="p-5 text-sm text-muted">Aucun événement pour le moment.</p>
          ) : (
            <ul className="divide-y divide-line">
              {stats.security.recentEvents.map((event) => (
                <li key={`${event.at}-${event.type}-${event.ip}`} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                  <span className="font-mono text-xs text-glow">{event.type}</span>
                  <span className="text-muted">{event.ip}</span>
                  <span className="text-xs text-muted">{formatWhen(event.at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle icon={Activity} title="Extensions acceptées" subtitle="Liste brute utilisée par le sélecteur de fichiers." />
        <p className="mt-4 rounded-2xl border border-line bg-card/70 p-5 font-mono text-xs leading-6 break-all text-muted">
          {stats.limits.acceptedExtensions}
        </p>
      </section>

      <p className="mt-10 text-center text-xs text-muted">
        Console cachée · ne pas indexer · session 8 h · thème courant : {themeLabel(stats.theme.current)}
      </p>
    </main>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Palette;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-violet/15 text-glow">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card/80 p-5">
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Server;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-card/80 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-panel text-glow">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="mt-5 space-y-3">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-muted">{label}</span>
      <span className="text-right font-medium break-all text-ink">{value}</span>
    </div>
  );
}
