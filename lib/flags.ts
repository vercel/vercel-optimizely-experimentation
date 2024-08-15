import optimizely from "@optimizely/optimizely-sdk";
import { unstable_flag as flag } from "@vercel/flags/next";
import { getShopperFromHeaders } from "./utils";

export const showBuyNowFlag = flag<{
  enabled: boolean;
  buttonText?: string;
}>({
  key: "buynow",
  description: "Flag for showing Buy Now button on PDP",
  options: [
    { label: "Hide", value: { enabled: false } },
    { label: "Show", value: { enabled: true } },
  ],
  async decide({ headers }) {
    const client = optimizely.createInstance({
      sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
    });

    if (!client) {
      throw new Error("Failed to create client");
    }

    await client.onReady();

    const shopper = getShopperFromHeaders(headers);
    const context = client.createUserContext(shopper);

    if (!context) {
      throw new Error("Failed to create user context");
    }

    const decision = context.decide("buynow");
    const flag = {
      enabled: decision.enabled,
      buttonText: decision.variables.buynow_text as string,
    };

    return flag;
  },
});

export const showPromoBannerFlag = flag<boolean>({
  key: "showPromoBanner",
  defaultValue: false,
  description: "Flag for showing promo banner on homepage",
  options: [
    { value: false, label: "Hide" },
    { value: true, label: "Show" },
  ],
  async decide() {
    return false;
  },
});

export const precomputeFlags = [showPromoBannerFlag] as const;
