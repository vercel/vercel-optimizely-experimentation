"use client";

import { placeOrder } from "@/lib/actions";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function PlaceOrderButton() {
  return (
    <Button
      onClick={() => {
        placeOrder();
        toast.success("Order placed!");
      }}
      className="w-full"
    >
      Place Order
    </Button>
  );
}
