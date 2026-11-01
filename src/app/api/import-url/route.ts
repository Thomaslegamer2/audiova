import { NextResponse } from "next/server";
import { UrlFetchError, fetchMediaFromUrl } from "@/lib/audio/fetch-url";
import { parseImportUrl } from "@/lib/audio/url-import";
import { consumeUrlImportSlot } from "@/lib/audio/url-rate-limit";
import { logTechnical } from "@/lib/audio/conversion";
import {
  recordUrlBusy,
  recordUrlImportAttempt,
  recordUrlImportFailure,
  recordUrlImportSuccess,
  recordUrlRateLimited,
} from "@/lib/admin/metrics";
import { readSiteConfig } from "@/lib/site-config";
import type { ErrorCode } from "@/types/audio";

let busy = false;

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

function errorResponse(code: ErrorCode, status: number) {
  recordUrlImportFailure(code);
  return NextResponse.json({ error: code }, { status });
}

export async function POST(request: Request) {
  const site = await readSiteConfig();
  if (!site.urlImportEnabled) {
    return errorResponse("url-unavailable", 503);
  }

  recordUrlImportAttempt();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("url-invalid", 400);
  }

  const raw = typeof body === "object" && body && "url" in body ? String((body as { url: unknown }).url ?? "") : "";
  const parsed = parseImportUrl(raw);
  if (!parsed.ok) {
    return errorResponse(parsed.code, 400);
  }

  if (!consumeUrlImportSlot(clientKey(request))) {
    recordUrlRateLimited();
    return errorResponse("url-rate", 429);
  }

  if (busy) {
    recordUrlBusy();
    return errorResponse("url-busy", 503);
  }

  busy = true;
  try {
    const media = await fetchMediaFromUrl(parsed.url.toString());
    const copy = new Uint8Array(media.bytes.byteLength);
    copy.set(media.bytes);
    recordUrlImportSuccess(copy.byteLength, parsed.url.hostname);
    return new NextResponse(Buffer.from(copy), {
      status: 200,
      headers: {
        "Content-Type": media.mime,
        "Content-Length": String(copy.byteLength),
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(media.fileName)}`,
        "X-Audiova-Filename": encodeURIComponent(media.fileName),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof UrlFetchError) {
      logTechnical(error.code, error.message);
      const status = error.code === "too-large" ? 413 : error.code === "unsupported" ? 415 : 422;
      return errorResponse(error.code, status);
    }
    logTechnical("url-fetch", error instanceof Error ? error.message : undefined);
    return errorResponse("url-fetch", 500);
  } finally {
    busy = false;
  }
}
