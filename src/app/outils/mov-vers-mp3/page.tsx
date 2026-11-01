import { createToolRoute } from "@/lib/seo/create-tool-route";

const route = createToolRoute("mov-vers-mp3");

export const metadata = route.metadata;
export default route.Page;
