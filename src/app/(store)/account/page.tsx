"use client";

import { useEffect, useRef, useState } from "react";
import { AccountShell } from "@/components/layout/AccountShell";
import { UserIcon } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import type { AuthUser } from "@/lib/types";

type ProfileForm = {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

function fromUser(user: AuthUser): ProfileForm {
  return {
    name: user.name ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    city: user.city ?? "",
    postalCode: user.postalCode ?? "",
    country: user.country || "Pakistan",
  };
}

export default function AccountPage() {
  const { user, updateUser } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) setForm(fromUser(user));
  }, [user]);

  function field(key: keyof ProfileForm) {
    return {
      value: form[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((current) => ({ ...current, [key]: event.target.value })),
    };
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = await apiFetch<{ user: AuthUser }>("/api/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(form),
      });
      updateUser(data.user);
      setMessage("Profile saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile");
    } finally {
      setSaving(false);
    }
  }

  async function changePhoto(file: File) {
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const body = new FormData();
      body.append("file", file);
      const data = await apiFetch<{ user: AuthUser }>("/api/auth/picture", {
        method: "POST",
        body,
      });
      updateUser(data.user);
      setMessage("Photo updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update photo");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AccountShell>
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Profile</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your details</h1>
      <p className="mt-3 max-w-lg text-sm leading-7 text-stone">
        Update your photo, name, phone, and delivery address. Email stays with
        your Google account.
      </p>

      <form onSubmit={save} className="mt-10 max-w-2xl space-y-6">
        <div className="flex items-center gap-5">
          <div className="h-24 w-24 overflow-hidden rounded-full border border-line bg-cream">
            {user?.picture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.picture}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink">
                <UserIcon className="h-8 w-8" />
              </div>
            )}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void changePhoto(file);
                event.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer border border-ink px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase transition hover:bg-ink hover:text-ivory disabled:opacity-40"
            >
              {uploading ? "Uploading..." : "Change photo"}
            </button>
            <p className="mt-2 text-xs text-stone">JPG or PNG, up to 5MB.</p>
          </div>
        </div>

        <label className="block">
          <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Name</span>
          <input
            required
            {...field("name")}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Email</span>
          <input
            value={user?.email ?? ""}
            readOnly
            disabled
            className="mt-2 w-full cursor-not-allowed border border-line bg-cream px-4 py-3 text-sm text-stone"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Phone number</span>
          <input
            type="tel"
            {...field("phone")}
            placeholder="03xx xxx xxxx"
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
        </label>

        <label className="block">
          <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Address</span>
          <textarea
            rows={3}
            {...field("address")}
            placeholder="House, street, area"
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] text-stone uppercase">City</span>
            <input
              {...field("city")}
              className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Postal code</span>
            <input
              {...field("postalCode")}
              className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[11px] tracking-[0.18em] text-stone uppercase">Country</span>
          <input
            {...field("country")}
            className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-sm outline-none focus:border-bronze"
          />
        </label>

        {error && <p className="text-sm text-bronze">{error}</p>}
        {message && <p className="text-sm text-stone">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="btn-fill cursor-pointer bg-ink px-8 py-3 text-[11px] tracking-[0.22em] text-ivory uppercase disabled:opacity-40"
        >
          <span>{saving ? "Saving..." : "Save profile"}</span>
        </button>
      </form>
    </AccountShell>
  );
}
