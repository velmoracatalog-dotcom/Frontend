"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (!loading && !user) router.replace("/login");

  return (
    <section className="mx-auto max-w-xl px-5 py-20 text-center">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Account</p>
      <h1 className="mt-4 font-serif text-5xl">{user?.name}</h1>
      <p className="mt-3 text-sm text-stone">{user?.email}</p>
      <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-bronze">{user?.role}</p>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link href="/orders" className="text-[12px] tracking-[0.2em] uppercase hover:text-bronze">
          Your orders
        </Link>
        {user?.role === "admin" && (
          <Link href="/admin" className="text-[12px] tracking-[0.2em] uppercase text-bronze">
            Admin dashboard
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            void logout().then(() => router.push("/"));
          }}
          className="text-[12px] tracking-[0.2em] uppercase text-stone hover:text-ink"
        >
          Sign out
        </button>
      </div>
    </section>
  );
}
