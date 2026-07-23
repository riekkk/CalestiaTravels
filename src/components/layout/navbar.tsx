"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/layout/brand-mark";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tours", label: "Tour Packages" },
  { href: "/visa", label: "Visa Assistance" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between py-3">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <BrandMark size={44} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  active ? "text-primary" : "text-ink/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/portal/dashboard" variant="ghost" size="sm">
            <User className="h-4 w-4" />
            {user ? "My Portal" : "Client Portal"}
          </ButtonLink>
          <ButtonLink href="/visa" size="sm">
            Start Visa Application
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary-dark lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary/10 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink/80 hover:bg-bg-light hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <ButtonLink href="/portal/dashboard" variant="secondary" size="sm">
                {user ? "My Portal" : "Client Portal"}
              </ButtonLink>
              <ButtonLink href="/visa" size="sm">
                Start Visa Application
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
