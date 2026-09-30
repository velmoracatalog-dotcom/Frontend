"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { AuthUser } from "@/lib/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);

  async function load() {
    setUsers(await apiFetch<AuthUser[]>("/api/users"));
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-bronze">{users.length} in the house</p>
      <h1 className="mt-2 font-serif text-4xl">Users</h1>
      <div className="mt-8 space-y-4">
        {users.map((user) => (
          <article key={user.id} className="border border-line px-5 py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                {user.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.picture}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 rounded-full border border-line object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-cream font-serif text-xl">
                    {user.name?.[0] ?? "V"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-serif text-2xl">{user.name}</p>
                  <p className="mt-1 text-sm text-stone">{user.email}</p>
                </div>
              </div>
              <select
                className="cursor-pointer border border-line px-3 py-2 text-sm"
                value={user.role}
                onChange={(event) =>
                  void apiFetch(`/api/users/${user.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ role: event.target.value }),
                  }).then(load)
                }
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">Phone</dt>
                <dd className="mt-1">{user.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">City</dt>
                <dd className="mt-1">{user.city || "—"}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">Address</dt>
                <dd className="mt-1">{user.address || "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">Postal code</dt>
                <dd className="mt-1">{user.postalCode || "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">Country</dt>
                <dd className="mt-1">{user.country || "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">Joined</dt>
                <dd className="mt-1">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
