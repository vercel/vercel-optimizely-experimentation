import { products } from "@/lib/products";
import ProductCard from "./product-card";
import { Skeleton } from "./ui/skeleton";

export default async function RelatedProducts(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const relatedProducts = products
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);
  if (!relatedProducts.length) {
    return null;
  }

  return (
    <section className="flex flex-col w-full justify-center py-6 space-y-4 md:py-8 lg:py-12">
      <h2 className="font-bold text-2xl">Related Products</h2>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {relatedProducts.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>
    </section>
  );
}

export const RelatedProductsSkeleton = () => {
  return (
    <section className="flex flex-col w-full justify-center py-6 space-y-4 md:py-8 lg:py-12">
      <h2 className="font-bold text-2xl">Related Products</h2>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        <Skeleton className="h-[350px]  rounded-lg" />
        <Skeleton className="h-[350px]  rounded-lg" />
        <Skeleton className="h-[350px]  rounded-lg" />
      </div>
    </section>
  );
};
