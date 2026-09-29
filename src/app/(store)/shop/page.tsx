"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Ornament } from "@/components/ui/Ornament";
import { useCatalog } from "@/context/CatalogContext";

export default function ShopPage() {
  const { products, categories } = useCatalog();
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter(
      (product) => product.category.toLowerCase() === active.toLowerCase(),
    );
  }, [active, products]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-12 text-center">
        <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The Shop</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl">All Pieces</h1>
        <Ornament className="mt-5" />
      </div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase ${
            active === "all" ? "bg-ink text-ivory" : "border border-line text-ink"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActive(category.name)}
            className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase ${
              active === category.name ? "bg-ink text-ivory" : "border border-line text-ink"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
