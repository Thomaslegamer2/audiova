import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "nav",
}: {
  className?: string;
  size?: "nav" | "footer";
}) {
  const height = size === "footer" ? 72 : 40;
  const width = size === "footer" ? 72 : 40;

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="Audiova">
      <Image
        src="/brand/audiova-logo.jpg"
        alt=""
        width={width}
        height={height}
        className={cn(
          "logo-wave rounded-xl object-cover",
          size === "footer" ? "size-[4.5rem]" : "size-10",
        )}
        priority={size === "nav"}
      />
      <span className="text-[15px] font-semibold tracking-tight">
        <span className="text-ink">Audio</span>
        <span className="gradient-text">va</span>
      </span>
    </Link>
  );
}
