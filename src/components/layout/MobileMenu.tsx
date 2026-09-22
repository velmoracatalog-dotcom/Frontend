"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCatalog } from "@/context/CatalogContext";
import { navLinks } from "@/lib/fallback";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeMobileMenu } from "@/store/slices/uiSlice";
import { CloseIcon } from "@/components/icons";
import { easeOutLuxury } from "@/lib/motion";

export function MobileMenu() {
  const dispatch = useAppDispatch();
  const { settings } = useCatalog();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-ivory px-6 py-6 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between">
            <p className="font-serif text-2xl tracking-[0.24em]">VELMORA</p>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => dispatch(closeMobileMenu())}
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.5, ease: easeOutLuxury }}
              >
                <Link
                  href={link.href}
                  onClick={() => dispatch(closeMobileMenu())}
                  className="font-serif text-4xl tracking-wide"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="absolute inset-x-6 bottom-8 text-sm text-stone">
            <a href={`mailto:${settings.email}`} className="block hover:text-ink">
              {settings.email}
            </a>
            <a href={`tel:${settings.tel}`} className="mt-2 block hover:text-ink">
              {settings.phoneDisplay}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
