"use client";

import { useState } from "react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex desktop:hidden items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Open menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background-base flex flex-col items-center justify-center overflow-hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((item) => (
                <li key={item.href}>
                  {/* Full-overlay nav item — dual-span slide top→bottom on hover */}
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group relative inline-flex items-center overflow-hidden text-3xl font-semibold"
                  >
                    <span aria-hidden="true" className="select-none opacity-0">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-text-primary transition-transform duration-300 ease-out group-hover:translate-y-full">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-text-secondary -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
