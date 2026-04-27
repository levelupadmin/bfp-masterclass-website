"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";

type Props = {
  bonus: Content["bonus"];
  targetDate: Date;
  onRegister: () => void;
};

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function diffParts(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { d: "00", h: "00", m: "00", s: "00", done: true };
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s), done: false };
}

export function BonusStack({ bonus, targetDate, onRegister }: Props) {
  const [parts, setParts] = useState({
    d: bonus.countdown.d,
    h: bonus.countdown.h,
    m: bonus.countdown.m,
    s: bonus.countdown.s,
    done: false,
  });

  useEffect(() => {
    setParts(diffParts(targetDate));
    const id = setInterval(() => setParts(diffParts(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const seatPct = (bonus.seats.taken / bonus.seats.total) * 100;

  return (
    <section className="cs-bonus cs-light" id="register">
      <div className="cs-section-head">
        <span className="cs-section-no">07</span>
        <span className="cs-section-name">{bonus.section}</span>
      </div>
      <h2 className="cs-h2">
        The bonus stack. <em>Yours the moment you register.</em>
      </h2>
      <p className="cs-section-sub">{bonus.sub}</p>

      <div className="cs-bonus-row">
        <div className="cs-countdown">
          <span className="cs-countdown-label">⏳ REGISTRATION CLOSES IN</span>
          <div className="cs-countdown-grid">
            {[
              ["DAYS", parts.d],
              ["HRS", parts.h],
              ["MIN", parts.m],
              ["SEC", parts.s],
            ].map(([label, val]) => (
              <div key={label}>
                <strong>{val}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="cs-seat-meter">
            <div className="cs-seat-bar" aria-hidden>
              <div style={{ width: `${seatPct}%` }} />
            </div>
            <div className="cs-seat-numbers">
              <span>
                SEATS TAKEN{" "}
                <strong>
                  {bonus.seats.taken} / {bonus.seats.total}
                </strong>
              </span>
              <span>
                <strong>{bonus.seats.remaining}</strong> REMAINING · FREE · NO SPAM
              </span>
            </div>
          </div>
          <button className="cs-btn cs-btn-block" type="button" onClick={onRegister}>
            RESERVE MY FREE SEAT NOW →
          </button>
        </div>
        <div className="cs-bonus-list">
          {bonus.items.map((b, i) => (
            <div className="cs-bonus-item" key={i}>
              <span className="cs-bonus-no">{b.id}</span>
              <div>
                <strong>{b.title}</strong>
                <p>{b.body}</p>
              </div>
              <span className="cs-bonus-value">{b.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
