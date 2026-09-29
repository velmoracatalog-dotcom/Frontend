"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function AccountShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-stone">
        Opening your account...
      </div>
    );
  }

  const links = [
    { href: "/account", label: "Profile" },
    { href: "/orders", label: "My Orders" },
    ...(user.role === "admin" ? [{ href: "/admin", label: "Dashboard" }] : []),
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
      <div className="grid min-h-[620px] overflow-hidden border border-line bg-ivory md:grid-cols-[260px_1fr]">
        <aside className="flex flex-col border-b border-line bg-cream/40 md:border-r md:border-b-0">
          <div className="border-b border-line px-6 py-8">
            <div className="flex items-center gap-3">
              {user.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.picture}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-full border border-line object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ivory font-serif text-xl">
                  {user.name[0]}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-serif text-xl leading-tight">{user.name}</p>
                <p className="mt-1 truncate text-xs text-stone">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3 py-6">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`cursor-pointer px-3 py-3 text-[12px] tracking-[0.18em] uppercase transition ${
                    active ? "bg-ivory text-bronze" : "text-ink hover:bg-ivory/80 hover:text-bronze"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line px-5 py-5">
            <button
              type="button"
              onClick={() => {
                void logout().then(() => router.push("/"));
              }}
              className="btn-fill w-full cursor-pointer bg-ink py-3 text-[11px] tracking-[0.2em] text-ivory uppercase"
            >
              <span>Log out</span>
            </button>
          </div>
        </aside>

        <div className="px-6 py-8 md:px-10 md:py-10">{children}</div>
      </div>
    </section>
  );
}
