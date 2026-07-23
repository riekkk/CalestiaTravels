"use client";

import { useEffect, useState } from "react";

export function useCooldown(seconds: number) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  return { remaining, active: remaining > 0, start: () => setRemaining(seconds) };
}
