"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { readCart, writeCart } from "@/lib/cartStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setItems } from "@/store/slices/cartSlice";

export function CartSync() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [ready, setReady] = useState(false);
  const serverReady = useRef(false);

  useEffect(() => {
    dispatch(setItems(readCart()));
    setReady(true);
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    writeCart(items);
  }, [items, ready]);

  useEffect(() => {
    if (!user) {
      serverReady.current = false;
      return;
    }
    if (!ready) return;
    const timer = window.setTimeout(() => {
      if (!serverReady.current) {
        serverReady.current = true;
        return;
      }
      void apiFetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({ items }),
      }).catch(() => undefined);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [items, ready, user]);

  return null;
}
