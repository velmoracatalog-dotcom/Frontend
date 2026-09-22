"use client";

import { addToCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { formatPKR } from "@/lib/format";
import type { Product } from "@/lib/types";
import { CatalogImage } from "./CatalogImage";
import { StarRating } from "./StarRating";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const add = () =>
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    );

  return (
    <article className="group flex flex-col transition duration-500 hover:-translate-y-1.5">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-cream">
        <CatalogImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <button
          type="button"
          onClick={add}
          className="absolute inset-x-4 bottom-4 translate-y-4 bg-ivory/95 py-2.5 text-[11px] tracking-[0.2em] text-ink uppercase opacity-0 backdrop-blur-sm transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-[10px] tracking-[0.2em] text-bronze uppercase">{product.category}</p>
        <h3 className="mt-1 font-serif text-xl tracking-wide text-ink">{product.name}</h3>
        <p className="mt-1 text-sm text-stone">{formatPKR(product.price)}</p>
        <div className="mt-2">
          <StarRating rating={product.rating} />
        </div>
        <button
          type="button"
          onClick={add}
          className="btn-fill mt-4 w-full border border-ink bg-ink py-2.5 text-[11px] font-medium tracking-[0.22em] text-ivory uppercase"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}
