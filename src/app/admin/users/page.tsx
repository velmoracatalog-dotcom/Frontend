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
      <h1 className="font-serif text-4xl">Users</h1>
      <div className="mt-8 space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 border border-line px-4 py-3">
            <div>
              <p className="font-serif text-lg">{user.name}</p>
              <p className="text-sm text-stone">{user.email}</p>
            </div>
            <select
              className="border border-line px-3 py-2 text-sm"
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
        ))}
      </div>
    </div>
  );
}
