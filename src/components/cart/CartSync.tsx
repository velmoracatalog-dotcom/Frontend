"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";

export function CartSync() {
  const { user } = useAuth();
  const items = useAppSelector((state) => state.cart.items);
  const ready = useRef(false);

  useEffect(() => {
    if (!user) {
      ready.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      if (!ready.current) {
        ready.current = true;
        return;
      }
      void apiFetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({ items }),
      }).catch(() => undefined);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [items, user]);

  return null;
}
