"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function OtpModal({
  email,
  verifying,
  onClose,
  onVerify,
  onResend,
}: {
  email: string;
  verifying: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
}) {
  const reduced = useReducedMotion();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [wait, setWait] = useState(45);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const code = digits.join("");

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (wait <= 0) return;
    const timer = window.setTimeout(() => setWait((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [wait]);

  function update(index: number, value: string) {
    const nextDigit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = nextDigit;
    setDigits(next);
    if (nextDigit && index < 5) inputs.current[index + 1]?.focus();
    const nextCode = next.join("");
    if (nextCode.length === 6) onVerify(nextCode);
  }

  function onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });
    setDigits(next);
    const last = Math.min(pasted.length, 6) - 1;
    inputs.current[last]?.focus();
    if (pasted.length === 6) onVerify(pasted);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-title"
        initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/70 bg-ivory shadow-[0_30px_80px_rgba(20,20,20,0.22)]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-bronze to-transparent" />
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-stone transition hover:bg-cream hover:text-ink"
        >
          <CloseIcon />
        </button>

        <div className="px-6 pt-10 pb-8 md:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-ivory shadow-[0_12px_30px_rgba(20,20,20,0.18)]">
            <MailIcon />
          </div>
          <p className="mt-5 text-center text-[11px] tracking-[0.28em] text-bronze uppercase">
            Almost there
          </p>
          <h2 id="otp-title" className="mt-2 text-center font-serif text-[2rem] leading-none">
            Check your inbox
          </h2>
          <p className="mt-3 text-center text-sm leading-7 text-stone">
            Enter the 6-digit code we sent to
          </p>
          <p className="mx-auto mt-1 w-fit rounded-full bg-cream px-3 py-1 text-sm text-ink">
            {email}
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            {digits.map((digit, index) => (
              <div key={index} className="contents">
                {index === 3 && <span className="mx-0.5 h-px w-3 bg-line" />}
                <input
                  ref={(node) => {
                    inputs.current[index] = node;
                  }}
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  disabled={verifying}
                  onChange={(event) => update(index, event.target.value)}
                  onKeyDown={(event) => onKeyDown(index, event)}
                  onPaste={onPaste}
                  className={`h-14 w-11 rounded-2xl border text-center text-xl transition outline-none md:w-12 ${
                    digit
                      ? "border-ink bg-white text-ink shadow-[0_8px_20px_rgba(20,20,20,0.06)]"
                      : "border-line bg-white/80 text-ink"
                  } focus:border-bronze focus:shadow-[0_0_0_4px_rgba(139,115,85,0.12)] disabled:opacity-60`}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={verifying || code.length !== 6}
            onClick={() => onVerify(code)}
            className="btn-fill mt-7 w-full cursor-pointer rounded-full bg-ink py-3.5 text-[11px] tracking-[0.22em] text-ivory uppercase disabled:opacity-40"
          >
            <span>{verifying ? "Verifying..." : "Verify code"}</span>
          </button>

          <p className="mt-5 text-center text-sm text-stone">
            Didn’t get it?{" "}
            <button
              type="button"
              disabled={wait > 0 || verifying}
              onClick={() => {
                onResend();
                setWait(45);
                setDigits(["", "", "", "", "", ""]);
                inputs.current[0]?.focus();
              }}
              className="cursor-pointer font-medium text-ink underline-offset-4 transition hover:text-bronze hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-40"
            >
              {wait > 0 ? `Resend in ${wait}s` : "Resend code"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.4" y="6" width="17.2" height="12" rx="2" />
      <path d="m4.2 7.4 7.8 5.4 7.8-5.4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
