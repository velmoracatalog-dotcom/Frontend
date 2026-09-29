"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function LoginPage() {
  const { loginWithGoogle, user } = useAuth();
  const router = useRouter();

  if (user) {
    router.replace(user.role === "admin" ? "/admin" : "/");
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">The House</p>
      <h1 className="mt-4 font-serif text-5xl">Sign in to Velmora</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-stone">
        Use Google to sign in or create your account. Your orders, reviews, and
        bag stay with you.
      </p>
      <div className="mt-10">
        {googleClientId ? (
          <GoogleLogin
            onSuccess={async (response) => {
              if (!response.credential) return;
              const signedIn = await loginWithGoogle(response.credential);
              router.push(signedIn.role === "admin" ? "/admin" : "/");
            }}
            onError={() => undefined}
            theme="outline"
            shape="rectangular"
            text="continue_with"
          />
        ) : (
          <p className="max-w-sm border border-line px-6 py-5 text-sm leading-7 text-stone">
            Google login is not configured yet. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID
            and GOOGLE_CLIENT_ID, then redeploy.
          </p>
        )}
      </div>
    </section>
  );
}
