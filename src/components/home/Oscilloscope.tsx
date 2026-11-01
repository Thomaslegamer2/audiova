"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/providers";

export function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef(0.4);
  const t = useI18n();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(41, 45, 61, 0.95)";
      context.lineWidth = 1;
      for (let line = 1; line < 4; line += 1) {
        const y = (height / 4) * line;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const focus = pointer.current;
      const phase = media.matches ? 0.6 : time / 880;
      const stroke = (color: string, amplitude: number, cycles: number, weight: number) => {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = weight;
        for (let x = 0; x <= width; x += 2) {
          const ratio = x / width;
          const envelope = Math.sin(ratio * Math.PI);
          const y =
            height / 2 +
            Math.sin(ratio * cycles * Math.PI * 2 + phase) * amplitude * envelope * height;
          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();
      };

      stroke("rgba(0, 209, 255, 0.45)", 0.14 + focus * 0.08, 4, dpr);
      stroke("#c84bff", 0.2 + focus * 0.12, 2 + focus * 2.2, 1.5 * dpr);

      const playhead = media.matches ? width * 0.32 : (time / 28) % width;
      context.strokeStyle = "rgba(248, 250, 252, 0.28)";
      context.lineWidth = dpr;
      context.beginPath();
      context.moveTo(playhead, height * 0.12);
      context.lineTo(playhead, height * 0.88);
      context.stroke();

      if (!media.matches) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) {
        return;
      }
      pointer.current = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    };

    canvas.addEventListener("pointermove", onMove);
    raf = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <figure className="card-glow rounded-2xl border border-line bg-card/90 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        <span>{t.hero.monitor}</span>
        <span className="text-glow">{t.hero.demo}</span>
      </div>
      <canvas ref={canvasRef} className="mt-3 h-40 w-full sm:h-52" role="img" aria-label={t.hero.demoHint} />
      <figcaption className="mt-3 text-xs leading-5 text-muted">{t.hero.demoHint}</figcaption>
    </figure>
  );
}
