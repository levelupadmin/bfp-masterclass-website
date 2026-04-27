// Tiny tracking helper — fires events to Meta Pixel and Microsoft Clarity
// when they're loaded. Safe to call from client components.

declare global {
  interface Window {
    fbq?: (
      ...args: unknown[]
    ) => void;
    clarity?: (
      ...args: unknown[]
    ) => void;
  }
}

export function trackInitiateCheckout(params?: { value?: number; currency?: string }) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", params || {});
    }
    if (typeof window.clarity === "function") {
      window.clarity("event", "InitiateCheckout");
    }
  } catch {
    // never let tracking errors block the actual click
  }
}
