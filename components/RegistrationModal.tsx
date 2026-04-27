"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
];

type FormErrors = Partial<Record<"name" | "email" | "phone" | "form", string>>;

export function RegistrationModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (name.trim().length < 2) e.name = "Tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "A valid email please";
    if (!/^\d{6,15}$/.test(phone.replace(/\D/g, ""))) e.phone = "A valid phone number please";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: `${code}${phone.replace(/\D/g, "")}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ form: data?.error || "Something went wrong. Try again." });
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ form: "Network error. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function downloadIcs() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//LevelUp Learning//BFP Masterclass//EN",
      "BEGIN:VEVENT",
      "UID:bfp-masterclass-2026-05-03@levelup",
      "DTSTAMP:20260420T000000Z",
      "DTSTART:20260503T053000Z",
      "DTEND:20260503T074500Z",
      "SUMMARY:BFP Masterclass — How to start your filmmaking career in 2026",
      "DESCRIPTION:Live 2-hour masterclass with Rahul Srinivas. Zoom link sent the day before.",
      "LOCATION:Live on Zoom",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bfp-masterclass.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="cs-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cs-modal" ref={dialogRef}>
        <div className="cs-modal-head">
          <span>{submitted ? "CONFIRMATION" : "REGISTRATION"}</span>
          <button
            type="button"
            className="cs-modal-close"
            onClick={onClose}
            aria-label="Close registration"
          >
            ×
          </button>
        </div>
        <div className="cs-modal-body">
          {!submitted ? (
            <>
              <h3 id="reg-title">Reserve your free seat.</h3>
              <p className="cs-modal-sub">Sat · 08 Feb 2026 · 7:00 PM IST · Zoom</p>
              <form className="cs-form" onSubmit={onSubmit} noValidate>
                <div className="cs-field">
                  <label htmlFor="reg-name">Full name</label>
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="cs-field-error">{errors.name}</span>}
                </div>
                <div className="cs-field">
                  <label htmlFor="reg-email">Email</label>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="cs-field-error">{errors.email}</span>}
                </div>
                <div className="cs-field">
                  <label htmlFor="reg-phone">Phone (WhatsApp)</label>
                  <div className="cs-field-row">
                    <select
                      aria-label="Country code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      id="reg-phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={!!errors.phone}
                    />
                  </div>
                  {errors.phone && <span className="cs-field-error">{errors.phone}</span>}
                </div>
                {errors.form && <div className="cs-form-error">{errors.form}</div>}
                <button className="cs-btn cs-btn-block" type="submit" disabled={submitting}>
                  {submitting ? "RESERVING…" : "RESERVE MY FREE SEAT →"}
                </button>
              </form>
            </>
          ) : (
            <div className="cs-confirm">
              <div className="cs-confirm-icon" aria-hidden>
                ✓
              </div>
              <h3>You&apos;re in.</h3>
              <p className="cs-confirm-text">
                Your seat for the BFP Masterclass is reserved. We&apos;ve sent the Zoom link
                instructions to <strong>{email}</strong>. The link will arrive again the day before.
              </p>
              <div className="cs-confirm-details">
                <div>
                  <span>WHEN</span>
                  <span>Sun · 03 May 2026 · 11:00 AM IST</span>
                </div>
                <div>
                  <span>DURATION</span>
                  <span>2 hrs + 15 min Q&amp;A</span>
                </div>
                <div>
                  <span>WHERE</span>
                  <span>Live on Zoom</span>
                </div>
              </div>
              <div className="cs-confirm-actions">
                <button className="cs-btn" type="button" onClick={downloadIcs}>
                  ADD TO CALENDAR (.ICS) →
                </button>
                <button className="cs-btn cs-btn-ghost" type="button" onClick={onClose}>
                  CLOSE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
