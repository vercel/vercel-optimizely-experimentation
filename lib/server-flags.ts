import optimizely from "@optimizely/optimizely-sdk";
import { unstable_declareServerFlag } from "@vercel/flags/next/server";
import { getCookieFromHeaders } from "./utils";

export const showBuyNowFlag = unstable_declareServerFlag<boolean>({
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
