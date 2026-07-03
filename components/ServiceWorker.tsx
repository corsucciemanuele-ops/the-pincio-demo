"use client";

import { useEffect } from "react";

/** Registers the service worker after load (so it never blocks first paint). */
export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        // Check for a new sw.js on every launch, so fixes reach installed PWAs.
        .then((reg) => reg.update().catch(() => {}))
        .catch(() => {});
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
