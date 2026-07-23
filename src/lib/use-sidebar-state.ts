"use client";

import { useState } from "react";

export function useSidebarState() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return { mobileOpen, setMobileOpen, collapsed, setCollapsed };
}
