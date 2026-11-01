"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { isSiteTheme, type SiteTheme } from "@/lib/theme-catalog";

function readTheme(): SiteTheme {
  if (typeof document === "undefined") {
    return "default";
  }
  const value = document.documentElement.dataset.theme;
  return isSiteTheme(value) ? value : "default";
}

function Pin({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}

function ChristmasTree({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 88" fill="none" aria-hidden="true">
      <path d="M32 4 L52 28 H40 L56 48 H42 L60 68 H4 L22 48 H8 L24 28 H12 Z" fill="#1f6b3a" />
      <path d="M32 10 L46 28 H38 L50 46 H40 L54 64 H10 L24 46 H14 L26 28 H18 Z" fill="#2f9e56" />
      <rect x="28" y="68" width="8" height="14" rx="1" fill="#6b3f1f" />
      <circle cx="24" cy="34" r="2.2" fill="#e63946" />
      <circle cx="40" cy="42" r="2.2" fill="#ffd166" />
      <circle cx="30" cy="52" r="2.2" fill="#00d1ff" />
      <path d="M32 2 L34.2 8.2 L40.8 8.4 L35.6 12.2 L37.6 18.2 L32 14.8 L26.4 18.2 L28.4 12.2 L23.2 8.4 L29.8 8.2 Z" fill="#ffd166" />
    </svg>
  );
}

function GiftBox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="18" width="32" height="22" rx="3" fill="#c1121f" />
      <rect x="6" y="14" width="36" height="8" rx="2" fill="#e63946" />
      <rect x="22" y="14" width="4" height="26" fill="#ffd166" />
      <rect x="8" y="24" width="32" height="4" fill="#ffd166" />
    </svg>
  );
}

function Ornament({ className, color = "#e63946" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 32" fill="none" aria-hidden="true">
      <rect x="10" y="2" width="4" height="5" rx="1" fill="#ffd166" />
      <circle cx="12" cy="18" r="10" fill={color} />
    </svg>
  );
}

function CandyCane({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 56" fill="none" aria-hidden="true">
      <path d="M18 8 C18 2 10 2 10 8 V48 C10 52 18 52 18 48 V18 C18 14 22 14 22 10 C22 6 18 6 18 8 Z" fill="#fff" />
      <path d="M12 10 h4 M12 18 h4 M12 26 h4 M12 34 h4 M12 42 h4" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Pumpkin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 56" fill="none" aria-hidden="true">
      <ellipse cx="20" cy="30" rx="14" ry="18" fill="#e85d04" />
      <ellipse cx="44" cy="30" rx="14" ry="18" fill="#f48c06" />
      <ellipse cx="32" cy="30" rx="16" ry="20" fill="#ff7a18" />
      <rect x="29" y="6" width="6" height="10" rx="2" fill="#2d6a4f" />
      <path d="M22 26 L28 30 L22 32 Z" fill="#1a0f08" />
      <path d="M42 26 L36 30 L42 32 Z" fill="#1a0f08" />
      <path d="M24 40 Q32 48 40 40 Q32 44 24 40 Z" fill="#1a0f08" />
    </svg>
  );
}

function Ghost({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 60" fill="none" aria-hidden="true">
      <path d="M24 4 C12 4 6 14 6 26 V52 L14 46 L20 54 L28 46 L34 54 L42 46 V26 C42 14 36 4 24 4 Z" fill="rgba(255,255,255,0.82)" />
      <circle cx="18" cy="26" r="3.5" fill="#1a0f08" />
      <circle cx="30" cy="26" r="3.5" fill="#1a0f08" />
      <ellipse cx="24" cy="36" rx="5" ry="3" fill="#1a0f08" />
    </svg>
  );
}

function Spider({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 28" fill="none" aria-hidden="true">
      <ellipse cx="20" cy="14" rx="7" ry="6" fill="#1a0f08" />
      <circle cx="20" cy="8" r="4" fill="#2b1810" />
      <path d="M13 12 L2 4 M13 14 L1 14 M13 16 L2 24 M27 12 L38 4 M27 14 L39 14 M27 16 L38 24" stroke="#1a0f08" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Web({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <path d="M0 0 L140 8 M0 0 L120 40 M0 0 L80 80 M0 0 L40 110" stroke="rgba(255,180,100,0.28)" strokeWidth="1" />
      <path d="M20 4 Q40 28 18 52 M40 6 Q70 40 36 78 M70 8 Q100 48 60 100" stroke="rgba(255,180,100,0.22)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function Tombstone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 52" fill="none" aria-hidden="true">
      <path d="M8 18 Q8 4 20 4 Q32 4 32 18 V46 H8 Z" fill="#3a3a42" />
      <rect x="4" y="44" width="32" height="6" rx="1" fill="#2a2a30" />
      <text x="20" y="30" textAnchor="middle" fill="#9aa0b8" fontSize="10" fontFamily="monospace">RIP</text>
    </svg>
  );
}

function Heart() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 32 30" fill="none" aria-hidden="true">
      <path d="M16 27 C16 27 2 17 2 10 C2 5 6 2 10 2 C13 2 15 4 16 6 C17 4 19 2 22 2 C26 2 30 5 30 10 C30 17 16 27 16 27 Z" fill="#ff4d6d" />
    </svg>
  );
}

function Egg({ color = "#f9a8d4" }: { color?: string }) {
  return (
    <svg className="h-auto w-full" viewBox="0 0 28 36" fill="none" aria-hidden="true">
      <ellipse cx="14" cy="20" rx="12" ry="15" fill={color} />
      <path d="M6 18 Q14 14 22 18" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
      <circle cx="10" cy="24" r="2" fill="rgba(255,255,255,0.45)" />
      <circle cx="18" cy="22" r="1.6" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

function Bunny() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 48 56" fill="none" aria-hidden="true">
      <ellipse cx="16" cy="14" rx="5" ry="14" fill="#f8fafc" />
      <ellipse cx="32" cy="14" rx="5" ry="14" fill="#f8fafc" />
      <ellipse cx="16" cy="14" rx="2.5" ry="10" fill="#fda4af" />
      <ellipse cx="32" cy="14" rx="2.5" ry="10" fill="#fda4af" />
      <circle cx="24" cy="34" r="14" fill="#f8fafc" />
      <circle cx="19" cy="32" r="2" fill="#1a0f08" />
      <circle cx="29" cy="32" r="2" fill="#1a0f08" />
      <ellipse cx="24" cy="38" rx="3" ry="2" fill="#fda4af" />
    </svg>
  );
}

function Chick() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="22" r="12" fill="#fde047" />
      <circle cx="20" cy="12" r="8" fill="#facc15" />
      <circle cx="17" cy="11" r="1.5" fill="#1a0f08" />
      <circle cx="23" cy="11" r="1.5" fill="#1a0f08" />
      <path d="M20 13 L24 15 L20 17 Z" fill="#f97316" />
    </svg>
  );
}

function Clover() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="14" cy="16" r="7" fill="#22c55e" />
      <circle cx="26" cy="16" r="7" fill="#22c55e" />
      <circle cx="20" cy="26" r="7" fill="#16a34a" />
      <rect x="19" y="26" width="2" height="12" fill="#15803d" />
    </svg>
  );
}

function Coin() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="#fbbf24" />
      <circle cx="14" cy="14" r="8" fill="#f59e0b" />
      <text x="14" y="18" textAnchor="middle" fill="#78350f" fontSize="10" fontFamily="monospace">€</text>
    </svg>
  );
}

function Mask() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 64 36" fill="none" aria-hidden="true">
      <path d="M4 18 C8 4 24 2 32 8 C40 2 56 4 60 18 C52 28 40 30 32 24 C24 30 12 28 4 18 Z" fill="#c77dff" />
      <ellipse cx="20" cy="16" rx="6" ry="4" fill="#140818" />
      <ellipse cx="44" cy="16" rx="6" ry="4" fill="#140818" />
      <path d="M28 8 L32 2 L36 8" fill="#ffd166" />
    </svg>
  );
}

function Flower({ color = "#f9a8d4" }: { color?: string }) {
  return (
    <svg className="h-auto w-full" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="12" r="6" fill={color} />
      <circle cx="12" cy="20" r="6" fill={color} />
      <circle cx="28" cy="20" r="6" fill={color} />
      <circle cx="20" cy="28" r="6" fill={color} />
      <circle cx="20" cy="20" r="5" fill="#fde047" />
    </svg>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="14" fill="#fde047" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 32 + Math.cos(a) * 20;
        const y1 = 32 + Math.sin(a) * 20;
        const x2 = 32 + Math.cos(a) * 28;
        const y2 = 32 + Math.sin(a) * 28;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#facc15" strokeWidth="3" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function Wave() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 160 40" fill="none" aria-hidden="true">
      <path d="M0 24 Q20 8 40 24 T80 24 T120 24 T160 24 V40 H0 Z" fill="rgba(56,189,248,0.35)" />
      <path d="M0 28 Q20 14 40 28 T80 28 T120 28 T160 28" stroke="rgba(125,211,252,0.7)" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Lemon() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <ellipse cx="18" cy="20" rx="12" ry="14" fill="#facc15" transform="rotate(-20 18 20)" />
      <path d="M22 8 C26 6 30 10 28 12" stroke="#65a30d" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Flag() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 48 36" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="12" height="28" fill="#1d4ed8" />
      <rect x="16" y="4" width="12" height="28" fill="#f8fafc" />
      <rect x="28" y="4" width="12" height="28" fill="#dc2626" />
      <rect x="2" y="2" width="2" height="32" fill="#94a3b8" />
    </svg>
  );
}

function Pencil() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 16 56" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="8" height="36" fill="#f59e0b" />
      <rect x="4" y="8" width="8" height="8" fill="#ef4444" />
      <path d="M4 44 L8 54 L12 44 Z" fill="#fde68a" />
      <path d="M7 52 L8 54 L9 52 Z" fill="#1a0f08" />
    </svg>
  );
}

function Book() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 48 40" fill="none" aria-hidden="true">
      <path d="M4 8 H22 V36 H6 C4 36 4 34 4 34 Z" fill="#38bdf8" />
      <path d="M26 8 H44 V34 C44 34 44 36 42 36 H26 Z" fill="#f59e0b" />
      <rect x="22" y="8" width="4" height="28" fill="#f8fafc" />
    </svg>
  );
}

function Leaf({ color = "#ea580c" }: { color?: string }) {
  return (
    <svg className="h-auto w-full" viewBox="0 0 28 36" fill="none" aria-hidden="true">
      <path d="M14 2 C24 10 26 24 14 34 C2 24 4 10 14 2 Z" fill={color} />
      <path d="M14 6 V32" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
    </svg>
  );
}

function IceCrystal() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2 V30 M2 16 H30 M6 6 L26 26 M26 6 L6 26" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill="#e0f2fe" />
    </svg>
  );
}

function FallingBits({
  count,
  className,
  colors,
}: {
  count: number;
  className: string;
  colors: string[];
}) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={className}
          style={{
            left: `${(index * 37) % 100}%`,
            background: colors[index % colors.length],
            animationDelay: `${(index % 9) * 0.4}s`,
            animationDuration: `${6 + (index % 6)}s`,
          }}
        />
      ))}
    </>
  );
}

export function ThemeEffects() {
  const [theme, setTheme] = useState<SiteTheme | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setTheme(readTheme()), 0);
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  if (theme === null || theme === "default") {
    return null;
  }

  if (theme === "christmas") {
    return (
      <div className="theme-fx theme-fx-christmas pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <div className="garland" />
        {Array.from({ length: 36 }, (_, index) => (
          <span key={`snow-${index}`} className="snowflake" style={{ left: `${(index * 29) % 100}%`, animationDelay: `${(index % 11) * 0.4}s`, animationDuration: `${6.5 + (index % 6)}s` }} />
        ))}
        {Array.from({ length: 12 }, (_, index) => (
          <span key={`star-${index}`} className="xmas-star" style={{ left: `${6 + ((index * 7.5) % 88)}%`, top: `${8 + (index % 5) * 14}%`, animationDelay: `${index * 0.35}s` }} />
        ))}
        <ChristmasTree className="deco-tree deco-tree-left" />
        <ChristmasTree className="deco-tree deco-tree-right" />
        <ChristmasTree className="deco-tree deco-tree-mid hide-mobile-deco" />
        <GiftBox className="deco-gift deco-gift-a" />
        <GiftBox className="deco-gift deco-gift-b" />
        <Ornament className="deco-ornament deco-ornament-a" color="#e63946" />
        <Ornament className="deco-ornament deco-ornament-c" color="#3ddc97" />
        <CandyCane className="deco-candy deco-candy-a" />
        <CandyCane className="deco-candy deco-candy-b" />
      </div>
    );
  }

  if (theme === "halloween") {
    return (
      <div className="theme-fx theme-fx-halloween pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <div className="fog fog-a" />
        <div className="fog fog-b" />
        <Web className="deco-web deco-web-left" />
        <Web className="deco-web deco-web-right" />
        {Array.from({ length: 9 }, (_, index) => (
          <span key={`bat-${index}`} className="bat" style={{ left: `${4 + index * 10}%`, top: `${6 + (index % 4) * 11}%`, animationDelay: `${index * 0.55}s` }} />
        ))}
        {Array.from({ length: 5 }, (_, index) => (
          <span key={`thread-${index}`} className="spider-thread" style={{ left: `${18 + index * 16}%`, animationDelay: `${index * 0.8}s` }}>
            <Spider className="deco-spider" />
          </span>
        ))}
        <Pumpkin className="deco-pumpkin deco-pumpkin-a" />
        <Pumpkin className="deco-pumpkin deco-pumpkin-c" />
        <Ghost className="deco-ghost deco-ghost-a" />
        <Ghost className="deco-ghost deco-ghost-b" />
        <Tombstone className="deco-tomb deco-tomb-a hide-mobile-deco" />
        <FallingBits count={14} className="ember" colors={["#ff7a18"]} />
      </div>
    );
  }

  if (theme === "easter") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <FallingBits count={18} className="petal" colors={["#f9a8d4", "#93c5fd", "#fde68a", "#c4b5fd"]} />
        <Pin className="deco-egg" style={{ left: "1.25rem" }}><Egg /></Pin>
        <Pin className="deco-egg hide-mobile-deco" style={{ left: "4.5rem", bottom: "2.5rem" }}><Egg color="#93c5fd" /></Pin>
        <Pin className="deco-egg" style={{ right: "1.5rem" }}><Egg color="#fde68a" /></Pin>
        <Pin className="deco-bunny hide-mobile-deco" style={{ left: "42%" }}><Bunny /></Pin>
        <Pin className="deco-chick" style={{ right: "5.5rem" }}><Chick /></Pin>
        <Pin className="deco-flower" style={{ top: "5rem", left: "8%" }}><Flower /></Pin>
        <Pin className="deco-flower" style={{ top: "8rem", right: "12%" }}><Flower color="#93c5fd" /></Pin>
      </div>
    );
  }

  if (theme === "valentine") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <Pin
            key={index}
            className="deco-heart"
            style={{
              left: `${6 + ((index * 7) % 88)}%`,
              top: `${10 + (index % 6) * 12}%`,
              width: `${18 + (index % 4) * 6}px`,
              animationDelay: `${index * 0.25}s`,
              opacity: 0.35 + (index % 5) * 0.1,
            }}
          >
            <Heart />
          </Pin>
        ))}
      </div>
    );
  }

  if (theme === "newyear") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <FallingBits count={28} className="confetti" colors={["#ffd700", "#a78bfa", "#ffffff", "#f472b6", "#38bdf8"]} />
        {Array.from({ length: 8 }, (_, index) => (
          <span
            key={index}
            className="firework"
            style={{
              left: `${10 + index * 11}%`,
              top: `${12 + (index % 3) * 16}%`,
              color: ["#ffd700", "#a78bfa", "#38bdf8", "#f472b6"][index % 4],
              animationDelay: `${index * 0.35}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === "carnival") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <FallingBits count={30} className="confetti" colors={["#ff6b35", "#ffd166", "#c77dff", "#f72585", "#4cc9f0"]} />
        <Pin className="deco-mask" style={{ left: "1.5rem" }}><Mask /></Pin>
        <Pin className="deco-mask hide-mobile-deco" style={{ right: "1.5rem", transform: "scaleX(-1)" }}><Mask /></Pin>
      </div>
    );
  }

  if (theme === "stpatrick") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <Pin
            key={index}
            className="deco-clover"
            style={{
              left: `${8 + ((index * 9) % 84)}%`,
              top: `${12 + (index % 4) * 16}%`,
              animationDelay: `${index * 0.3}s`,
              opacity: 0.55,
            }}
          >
            <Clover />
          </Pin>
        ))}
        <Pin className="deco-coin" style={{ bottom: "1.5rem", left: "1.5rem" }}><Coin /></Pin>
        <Pin className="deco-coin" style={{ bottom: "2rem", left: "4rem" }}><Coin /></Pin>
        <Pin className="deco-coin" style={{ bottom: "1.5rem", right: "2rem" }}><Coin /></Pin>
      </div>
    );
  }

  if (theme === "spring") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <FallingBits count={20} className="petal" colors={["#86efac", "#f9a8d4", "#fde68a", "#bbf7d0"]} />
        <Pin className="deco-flower" style={{ bottom: "1.5rem", left: "1.25rem" }}><Flower color="#86efac" /></Pin>
        <Pin className="deco-flower" style={{ bottom: "1.5rem", left: "4.5rem" }}><Flower /></Pin>
        <Pin className="deco-flower" style={{ bottom: "1.5rem", right: "1.5rem" }}><Flower color="#fde68a" /></Pin>
        <Pin className="deco-flower hide-mobile-deco" style={{ top: "6rem", right: "18%" }}><Flower color="#bbf7d0" /></Pin>
      </div>
    );
  }

  if (theme === "summer") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <Sun className="deco-sun" />
        <Pin className="deco-wave" style={{ left: "1rem" }}><Wave /></Pin>
        <Pin className="deco-wave hide-mobile-deco" style={{ right: "1rem" }}><Wave /></Pin>
        <Pin className="deco-lemon" style={{ left: "1.5rem" }}><Lemon /></Pin>
        <Pin className="deco-lemon" style={{ right: "2rem" }}><Lemon /></Pin>
      </div>
    );
  }

  if (theme === "bastille") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <span
            key={index}
            className="firework"
            style={{
              left: `${8 + index * 11}%`,
              top: `${10 + (index % 3) * 14}%`,
              color: ["#3b82f6", "#ffffff", "#ef4444"][index % 3],
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
        <Pin className="deco-flag" style={{ left: "1.25rem" }}><Flag /></Pin>
        <Pin className="deco-flag" style={{ right: "1.25rem" }}><Flag /></Pin>
        <FallingBits count={20} className="confetti" colors={["#3b82f6", "#ffffff", "#ef4444"]} />
      </div>
    );
  }

  if (theme === "backtoschool") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <Pin className="deco-book" style={{ left: "1.25rem" }}><Book /></Pin>
        <Pin className="deco-book hide-mobile-deco" style={{ right: "5rem" }}><Book /></Pin>
        <Pin className="deco-pencil" style={{ left: "5rem", transform: "rotate(-18deg)" }}><Pencil /></Pin>
        <Pin className="deco-pencil" style={{ right: "1.5rem", transform: "rotate(12deg)" }}><Pencil /></Pin>
        <FallingBits count={12} className="leaf-fall" colors={["#f59e0b", "#38bdf8", "#ef4444"]} />
      </div>
    );
  }

  if (theme === "autumn") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <FallingBits count={24} className="leaf-fall" colors={["#ea580c", "#f59e0b", "#b45309", "#dc2626"]} />
        <Pin className="deco-leaf" style={{ bottom: "1.5rem", left: "1.25rem" }}><Leaf /></Pin>
        <Pin className="deco-leaf" style={{ bottom: "2rem", left: "4rem" }}><Leaf color="#f59e0b" /></Pin>
        <Pin className="deco-leaf" style={{ bottom: "1.5rem", right: "1.5rem" }}><Leaf color="#b45309" /></Pin>
      </div>
    );
  }

  if (theme === "winter") {
    return (
      <div className="theme-fx pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {Array.from({ length: 40 }, (_, index) => (
          <span key={index} className="snowflake" style={{ left: `${(index * 27) % 100}%`, animationDelay: `${(index % 10) * 0.35}s`, animationDuration: `${7 + (index % 5)}s` }} />
        ))}
        <Pin className="deco-ice" style={{ top: "5rem", left: "8%" }}><IceCrystal /></Pin>
        <Pin className="deco-ice" style={{ top: "8rem", right: "12%" }}><IceCrystal /></Pin>
        <Pin className="deco-ice hide-mobile-deco" style={{ bottom: "4rem", left: "40%" }}><IceCrystal /></Pin>
      </div>
    );
  }

  return null;
}
