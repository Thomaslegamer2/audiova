"use client";

import Link from "next/link";
import { ContactTicketChat } from "@/components/contact/ContactTicketChat";
import { TextPage, TextSection } from "@/components/layout/TextPage";
import { useI18n } from "@/components/providers";
import { fill } from "@/lib/utils";

export function PrivacyContent() {
  const t = useI18n();
  return (
    <TextPage title={t.privacy.title} intro={t.privacy.intro}>
      {t.privacy.sections.map((section) => (
        <TextSection key={section.title} title={section.title} paragraphs={section.paragraphs} />
      ))}
    </TextPage>
  );
}

export function LegalContent() {
  const t = useI18n();
  return (
    <TextPage title={t.legal.title} intro={t.legal.intro}>
      {t.legal.sections.map((section) => (
        <TextSection key={section.title} title={section.title} paragraphs={section.paragraphs} />
      ))}
    </TextPage>
  );
}

export function ContactContent({ email }: { email: string | null }) {
  const t = useI18n();
  return (
    <TextPage title={t.contact.title} intro={t.contact.intro}>
      <ContactTicketChat />
      <section>
        <h2 className="text-xl font-semibold text-ink">{t.contact.helpTitle}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {t.contact.help.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href="/#faq" className="mt-5 inline-flex text-sm font-semibold text-glow hover:text-ink">
          {t.contact.faq}
        </Link>
      </section>
      <section>
        {email ? (
          <a className="text-base font-semibold text-ink underline-offset-4 hover:underline" href={`mailto:${email}`}>
            {fill(t.contact.mail, { email })}
          </a>
        ) : (
          <p className="text-sm leading-6 text-muted">{t.contact.mailMissing}</p>
        )}
      </section>
    </TextPage>
  );
}

export function NotFoundContent() {
  const t = useI18n();
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{t.notFound.title}</h1>
      <p className="mt-4 text-muted">{t.notFound.body}</p>
      <Link href="/" className="btn-brand mt-8 inline-flex h-12 w-fit items-center rounded-xl px-5 font-semibold">
        {t.notFound.back}
      </Link>
    </main>
  );
}
