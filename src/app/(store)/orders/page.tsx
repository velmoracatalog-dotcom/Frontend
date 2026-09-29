"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Order } from "@/lib/types";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, router, user]);

  useEffect(() => {
    if (!user) return;
    void apiFetch<Order[]>("/api/orders").then(setOrders).catch(() => setOrders([]));
  }, [user]);

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl">Your Orders</h1>
      <div className="mt-10 space-y-6">
        {orders.length === 0 && (
          <p className="text-sm text-stone">
            No orders yet.{" "}
            <Link href="/shop" className="text-bronze">
              Browse the shop
            </Link>
          </p>
        )}
        {orders.map((order) => (
          <article key={order.id} className="border border-line bg-ivory px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] tracking-[0.18em] uppercase text-stone">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "New"}
              </p>
              <p className="text-[11px] tracking-[0.18em] uppercase text-bronze">{order.status}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.productId}`}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-medium">{formatPKR(order.total)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
