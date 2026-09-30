"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { OtpModal } from "@/components/auth/OtpModal";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function AuthPanel() {
  const { loginWithGoogle, requestEmailOtp, verifyEmailOtp, resendEmailOtp, user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [verifying, setVerifying] = useState(false);

  if (user) return null;

  function go(next: { role: "user" | "admin" }) {
    router.push(next.role === "admin" ? "/admin" : "/");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === "signup" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const sentTo = await requestEmailOtp(mode, { email, password });
      setOtpEmail(sentTo);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send OTP");
    } finally {
      setSaving(false);
    }
  }

  async function finishOtp(code: string) {
    if (verifying) return;
    setVerifying(true);
    try {
      const signedIn = await verifyEmailOtp(otpEmail, code);
      toast.success("Signed in");
      setOtpEmail("");
      go(signedIn);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "That code is wrong");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="w-full max-w-md border border-line bg-ivory p-6 shadow-[0_18px_50px_rgba(20,20,20,0.06)] md:p-8">
      <div className="mb-6 flex gap-6">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`cursor-pointer text-[11px] tracking-[0.2em] uppercase ${mode === "signin" ? "text-ink" : "text-stone"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`cursor-pointer text-[11px] tracking-[0.2em] uppercase ${mode === "signup" ? "text-ink" : "text-stone"}`}
        >
          Create account
        </button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
        </label>
        <PasswordField
          label="Password"
          value={password}
          shown={showPassword}
          onShown={setShowPassword}
          onChange={setPassword}
        />
        {mode === "signup" && (
          <PasswordField
            label="Confirm password"
            value={confirmPassword}
            shown={showConfirm}
            onShown={setShowConfirm}
            onChange={setConfirmPassword}
          />
        )}
        <button
          type="submit"
          disabled={saving}
          className="btn-fill w-full cursor-pointer bg-bronze py-3.5 text-[11px] tracking-[0.22em] text-ivory uppercase disabled:opacity-40"
        >
          <span>{saving ? "Sending code..." : mode === "signup" ? "Create account" : "Sign in"}</span>
        </button>
        <div className="flex items-center gap-4 py-1">
          <span className="h-px flex-1 bg-line" />
          <span className="text-[11px] tracking-[0.2em] text-stone uppercase">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        {googleClientId ? (
          <GoogleContinueButton
            onError={(message) => toast.error(message)}
            onSuccess={(signedIn) => {
              toast.success("Signed in");
              go(signedIn);
            }}
          />
        ) : (
          <p className="border border-line px-5 py-3 text-sm leading-7 text-stone">
            Google is not configured yet.
          </p>
        )}
      </form>

      {otpEmail && (
        <OtpModal
          email={otpEmail}
          verifying={verifying}
          onClose={() => setOtpEmail("")}
          onVerify={(code) => void finishOtp(code)}
          onResend={() => {
            void (async () => {
              try {
                try {
                  await resendEmailOtp(otpEmail);
                } catch {
                  await requestEmailOtp(mode, { email, password });
                }
                toast.success("A new OTP was sent");
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not resend OTP");
              }
            })();
          }}
        />
      )}
    </div>
  );
}

function PasswordField({
  label,
  value,
  shown,
  onShown,
  onChange,
}: {
  label: string;
  value: string;
  shown: boolean;
  onShown: (shown: boolean) => void;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.18em] text-stone uppercase">{label}</span>
      <span className="relative mt-2 block">
        <input
          required
          type={shown ? "text" : "password"}
          minLength={6}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full border border-line bg-ivory px-4 py-3 pr-12 text-sm outline-none focus:border-bronze"
        />
        <button
          type="button"
          aria-label={shown ? "Hide password" : "Show password"}
          onClick={() => onShown(!shown)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-stone transition hover:text-ink"
        >
          {shown ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </span>
    </label>
  );
}

function GoogleContinueButton({
  onError,
  onSuccess,
}: {
  onError: (message: string) => void;
  onSuccess: (user: { role: "user" | "admin" }) => void;
}) {
  const { loginWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);

  const startGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setBusy(true);
      try {
        const signedIn = await loginWithGoogle(tokenResponse.access_token);
        onSuccess(signedIn);
      } catch (err) {
        onError(err instanceof Error ? err.message : "Google sign-in failed");
      } finally {
        setBusy(false);
      }
    },
    onError: () => onError("Google sign-in failed"),
  });

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => startGoogle()}
      className="flex w-full cursor-pointer items-center gap-3 border border-line bg-white px-3 py-2.5 transition hover:border-ink disabled:cursor-wait disabled:opacity-60"
    >
      <GoogleMark />
      <span className="flex-1 pr-7 text-center text-[15px] font-medium text-[#3c4043]">
        {busy ? "Opening Google..." : "Continue with Google"}
      </span>
    </button>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12c0-.72.12-1.43.36-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}
