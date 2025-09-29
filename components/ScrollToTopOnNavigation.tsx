"use client"; // client-only component

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // SSR safe router

export default function ScrollToTopOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top whenever pathname changes
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
