"use client";

import { StarRating } from "@/components/ui/StarRating";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlider } from "@/components/ui/SectionSlider";
import { useCatalog } from "@/context/CatalogContext";

export function Reviews() {
  const { reviews } = useCatalog();

  return (
    <section className="border-y border-line bg-cream/50">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-8 text-center">
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Kind Words</p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Customer Reviews</h2>
          <Ornament className="mt-5" />
        </Reveal>
        <SectionSlider perView={3} breakpoints={{ sm: 1, md: 2, lg: 3 }}>
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="flex h-full flex-col border border-line bg-ivory px-7 py-9"
            >
              <span className="font-serif text-5xl leading-none text-bronze/50">“</span>
              <StarRating rating={review.rating} />
              <p className="mt-4 font-serif text-2xl leading-snug text-ink">{review.quote}</p>
              <footer className="mt-6 text-[11px] tracking-[0.18em] text-stone uppercase">
                — {review.author}
              </footer>
            </blockquote>
          ))}
        </SectionSlider>
      </div>
    </section>
  );
}
