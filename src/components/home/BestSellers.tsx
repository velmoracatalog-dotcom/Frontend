"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlider } from "@/components/ui/SectionSlider";
import { useCatalog } from "@/context/CatalogContext";

export function BestSellers() {
  const { products } = useCatalog();

  return (
    <section id="shop" className="border-y border-line bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-8 text-center">
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The Edit</p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Best Sellers</h2>
          <Ornament className="mt-5" />
        </Reveal>
        <SectionSlider perView={4}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SectionSlider>
      </div>
    </section>
  );
}
