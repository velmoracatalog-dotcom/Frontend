"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { useCatalog } from "@/context/CatalogContext";
import { formatPKR } from "@/lib/format";
import { easeOutLuxury } from "@/lib/motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { closeSearch } from "@/store/slices/uiSlice";
import { CloseIcon, SearchIcon } from "@/components/icons";

export function SearchOverlay() {
  const dispatch = useAppDispatch();
  const { products } = useCatalog();
  const isOpen = useAppSelector((state) => state.ui.isSearchOpen);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value),
    );
  }, [products, query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-ivory/96 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-auto max-w-3xl px-5 py-8 md:px-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.45, ease: easeOutLuxury }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.22em] text-bronze uppercase">Search Velmora</p>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => dispatch(closeSearch())}
                className="text-ink hover:text-bronze"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <label className="mt-8 flex items-center gap-3 border-b border-ink pb-3">
              <SearchIcon className="h-5 w-5 text-stone" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, collections..."
                className="w-full bg-transparent text-lg outline-none placeholder:text-stone/70"
              />
            </label>
            <ul className="mt-8 space-y-4">
              {results.map((product) => (
                <li key={product.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-14 overflow-hidden bg-cream">
                    <CatalogImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-lg">{product.name}</p>
                    <p className="text-sm text-stone">{formatPKR(product.price)}</p>
                  </div>
                  <button
                    type="button"
                    className="text-[11px] tracking-[0.18em] text-ink uppercase hover:text-bronze"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        }),
                      );
                      dispatch(closeSearch());
                    }}
                  >
                    Add
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="text-sm text-stone">No pieces found. Try another word.</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
