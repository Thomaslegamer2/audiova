import type { MetadataRoute } from "next";
import { fr } from "@/i18n/fr";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Audiova",
    short_name: "Audiova",
    description: fr.meta.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#050510",
    theme_color: "#050510",
    lang: "fr",
    categories: ["utilities", "music"],
    icons: [
      {
        src: "/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
