"use client";

import Link from "next/link";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlider } from "@/components/ui/SectionSlider";

const collections = [
  { href: "/shop?gender=women", label: "Women", image: "/images/categories/fashion.png" },
  { href: "/shop?gender=men", label: "Men", image: "/images/categories/new-arrivals.png" },
  { href: "/shop?gender=kids", label: "Kids", image: "/images/categories/lifestyle.png" },
];

export function ShopByGender() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mb-8 text-center">
        <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Collections</p>
        <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Women, Men, Kids</h2>
        <Ornament className="mt-5" />
      </Reveal>
      <SectionSlider perView={3} breakpoints={{ sm: 1, md: 2, lg: 3 }}>
        {collections.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group relative block aspect-[4/5] overflow-hidden bg-cream"
          >
            <CatalogImage
              src={item.image}
              alt={item.label}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-6 font-serif text-3xl text-ivory">
              {item.label}
            </span>
          </Link>
        ))}
      </SectionSlider>
    </section>
  );
}
