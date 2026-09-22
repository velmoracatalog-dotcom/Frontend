"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/fallback";
import { useCatalog } from "@/context/CatalogContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCart } from "@/store/slices/cartSlice";
import { toggleMobileMenu, toggleSearch } from "@/store/slices/uiSlice";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/icons";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { settings } = useCatalog();
  const ticker = settings.tickerItems;
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="overflow-hidden bg-ink py-2">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-[11px] tracking-[0.22em] text-ivory uppercase"
            >
              {item}
              <span className="ml-10 text-bronze-light">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div
        className={`border-b bg-ivory/95 backdrop-blur-md transition-shadow duration-500 ${
          scrolled ? "border-line shadow-[0_10px_40px_rgba(20,20,20,0.05)]" : "border-line/70"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <button
            type="button"
            className="text-ink md:hidden"
            aria-label="Open menu"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="font-serif text-[1.35rem] tracking-[0.28em] text-ink">
              VELMORA
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link text-[12px] tracking-[0.22em] text-ink uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="text-ink transition hover:text-bronze"
              onClick={() => dispatch(toggleSearch())}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Open cart"
              className="relative text-ink transition hover:text-bronze"
              onClick={() => dispatch(toggleCart())}
            >
              <BagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bronze px-1 text-[9px] text-ivory"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
