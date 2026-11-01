"use client";

import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, localeLabels, locales } from "@/i18n";
import { Logo } from "@/components/layout/Logo";
import { useFileBridge, useI18n, useLocale } from "@/components/providers";
import { cn } from "@/lib/utils";

const links = [
  { id: "convertisseur", key: "converter" },
  { id: "fonctionnalites", key: "features" },
  { id: "formats", key: "formats" },
  { id: "faq", key: "faq" },
] as const;

export function Navbar() {
  const t = useI18n();
  const pathname = usePathname();
  const { openFile } = useFileBridge();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const onHome = pathname === "/";

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const openControl = onHome ? (
    <button type="button" className={openFileClass} onClick={() => { setOpen(false); openFile(); }} aria-label={t.nav.openFile}>
      <Upload className="size-4 sm:hidden" aria-hidden="true" />
      <span className="hidden sm:inline">{t.nav.openFile}</span>
    </button>
  ) : (
    <Link href="/#convertisseur" className={openFileClass} aria-label={t.nav.openFile}>
      <Upload className="size-4 sm:hidden" aria-hidden="true" />
      <span className="hidden sm:inline">{t.nav.openFile}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <Logo />
        <nav aria-label={t.nav.label} className="ml-6 hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a key={link.id} href={hrefFor(link.id)} className="text-sm text-muted transition hover:text-ink">
              {t.nav[link.key]}
            </a>
          ))}
          <Link href="/outils" className="text-sm text-muted transition hover:text-ink">
            Outils
          </Link>
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-2">
          <label>
            <span className="sr-only">{t.nav.language}</span>
            <select
              value={locale}
              onChange={(event) => {
                if (isLocale(event.target.value)) {
                  setLocale(event.target.value);
                }
              }}
              className="h-10 max-w-[7.5rem] rounded-lg border border-line bg-card px-2 text-sm text-ink sm:max-w-none"
              aria-label={t.nav.language}
            >
              {locales.map((code) => (
                <option key={code} value={code}>
                  {localeLabels[code]}
                </option>
              ))}
            </select>
          </label>
          {openControl}
          <button
            type="button"
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className={cn("h-px bg-ink transition", open && "translate-y-[5px] rotate-45")} />
              <span className={cn("h-px bg-ink transition", open && "opacity-0")} />
              <span className={cn("h-px bg-ink transition", open && "-translate-y-[5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-mobile" aria-label={t.nav.label} className="border-t border-line bg-panel lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={hrefFor(link.id)}
                className="border-b border-line py-3.5 text-base text-ink last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

const openFileClass =
  "btn-brand inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold sm:px-4";
