import PlaceOrderButton from "@/components/place-order";
import RemoveItemButton from "@/components/remove-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/lib/products";
import { formatUSD } from "@/lib/utils";
import { cookies } from "next/headers";
import Image from "next/image";

export default function CartPage() {
  return (
    <main className="max-w-5xl mx-auto py-6 px-4 md:px-6">
      <h1 className="font-bold text-3xl lg:text-4xl">Checkout</h1>
      <section className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start py-4 md:py-8 lg:py-12">
        <div className="flex flex-col gap-y-2">
          <Card className="bg-gray-100">
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-100">
            <CardHeader>
              <CardTitle>Billing</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-100">
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
          </Card>
          <Cart />
        </div>
        <OrderSummary />
      </section>
    </main>
  );
}

async function getProductsFromCookie() {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart");
  const cartProductIds = cart?.value
    ? (JSON.parse(cart.value) as string[])
    : [];
  return cartProductIds.map((id) => ({
    ...products.filter((p) => p.id === id)[0],
  }));
}

async function Cart() {
  const products = await getProductsFromCookie();

  const total = products.reduce((acc, product) => acc + product.price, 0);

  const showEmptyCart = products.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {showEmptyCart ? (
          <div>Your cart is empty</div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <Image
                  alt="Product Image"
                  className="rounded-md h-16 w-16"
                  height="64"
                  width="64"
                  src={product.imageSrc}
                />
                <div className="grid gap-1 w-full">
                  <div className="flex flex-row justify-between">
                    <div className="font-medium">{product.title}</div>
                    <RemoveItemButton productId={product.id} />
                  </div>
                  <div className="text-gray-500">Quantity: 1</div>
                  <div>{formatUSD(product.price)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xl font-semibold">Total: {formatUSD(total)}</div>
      </CardFooter>
    </Card>
  );
}

async function OrderSummary() {
  const products = await getProductsFromCookie();

  const subtotal = products.reduce((acc, product) => acc + product.price, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatUSD(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$4.99</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatUSD(0.1 * subtotal)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center gap-2">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">
            {formatUSD(subtotal + 4.99 + 0.1 * subtotal)}
          </span>
        </div>
      </CardFooter>
      {products.length > 0 && (
        <CardFooter>
          <PlaceOrderButton />
        </CardFooter>
      )}
    </Card>
  );
}
