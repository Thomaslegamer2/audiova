"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordLink } from "@/components/layout/DiscordLink";
import { Logo } from "@/components/layout/Logo";
import { useI18n } from "@/components/providers";
import { COPYRIGHT_YEAR } from "@/lib/constants";
import { fill } from "@/lib/utils";

export function Footer() {
  const t = useI18n();
  const pathname = usePathname();
  const hrefFor = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <footer className="border-t border-line bg-panel/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo size="footer" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{t.footer.description}</p>
          <div className="mt-5">
            <DiscordLink label={t.nav.discord} showLabel className="px-3" />
          </div>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{t.footer.product}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="text-ink hover:text-glow" href={hrefFor("convertisseur")}>{t.nav.converter}</a></li>
            <li><a className="text-ink hover:text-glow" href={hrefFor("fonctionnalites")}>{t.nav.features}</a></li>
            <li><a className="text-ink hover:text-glow" href={hrefFor("faq")}>{t.nav.faq}</a></li>
            <li><Link className="text-ink hover:text-glow" href="/outils">Outils</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{t.footer.information}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-ink hover:text-glow" href="/privacy">{t.footer.privacy}</Link></li>
            <li><Link className="text-ink hover:text-glow" href="/legal">{t.footer.legal}</Link></li>
            <li><Link className="text-ink hover:text-glow" href="/contact">{t.footer.contact}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted sm:px-8">
          {fill(t.footer.rights, { year: COPYRIGHT_YEAR })}
        </p>
      </div>
    </footer>
  );
}
