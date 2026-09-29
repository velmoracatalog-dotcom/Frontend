"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AccountShell } from "@/components/layout/AccountShell";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Order } from "@/lib/types";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    void apiFetch<Order[]>("/api/orders").then(setOrders).catch(() => setOrders([]));
  }, [user]);

  return (
    <AccountShell>
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Orders</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">My Orders</h1>
      <div className="mt-10 space-y-6">
        {orders.length === 0 && (
          <p className="text-sm leading-7 text-stone">
            No orders yet.{" "}
            <Link href="/shop" className="cursor-pointer text-bronze hover:text-ink">
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
    </AccountShell>
  );
}
