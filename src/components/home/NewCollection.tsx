"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { Reveal } from "@/components/ui/Reveal";
import { useCatalog } from "@/context/CatalogContext";
import { easeOutLuxury } from "@/lib/motion";

export function NewCollection() {
  const reduced = useReducedMotion();
  const { settings } = useCatalog();
  const collection = settings.newCollection;

  return (
    <section id="collections" className="relative min-h-[68vh] overflow-hidden bg-cream">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: easeOutLuxury }}
      >
        <CatalogImage
          src={collection.image}
          alt={collection.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ivory/58" />
      <div className="relative mx-auto flex min-h-[68vh] max-w-7xl items-center px-5 py-20 md:px-8">
        <Reveal className="max-w-lg">
          <p className="text-[11px] tracking-[0.32em] text-bronze uppercase">
            {collection.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
            {collection.title}
          </h2>
          <p className="mt-4 text-lg text-stone">{collection.subtitle}</p>
          <Link
            href="#shop"
            className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.22em] text-ink uppercase transition hover:gap-3 hover:text-bronze"
          >
            Explore Collection
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
