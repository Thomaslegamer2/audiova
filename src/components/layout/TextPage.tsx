import type { ReactNode } from "react";

export function TextPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink">{title}</h1>
      <p className="mt-4 text-base leading-7 text-muted">{intro}</p>
      <div className="mt-10 space-y-8">{children}</div>
    </article>
  );
}

export function TextSection({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-7 text-muted">{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
