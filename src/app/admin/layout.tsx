"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen bg-ivory">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-ivory px-6 py-8 md:block">
        <Link href="/" className="font-serif text-2xl tracking-[0.24em]">
          VELMORA
        </Link>
        <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-bronze">Admin</p>
        <nav className="mt-10 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[12px] tracking-[0.18em] uppercase ${
                pathname === link.href ? "text-bronze" : "text-ink hover:text-bronze"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            void logout().then(() => router.push("/"));
          }}
          className="mt-12 text-[11px] tracking-[0.18em] uppercase text-stone hover:text-ink"
        >
          Sign out
        </button>
      </aside>
      <div className="md:pl-64">
        <header className="flex items-center justify-between border-b border-line px-5 py-4 md:px-8">
          <p className="text-sm text-stone">{user.email}</p>
          <Link href="/" className="text-[11px] tracking-[0.18em] uppercase hover:text-bronze">
            View site
          </Link>
        </header>
        <div className="px-5 py-8 md:px-8">{children}</div>
      </div>
    </div>
  );
}
