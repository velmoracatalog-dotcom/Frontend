"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { readCart, writeCart } from "@/lib/cartStorage";
import type { AuthUser } from "@/lib/types";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { setItems, type CartItem } from "@/store/slices/cartSlice";

export type RegisterPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  loginWithGoogle: (accessToken: string) => Promise<AuthUser>;
  requestEmailOtp: (mode: "signin" | "signup", payload: RegisterPayload) => Promise<string>;
  verifyEmailOtp: (email: string, code: string) => Promise<AuthUser>;
  resendEmailOtp: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateUser: (user: AuthUser) => void;
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
    const localItems = readCart();
    dispatch(setItems(localItems));

    try {
      const data = await apiFetch<{ user: AuthUser }>("/api/auth/me");
      setUser(data.user);
      try {
        const cart = await apiFetch<{ items: CartItem[] }>("/api/cart");
        const next = localItems.length ? localItems : (cart.items ?? []);
        dispatch(setItems(next));
        writeCart(next);
        await apiFetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({ items: next }),
        });
      } catch {
        dispatch(setItems(localItems));
      }
    } catch {
      setUser(null);
      dispatch(setItems(localItems));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function afterAuth(nextUser: AuthUser) {
    const localItems = store.getState().cart.items.length
      ? store.getState().cart.items
      : readCart();
    setUser(nextUser);
    try {
      const cart = await apiFetch<{ items: CartItem[] }>("/api/cart");
      const merged = mergeCarts(cart.items ?? [], localItems);
      dispatch(setItems(merged));
      writeCart(merged);
      await apiFetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({ items: merged }),
      });
    } catch {
      dispatch(setItems(localItems));
      writeCart(localItems);
    }
    return nextUser;
  }

  async function loginWithGoogle(accessToken: string) {
    const data = await apiFetch<{ user: AuthUser }>("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ accessToken }),
    });
    return afterAuth(data.user);
  }

  async function requestEmailOtp(mode: "signin" | "signup", payload: RegisterPayload) {
    const path = mode === "signup" ? "/api/auth/register" : "/api/auth/login";
    const data = await apiFetch<{ needsOtp: boolean; email: string }>(path, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.email;
  }

  async function verifyEmailOtp(email: string, code: string) {
    const data = await apiFetch<{ user: AuthUser }>("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    return afterAuth(data.user);
  }

  async function resendEmailOtp(email: string) {
    await apiFetch("/api/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async function logout() {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    writeCart(store.getState().cart.items);
  }

  function updateUser(next: AuthUser) {
    setUser(next);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        requestEmailOtp,
        verifyEmailOtp,
        resendEmailOtp,
        logout,
        refresh,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
