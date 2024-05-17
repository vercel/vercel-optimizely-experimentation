import { unstable_declareMiddlewareFlag } from "@vercel/flags/next/middleware";

interface Context {}

export const showPromoBannerFlag = unstable_declareMiddlewareFlag<
  boolean,
  Context
>({
  key: "showPromoBanner",
  async decide({ request, context }) {
    return false;
  },
});
