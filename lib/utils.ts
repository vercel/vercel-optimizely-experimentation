import { type ClassValue, clsx } from "clsx";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { twMerge } from "tailwind-merge";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getShopperFromHeaders(
  headers: ReadonlyHeaders
): string | "default" {
  const cookieString = headers.get("cookie");
  if (!cookieString) {
    return "default";
  }
  const cookies = cookieString.split("; ");
  const cookie = cookies.find((cookie: any) =>
    cookie.startsWith("shopper" + "=")
  );
  return cookie ? cookie.split("=")[1] : "default";
}

export function formatUSD(amount: number) {
  return formatter.format(amount);
}
