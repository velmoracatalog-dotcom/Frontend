"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { AuthUser } from "@/lib/types";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { setItems, type CartItem } from "@/store/slices/cartSlice";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  loginWithGoogle: (credential: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mergeCarts(first: CartItem[], second: CartItem[]) {
  const map = new Map<string, CartItem>();
  for (const item of [...first, ...second]) {
    const existing = map.get(item.id);
    if (existing) existing.quantity += item.quantity;
    else map.set(item.id, { ...item });
  }
  return Array.from(map.values());
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const data = await apiFetch<{ user: AuthUser }>("/api/auth/me");
      setUser(data.user);
      const cart = await apiFetch<{ items: CartItem[] }>("/api/cart");
      dispatch(setItems(cart.items ?? []));
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function loginWithGoogle(credential: string) {
    const localItems = store.getState().cart.items;
    const data = await apiFetch<{ user: AuthUser }>("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
    setUser(data.user);
    const cart = await apiFetch<{ items: CartItem[] }>("/api/cart");
    const merged = mergeCarts(cart.items ?? [], localItems);
    dispatch(setItems(merged));
    await apiFetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({ items: merged }),
    });
    return data.user;
  }

  async function logout() {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    dispatch(setItems([]));
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
