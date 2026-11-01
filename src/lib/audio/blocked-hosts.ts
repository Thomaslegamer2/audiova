/**
 * Domaines dont les conditions d’utilisation interdisent en général le téléchargement
 * automatisé. Modifiable sans toucher à la logique FFmpeg.
 *
 * Correspondance : hôte exact ou sous-domaine (ex. m.youtube.com → youtube.com).
 */
export const BLOCKED_STREAMING_HOSTS: readonly string[] = [
  "youtube.com",
  "youtu.be",
  "youtube-nocookie.com",
  "googlevideo.com",
  "spotify.com",
  "open.spotify.com",
  "deezer.com",
  "tidal.com",
  "music.apple.com",
  "itunes.apple.com",
  "apple.com",
  "netflix.com",
  "disneyplus.com",
  "primevideo.com",
  "amazon.com",
  "twitch.tv",
  "soundcloud.com",
  "bandcamp.com",
  "vimeo.com",
  "dailymotion.com",
  "tiktok.com",
  "instagram.com",
  "facebook.com",
  "fb.watch",
  "crunchyroll.com",
  "hulu.com",
  "max.com",
  "hbomax.com",
  "peacocktv.com",
  "paramountplus.com",
  "canalplus.com",
  "arte.tv",
  "france.tv",
  "tf1.fr",
  "m6.fr",
];

export function isBlockedStreamingHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!host) {
    return false;
  }
  return BLOCKED_STREAMING_HOSTS.some(
    (blocked) => host === blocked || host.endsWith(`.${blocked}`),
  );
}
