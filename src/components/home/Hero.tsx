"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { useCatalog } from "@/context/CatalogContext";
import { easeOutLuxury } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();
  const { settings } = useCatalog();
  const hero = settings.hero;

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-cream">
      <div className={`absolute inset-0 ${reduced ? "" : "ken-burns"}`}>
        <CatalogImage
          src={hero.image}
          alt="Velmora editorial look"
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/50 to-transparent" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-5 py-20 md:px-8">
        <div className="max-w-xl">
          <motion.p
            className="text-[11px] tracking-[0.32em] text-bronze uppercase"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOutLuxury }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-4 font-serif text-5xl leading-[1.05] text-ink md:text-7xl"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.28, ease: easeOutLuxury }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-base leading-8 text-stone md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: easeOutLuxury }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeOutLuxury }}
          >
            <Link
              href="/shop"
              className="btn-fill mt-8 inline-flex items-center bg-ink px-8 py-3.5 text-[11px] tracking-[0.28em] text-ivory uppercase"
            >
              <span>{hero.cta}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
