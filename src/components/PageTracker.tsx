"use client";

import { usePageTracking } from "@/hooks/usePageTracking";

/** 
 * Thin wrapper that mounts the page-tracking hook.
 * Rendered inside RootLayout so every public navigation is tracked.
 */
export function PageTracker() {
  usePageTracking();
  return null;
}
