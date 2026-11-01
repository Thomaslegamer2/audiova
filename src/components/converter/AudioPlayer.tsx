"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers";
import { computePeaks } from "@/lib/audio/peaks";
import { WAVEFORM_MAX_BYTES } from "@/lib/constants";
import { formatDuration } from "@/lib/utils";

interface AudioPlayerProps {
  source: Blob;
  label: string;
}

export function AudioPlayer({ source, label }: AudioPlayerProps) {
  const t = useI18n();
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [failed, setFailed] = useState(false);
  const [peaks, setPeaks] = useState<Float32Array | null>(null);
  const [trackedSource, setTrackedSource] = useState(source);

  if (trackedSource !== source) {
    setTrackedSource(source);
    setFailed(false);
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    setPeaks(null);
  }

  useEffect(() => {
    const objectUrl = URL.createObjectURL(source);
    // L'URL est une ressource externe. En mode strict, le nettoyage révoque
    // la première adresse et cette configuration doit en publier une nouvelle.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- cycle de vie d'une object URL
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
      setUrl((current) => (current === objectUrl ? null : current));
    };
  }, [source]);

  useEffect(() => {
    if (source.size > WAVEFORM_MAX_BYTES) {
      return;
    }
    let cancelled = false;
    const context = new AudioContext();
    source
      .arrayBuffer()
      .then((buffer) => context.decodeAudioData(buffer.slice(0)))
      .then((decoded) => {
        if (!cancelled) {
          setPeaks(computePeaks(decoded.getChannelData(0), 120));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPeaks(null);
        }
      })
      .finally(() => {
        void context.close();
      });
    return () => {
      cancelled = true;
    };
  }, [source]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !peaks) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    const played = duration > 0 ? current / duration : 0;
    const barWidth = width / peaks.length;
    peaks.forEach((peak, index) => {
      const barHeight = Math.max(2, peak * (height - 4));
      const x = index * barWidth;
      const y = (height - barHeight) / 2;
      context.fillStyle = index / peaks.length <= played ? "#A78BFA" : "#292D3D";
      context.fillRect(x, y, Math.max(1, barWidth - dpr), barHeight);
    });
  }, [peaks, current, duration]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setFailed(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (failed) {
    return <p className="text-sm text-muted">{t.converter.playbackUnsupported}</p>;
  }

  if (!url) {
    return null;
  }

  const shownDuration = formatDuration(duration || null) ?? "0:00";
  const shownCurrent = formatDuration(current) ?? "0:00";

  return (
    <div className="rounded-xl border border-line bg-canvas/60 p-3" role="region" aria-label={label}>
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => void toggle()}
          className="btn-brand grid size-11 shrink-0 place-items-center rounded-full"
          aria-label={playing ? t.player.pause : t.player.play}
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="ml-0.5 size-4" aria-hidden="true" />}
        </button>
        <p className="font-mono text-xs text-muted">
          <span className="text-ink">{shownCurrent}</span>
          <span> / {shownDuration}</span>
        </p>
      </div>
      {peaks ? <canvas ref={canvasRef} className="mt-3 h-10 w-full" aria-hidden="true" /> : null}
      <label className="mt-2 block">
        <span className="sr-only">{t.player.position}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(current, duration || 0)}
          onChange={(event) => {
            const next = Number(event.target.value);
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = next;
            }
            setCurrent(next);
          }}
          className="h-11 w-full cursor-pointer accent-violet"
        />
      </label>
      <div className="mt-1 flex items-center gap-3">
        <span className="sr-only">{t.player.volume}</span>
        <button
          type="button"
          className="grid size-11 place-items-center text-muted"
          aria-label={volume === 0 ? t.player.unmute : t.player.mute}
          onClick={() => {
            const next = volume === 0 ? 1 : 0;
            setVolume(next);
            if (audioRef.current) {
              audioRef.current.volume = next;
            }
          }}
        >
          {volume === 0 ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          aria-label={t.player.volume}
          onChange={(event) => {
            const next = Number(event.target.value);
            setVolume(next);
            if (audioRef.current) {
              audioRef.current.volume = next;
            }
          }}
          className="h-11 w-full cursor-pointer accent-violet"
        />
      </div>
    </div>
  );
}
