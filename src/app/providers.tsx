"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CartSync } from "@/components/cart/CartSync";
import { AuthProvider } from "@/context/AuthContext";
import { store } from "@/store";
import "react-toastify/dist/ReactToastify.css";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function Providers({ children }: { children: React.ReactNode }) {
  const tree = (
    <Provider store={store}>
      <AuthProvider>
        <CartSync />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Provider>
  );

  if (!googleClientId) return tree;
  return <GoogleOAuthProvider clientId={googleClientId}>{tree}</GoogleOAuthProvider>;
}
