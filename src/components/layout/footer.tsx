import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE_INFO } from "@/lib/site-info";
import { BrandMark } from "@/components/layout/brand-mark";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-white/40"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H8v3h2.42V21h3.08z" />
    </svg>
  );
}

const explore = [
  { href: "/tours", label: "Tour Packages" },
  { href: "/tours/domestic", label: "Domestic Tours" },
  { href: "/tours/international", label: "International Tours" },
  { href: "/visa", label: "Visa Assistance" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center">
            <BrandMark size={48} onDark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Where every Japan journey begins. Visa assistance and travel
            packages handled with precision, care, and complete transparency.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Company
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-white/40" />
              <a href={SITE_INFO.phoneHref} className="hover:text-white">
                {SITE_INFO.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-white/40" />
              <a href={SITE_INFO.emailHref} className="hover:text-white">
                {SITE_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-white/40" />
              <span>{SITE_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FacebookIcon />
              <a
                href={SITE_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {SITE_INFO.facebookName}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Calestia Travel & Tours. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <p>Precision Architecture in Travel Governance.</p>
        </div>
      </div>
    </footer>
  );
}
