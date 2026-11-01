import { createToolRoute } from "@/lib/seo/create-tool-route";

const route = createToolRoute("m4a-vers-mp3");

export const metadata = route.metadata;
export default route.Page;
