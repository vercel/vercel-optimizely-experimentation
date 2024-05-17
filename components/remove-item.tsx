"use client";

import { removeFromCart } from "@/lib/actions";
import { Button } from "./ui/button";

export default function RemoveItemButton({ productId }: { productId: string }) {
  return (
    <Button
      onClick={() => {
        removeFromCart(productId);
      }}
      className="h-full p-0 text-red-600"
      variant="link"
    >
      Remove
    </Button>
  );
}
