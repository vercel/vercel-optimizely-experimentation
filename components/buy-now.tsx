"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { trackProductPurchase } from "@/lib/actions";

export default function BuyNowButton(props: { text: string }) {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={(e) => {
        trackProductPurchase();
        toast.success("Product purchased!");
      }}
    >
      {props.text}
    </Button>
  );
}
