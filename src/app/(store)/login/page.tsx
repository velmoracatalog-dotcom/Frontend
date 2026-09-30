"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace(user.role === "admin" ? "/admin" : "/");
  }, [router, user]);

  return (
    <section className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-16 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The House</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">Enter Velmora</h1>
        <p className="mt-5 max-w-md text-sm leading-8 text-stone">
          Continue with Google, or create an account with your email. Your
          orders, reviews, and bag stay with you.
        </p>
      </div>
      <AuthPanel />
    </section>
  );
}
