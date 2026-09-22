"use client";

import { StarRating } from "@/components/ui/StarRating";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { useCatalog } from "@/context/CatalogContext";
import { motion } from "framer-motion";
import { easeOutLuxury, fadeUp, stagger } from "@/lib/motion";

export function Reviews() {
  const { reviews } = useCatalog();

  return (
    <section className="border-y border-line bg-cream/50">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-14 text-center">
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Kind Words</p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Customer Reviews</h2>
          <Ornament className="mt-5" />
        </Reveal>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reviews.map((review) => (
            <motion.blockquote
              key={review.id}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: easeOutLuxury }}
              className="flex flex-col border border-line bg-ivory px-7 py-9"
            >
              <span className="font-serif text-5xl leading-none text-bronze/50">“</span>
              <StarRating rating={review.rating} />
              <p className="mt-4 font-serif text-2xl leading-snug text-ink">{review.quote}</p>
              <footer className="mt-6 text-[11px] tracking-[0.18em] text-stone uppercase">
                — {review.author}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
