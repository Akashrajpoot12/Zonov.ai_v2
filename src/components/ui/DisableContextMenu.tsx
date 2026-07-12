"use client";
import { useEffect } from "react";

/**
 * Disables the browser right-click context menu across the site.
 *
 * NOTE: this only blocks the casual right-click → "Inspect" path. It is NOT a
 * security measure — DevTools is still reachable via F12 / Ctrl+Shift+I and the
 * page source via Ctrl+U, and client-side code is always downloadable. Treat
 * this purely as a light deterrent.
 */
export default function DisableContextMenu() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", onContextMenu);
    return () => document.removeEventListener("contextmenu", onContextMenu);
  }, []);

  return null;
}
