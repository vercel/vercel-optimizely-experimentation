import { unstable_declareMiddlewareFlag as declareMiddlewareFlag } from "@vercel/flags/next/middleware";

interface Context {}

export const showPromoBannerFlag = declareMiddlewareFlag<boolean, Context>({
  key: "showPromoBanner",
  async decide({ request, context }) {
    return false;
  },
});
