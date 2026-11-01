# Audiova

Convertisseur audio dans le navigateur (**audiova.site**). Les fichiers choisis sur l’appareil restent locaux : FFmpeg.wasm les encode, puis le format choisi est proposé au téléchargement. Un lien vidéo ou audio peut aussi être importé : le serveur récupère temporairement le média avec yt-dlp, puis la conversion reste locale.

Accroche : Convertissez en MP3 en 3 clics, sans compte ni téléversement (fichiers locaux).

## Fonctionnalités

- Import de fichiers (20 max), glisser-déposer, et import depuis un lien (`/api/import-url`) avec confirmation de droits et domaines streaming bloqués.
- Sorties : MP3, WAV, FLAC, AAC, OGG, M4A — presets Podcast 128 / Équilibré 192 / Qualité max 320.
- Métadonnées recopiées quand FFmpeg le permet ; lecteur local ; historique navigateur (re-téléchargement ~30 min).
- 7 langues (fr, en, es, de, it, pt, nl) et thèmes saisonniers **automatiques** (calendrier Europe/Paris, sans choix manuel).
- Pages SEO `/outils/*` (WAV, FLAC, M4A, OGG, MP4 → MP3, etc.) ; sitemap + robots.
- PWA (service worker + cache moteur FFmpeg une fois chargé).
- Bannière de consentement, analytics internes optionnelles, pubs AdSense gated (désactivées sur /privacy et /legal), bouton don.
- Console admin cachée `/av-ctl` : thèmes, analytics réelles, toggles site, sécurité.

Limites code : 100 Mo / fichier, 20 fichiers, 1 conversion à la fois, timeout 15 min.

## Démarrage (Windows)

```powershell
cd $HOME\Desktop\convertube
copy .env.example .env.local
# Renseigner ADMIN_PASSWORD (≥12) et ADMIN_SESSION_SECRET (≥32)
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Admin : [http://localhost:3000/av-ctl](http://localhost:3000/av-ctl).

Variables utiles (voir `.env.example`) :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (sitemap, canonical) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Affiché sur `/contact` si valide |
| `NEXT_PUBLIC_ADS_ENABLED` | Hint legacy ; le toggle admin `adsEnabled` prime via `audiova-theme.json` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` / `SLOT` | Emplacement AdSense optionnel |
| `NEXT_PUBLIC_DONATE_URL` | Lien Ko-fi / Buy Me a Coffee |
| `ADMIN_PASSWORD` | Mot de passe admin (≥ 8 caractères) |
| `ADMIN_SESSION_SECRET` | Secret HMAC session (≥ 32 caractères) |

## Vérifier

```powershell
npm test
npm run lint
npm run build
```

E2E (optionnel) :

```powershell
npx playwright install chromium
npm run test:e2e
```

## Architecture

- **Conversion** : 100 % navigateur via `FfmpegEngine` (`src/lib/audio/engine.ts`), cœur mono-thread ~32 Mo dans `public/ffmpeg/`.
- **Import URL** : `src/app/api/import-url` + yt-dlp, SSRF DNS, rate-limit, fichier temporaire effacé.
- **Config site** : `data/site-config.json` (thème, ads, analytics, import URL) + miroir public `public/audiova-theme.json`.
- **Analytics** : événements consentis → `data/analytics/` (fichiers journaliers). Pas de faux chiffres.
- **Outils** : catalogue `src/lib/tools/registry.ts` (`live` vs `planned`).
- **Sécurité** : headers CSP, admin HMAC 8 h, SameSite strict, rate-limit login, journal sécurité.

Scripts `dev` / `build` utilisent Webpack (`--webpack`) : Turbopack ne pack pas correctement le worker FFmpeg.

## Structure

```text
src/app/                 pages, API, sitemap, robots
src/components/          UI publique + admin
src/lib/audio/           validation, FFmpeg, SSRF, import URL
src/lib/analytics/       store + client consentement
src/lib/admin/           auth, métriques process, stats
src/lib/tools/           registre SEO / roadmap outils
src/i18n/                dictionnaires
data/                    runtime (gitignoré)
```

## Production

```powershell
npm run build
npm start
```

Définir `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET` sur l’hébergeur. Exécuter `npm run ffmpeg:copy` si `postinstall` n’est pas lancé. Pas de base SQL à migrer.

## Licences

Le cœur `@ffmpeg/core` est sous GPL (libmp3lame). FFmpeg est une marque du projet FFmpeg. Voir `/legal`.
