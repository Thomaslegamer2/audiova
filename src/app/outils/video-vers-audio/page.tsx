import { createToolRoute } from "@/lib/seo/create-tool-route";

const route = createToolRoute("video-vers-audio");

export const metadata = route.metadata;
export default route.Page;
