"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { easeOutLuxury } from "@/lib/motion";

export function Intro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("velmora-intro")) return;

    setVisible(true);
    const hide = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("velmora-intro", "1");
    }, 2100);

    return () => window.clearTimeout(hide);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.7, ease: easeOutLuxury }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: easeOutLuxury }}
            >
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-contain"
                priority
              />
            </motion.div>
            <motion.p
              className="mt-5 font-serif text-4xl tracking-[0.42em] text-ink"
              initial={{ opacity: 0, letterSpacing: "0.18em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ duration: 1, delay: 0.2, ease: easeOutLuxury }}
            >
              VELMORA
            </motion.p>
            <motion.span
              className="mt-5 block h-px bg-bronze"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 72, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45, ease: easeOutLuxury }}
            />
            <motion.p
              className="mt-4 text-[10px] tracking-[0.32em] text-bronze uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              The House of Style
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
