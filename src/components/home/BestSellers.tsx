"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { useCatalog } from "@/context/CatalogContext";
import { motion } from "framer-motion";
import { easeOutLuxury, fadeUp, stagger } from "@/lib/motion";

export function BestSellers() {
  const { products } = useCatalog();

  return (
    <section id="shop" className="border-y border-line bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-12 text-center">
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The Edit</p>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Best Sellers</h2>
          <Ornament className="mt-5" />
        </Reveal>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              transition={{ duration: 0.8, ease: easeOutLuxury }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
