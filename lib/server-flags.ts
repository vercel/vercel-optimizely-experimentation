import optimizely from "@optimizely/optimizely-sdk";
import { unstable_declareServerFlag as declareServerFlag } from "@vercel/flags/next/server";
import { getCookieFromHeaders } from "./utils";
import { reportValue } from "@vercel/flags";

export const showBuyNowFlag = declareServerFlag<boolean>({
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
