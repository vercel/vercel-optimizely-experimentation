import optimizely from "@optimizely/optimizely-sdk";
import { unstable_flag as flag } from "@vercel/flags/next";
import { getShopperFromHeaders } from "./utils";
import { reportValue } from "@vercel/flags";

export const showBuyNowFlag = flag<boolean>({
  key: "buynow",
  description: "Flag for showing Buy Now button on PDP",
  options: [
    { label: "off", value: false },
    { label: "on", value: true },
  ],
  async decide({ headers }) {
    return false;
  },
});

export const showPromoBannerFlag = flag<boolean>({
  key: "showPromoBanner",
  async decide() {
    return false;
  },
});

export const precomputeFlags = [showPromoBannerFlag] as const;
