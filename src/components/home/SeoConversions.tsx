import Link from "next/link";
import { liveTools } from "@/lib/tools/registry";

const PRIORITY = [
  "wav-vers-mp3",
  "flac-vers-mp3",
  "m4a-vers-mp3",
  "mp4-vers-mp3",
  "ogg-vers-mp3",
  "aac-vers-mp3",
  "mov-vers-mp3",
  "video-vers-audio",
] as const;

/** Bloc SEO indexable (server component) : maillage vers les pages conversion. */
export function SeoConversions() {
  const tools = PRIORITY.map((slug) => liveTools().find((tool) => tool.slug === slug)).filter(
    (tool): tool is NonNullable<typeof tool> => Boolean(tool),
  );

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8" aria-labelledby="conversions-populaires">
      <h2 id="conversions-populaires" className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
        Conversions populaires
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Accédez directement au convertisseur adapté à votre format. Toutes les pages utilisent le même moteur local
        FFmpeg.wasm.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.href}
              className="block h-full rounded-2xl border border-line bg-card/70 p-5 transition hover:border-violet/40"
            >
              <p className="font-semibold text-ink">{tool.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        <Link href="/outils" className="text-glow hover:underline">
          Tous les outils
        </Link>
        {" · "}
        <Link href="/guides" className="text-glow hover:underline">
          Guides
        </Link>
        {" · "}
        <Link href="/faq" className="text-glow hover:underline">
          FAQ
        </Link>
      </p>
    </section>
  );
}
