"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AccountShell } from "@/components/layout/AccountShell";
import { OrderTracker } from "@/components/orders/OrderTracker";
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
      <p className="mt-3 max-w-xl text-sm leading-7 text-stone">
        Follow each piece from the house to your door. The atelier updates these
        five steps by hand.
      </p>
      <div className="mt-10 space-y-8">
        {orders.length === 0 && (
          <p className="text-sm leading-7 text-stone">
            No orders yet.{" "}
            <Link href="/shop" className="cursor-pointer text-bronze hover:text-ink">
              Browse the shop
            </Link>
          </p>
        )}
        {orders.map((order) => (
          <article key={order.id} className="border border-line bg-ivory px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] tracking-[0.18em] uppercase text-stone">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "New"}
              </p>
              <p className="font-medium">{formatPKR(order.total)}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.productId}`}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-6">
              <OrderTracker status={order.status} />
            </div>
          </article>
        ))}
      </div>
    </AccountShell>
  );
}
