"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlider } from "@/components/ui/SectionSlider";
import type { Product } from "@/lib/types";

export function ProductRail({
  id,
  eyebrow,
  title,
  href,
  products,
  muted = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
  muted?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <section id={id} className={muted ? "border-y border-line bg-cream/30" : "bg-ivory"}>
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-8 text-center">
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">{eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{title}</h2>
          <Ornament className="mt-5" />
        </Reveal>
        <SectionSlider perView={4}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SectionSlider>
        <div className="mt-12 text-center">
          <Link
            href={href}
            className="text-[12px] tracking-[0.2em] uppercase text-bronze hover:text-ink"
          >
            Shop this edit
          </Link>
        </div>
      </div>
    </section>
  );
}
