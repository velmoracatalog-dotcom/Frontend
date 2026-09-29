"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import type { Order } from "@/lib/types";

type Stats = {
  users: number;
  products: number;
  orders: number;
  reviews: number;
  messages: number;
  unreadMessages: number;
  revenue: number;
  recentOrders: Order[];
};

export default function AdminHomePage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    void apiFetch<Stats>("/api/dashboard/stats").then(setStats);
  }, []);

  const cards = [
    { label: "Revenue", value: formatPKR(stats?.revenue ?? 0) },
    { label: "Orders", value: stats?.orders ?? 0 },
    { label: "Products", value: stats?.products ?? 0 },
    { label: "Users", value: stats?.users ?? 0 },
    { label: "Reviews", value: stats?.reviews ?? 0 },
    { label: "Messages", value: stats?.unreadMessages ?? stats?.messages ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl">Overview</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <div key={card.label} className="border border-line px-5 py-6">
            <p className="text-[11px] tracking-[0.18em] uppercase text-stone">{card.label}</p>
            <p className="mt-3 font-serif text-3xl">{card.value}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-12 font-serif text-2xl">Recent orders</h2>
      <div className="mt-4 space-y-3">
        {(stats?.recentOrders ?? []).map((order) => (
          <div key={order.id} className="flex items-center justify-between border border-line px-4 py-3 text-sm">
            <span>{order.customer?.name || order.customer?.email}</span>
            <span className="uppercase text-bronze">{order.status}</span>
            <span>{formatPKR(order.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
