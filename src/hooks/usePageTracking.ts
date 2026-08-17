"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
const STORAGE_KEY = "cam_session_token";

function getSessionToken(): string {
  if (typeof window === "undefined") return "";
  let token = sessionStorage.getItem(STORAGE_KEY);
  if (!token) {
    // Generate a random session token (valid for this browser tab session)
    token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    sessionStorage.setItem(STORAGE_KEY, token);
  }
  return token;
}

export function usePageTracking() {
  const pathname = usePathname();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin") || pathname.startsWith("/kurir")) return;
    // Don't double-track the same page in the same render cycle
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const sessionToken = getSessionToken();
    const referrer =
      typeof document !== "undefined" ? document.referrer : "";

    // Fire and forget — don't await, don't block UI
    fetch(`${API_BASE}/analytics/pageview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Token": sessionToken,
      },
      body: JSON.stringify({ page: pathname, referrer }),
      keepalive: true,
    }).catch(() => {
      // Silently fail — analytics should never break the UI
    });
  }, [pathname]);
}
