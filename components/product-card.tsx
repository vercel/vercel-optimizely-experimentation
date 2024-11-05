import Image from "next/image";
import Link from "next/link";
import { formatUSD } from "@/lib/utils";

export default function ProductCard({
  product,
}: {
  product: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    price: number;
    slug: string;
  };
}) {
  const { imageSrc, imageAlt, title, price, slug } = product;
  return (
    <div className="flex flex-col items-center gap-0 border border-gray-200 rounded-lg shadow-lg">
      <Image
        alt={imageAlt}
        className="object-cover rounded-t-lg bg-slate-300 w-full"
        height="350"
        width="350"
        src={imageSrc}
      />
      <div className="flex flex-col p-4 space-y-4 items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{formatUSD(price)}</p>
        <Link
          prefetch={true}
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          href={`/product/${slug}`}
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
