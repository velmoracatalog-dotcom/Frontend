"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/notifications", label: "Notifications" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    function load() {
      void apiFetch<{ unread: number }>("/api/notifications")
        .then((data) => setUnread(data.unread))
        .catch(() => undefined);
    }
    load();
    const timer = window.setInterval(load, 20000);
    return () => window.clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-stone">Opening the house...</div>;
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  if (user.role !== "admin") {
    router.replace("/");
    return null;
  }

  async function signOut() {
    await logout();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-cream/40">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-line bg-ivory md:flex">
        <div className="border-b border-line px-6 py-7">
          <Link href="/" className="font-serif text-2xl tracking-[0.24em]">
            VELMORA
          </Link>
          <p className="mt-2 text-[11px] tracking-[0.22em] text-bronze uppercase">Admin</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between border-l-2 px-4 py-3 text-[12px] tracking-[0.16em] uppercase transition ${
                  active
                    ? "border-bronze bg-cream text-ink"
                    : "border-transparent text-stone hover:border-line hover:bg-cream/70 hover:text-ink"
                }`}
              >
                <span>{link.label}</span>
                {link.href === "/admin/notifications" && unread > 0 && (
                  <span className="bg-bronze px-1.5 py-0.5 text-[10px] tracking-normal text-ivory">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line p-4">
          <div className="mb-4 px-2">
            <p className="truncate text-sm text-ink">{user.name}</p>
            <p className="mt-0.5 truncate text-xs text-stone">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full cursor-pointer border border-[#9a2b2b] bg-[#9a2b2b] py-3 text-[11px] tracking-[0.2em] text-ivory uppercase transition hover:bg-[#7d2222]"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="md:pl-72">
        <header className="flex items-center justify-between border-b border-line bg-ivory px-5 py-4 md:px-8">
          <p className="text-sm text-stone md:hidden">Admin</p>
          <p className="hidden text-sm text-stone md:block">{user.email}</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[11px] tracking-[0.18em] uppercase hover:text-bronze">
              View site
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="cursor-pointer border border-[#9a2b2b] px-4 py-2 text-[11px] tracking-[0.18em] text-[#9a2b2b] uppercase transition hover:bg-[#9a2b2b] hover:text-ivory md:hidden"
            >
              Log out
            </button>
          </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-line bg-ivory px-3 py-2 md:hidden">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 px-3 py-2 text-[11px] tracking-[0.14em] uppercase ${
                  active ? "bg-cream text-ink" : "text-stone"
                }`}
              >
                {link.label}
                {link.href === "/admin/notifications" && unread > 0 ? ` (${unread})` : ""}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-8 md:px-8">{children}</div>
      </div>
    </div>
  );
}
