import type { MetadataRoute } from "next";
import { fr } from "@/i18n/fr";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Audiova",
    short_name: "Audiova",
    description: fr.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050510",
    theme_color: "#050510",
    lang: "fr",
  };
}
