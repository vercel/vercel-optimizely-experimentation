"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { addToCart } from "@/lib/actions";

export default function AddToCartButton({ productId }: { productId: string }) {
  return (
    <Button
      className="w-full"
      onClick={(e) => {
        addToCart(productId);
        toast.info("Product added to cart!");
      }}
    >
      Add to Cart
    </Button>
  );
}
