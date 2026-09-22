"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { useCatalog } from "@/context/CatalogContext";
import { easeOutLuxury, fadeUp, stagger } from "@/lib/motion";

export function FeaturedCategories() {
  const { categories } = useCatalog();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mb-12 text-center">
        <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The Atelier</p>
        <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Featured Categories</h2>
        <Ornament className="mt-5" />
      </Reveal>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.slug}
            variants={fadeUp}
            transition={{ duration: 0.8, ease: easeOutLuxury }}
          >
            <Link
              href="#shop"
              className="group relative block aspect-[4/5] overflow-hidden bg-cream"
            >
              <CatalogImage
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent transition duration-500 group-hover:from-ink/70" />
              <span className="absolute inset-x-0 bottom-0 p-5 font-serif text-2xl text-ivory transition duration-500 group-hover:-translate-y-1">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
