"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { CartSync } from "@/components/cart/CartSync";
import { AuthProvider } from "@/context/AuthContext";
import { store } from "@/store";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function Providers({ children }: { children: React.ReactNode }) {
  const tree = (
    <Provider store={store}>
      <AuthProvider>
        <CartSync />
        {children}
      </AuthProvider>
    </Provider>
  );

  if (!googleClientId) return tree;
  return <GoogleOAuthProvider clientId={googleClientId}>{tree}</GoogleOAuthProvider>;
}
