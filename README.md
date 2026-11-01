# Audiova

Convertisseur audio dans le navigateur (**audiova.site**). Les fichiers choisis sur l’appareil restent locaux : FFmpeg.wasm les encode, puis le format choisi est proposé au téléchargement. Un lien vidéo ou audio peut aussi être importé : le serveur récupère temporairement le média avec yt-dlp, puis la conversion reste locale.

Slogan : Your audio. Your format. Your freedom.

## Fonctionnalités

- Import de fichiers (5 max), glisser-déposer, et import depuis un lien (`/api/import-url`).
- Sorties : MP3, WAV, FLAC, AAC, OGG, M4A — débits et fréquences réglables selon le format.
- Métadonnées recopiées quand FFmpeg le permet ; lecteur local ; historique navigateur (sans audio).
- 7 langues (fr, en, es, de, it, pt, nl) et 14 thèmes saisonniers pilotés depuis l’admin.
- Pages SEO `/outils/*` pour les convertisseurs réellement disponibles ; outils futurs clairement marqués « bientôt ».
- Bannière de consentement, analytics internes optionnelles, emplacements pubs gated (désactivés par défaut).
- Console admin cachée `/av-ctl` : thèmes, analytics réelles, toggles site, sécurité.

Limites code : 100 Mo / fichier, 5 fichiers, 1 conversion à la fois, timeout 15 min.

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
| `ADMIN_PASSWORD` | Mot de passe admin (≥ 12 caractères) |
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
