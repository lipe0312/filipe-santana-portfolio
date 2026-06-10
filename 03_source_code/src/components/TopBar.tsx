"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "@/context/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const navLinks: Array<{ key: TranslationKey; href: string }> = [
  { key: "nav.projects", href: "#projects" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.about", href: "#about" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.contact", href: "#contact" },
];

export default function TopBar() {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState(
    navLinks[0].href.substring(1),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const frameHandle = useRef<number | null>(null);

  const closeMenu = () => setMenuOpen(false);
  const openMenu = () => setMenuOpen(true);

  const navItems = useMemo(() => navLinks, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const hasScrolled = currentScrollY > 60;
      const shouldHide = currentScrollY > 300 && !scrollingUp;

      setIsScrolled(hasScrolled);
      setIsHidden(shouldHide);
      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (frameHandle.current !== null) return;
      frameHandle.current = window.requestAnimationFrame(() => {
        handleScroll();
        frameHandle.current = null;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024 && e.clientY <= 20) {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameHandle.current !== null) {
        window.cancelAnimationFrame(frameHandle.current);
      }
    };
  }, []);

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.href.substring(1)))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0,
      },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 h-14 w-full max-w-full transform transition-transform duration-300 ease-out " +
        (isHidden ? "-translate-y-full" : "translate-y-0") +
        " " +
        (isScrolled
          ? "bg-background-base/75 backdrop-blur-[16px] border-b border-border"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 py-4 min-w-0">
        {/* Logo — hides when mobile menu is open */}
        <a
          href="#"
          onClick={handleLogoClick}
          className={
            "group relative items-center overflow-hidden text-sm font-semibold tracking-[0.12em] text-text-primary uppercase font-sans shrink-0 transition-opacity duration-150 " +
            (menuOpen ? "hidden" : "inline-flex")
          }
        >
          <span aria-hidden="true" className="select-none opacity-0">
            Filipe Santana
          </span>
          <span className="absolute inset-0 flex items-center transition-transform duration-300 ease-out group-hover:translate-y-full">
            Filipe Santana
          </span>
          <span className="absolute inset-0 flex items-center -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
            Filipe Santana
          </span>
        </a>

        {/* Right side: nav + lang switcher + mobile controls */}
        <div className={"flex items-center gap-4 min-w-0 " + (menuOpen ? "flex-1" : "")}>

          {/* Desktop nav — unchanged */}
          <nav aria-label="Primary navigation" className="hidden desktop:block">
            <ul className="flex items-center gap-6 text-sm font-medium font-sans">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                const label = t(item.key);

                return (
                  <li key={item.href}>
                    {/* Nav link — dual-span slide top→bottom on hover */}
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={
                        "group relative inline-flex items-center overflow-hidden " +
                        (isActive ? "text-text-primary" : "text-text-secondary")
                      }
                    >
                      <span aria-hidden="true" className="select-none opacity-0">
                        {label}
                      </span>
                      <span
                        className={
                          "absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-full " +
                          (isActive ? "text-text-primary" : "text-text-secondary")
                        }
                      >
                        {label}
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center text-text-primary -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                        {label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Divider — desktop only */}
          <span aria-hidden="true" className="hidden desktop:block w-px h-4 bg-border shrink-0" />

          {/* Dropdown switcher — desktop (with label) */}
          <div className="hidden desktop:flex">
            <LanguageSwitcher />
          </div>

          {/* Mobile inline nav links — visible only when menu is open */}
          <div
            className={"flex desktop:hidden flex-1 overflow-x-auto items-center justify-between px-2 transition-all duration-300 ease-out " + (menuOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-8 pointer-events-none")}
            style={{ scrollbarWidth: "none" }}
          >
            {navItems.map((item) => {
              const label = t(item.key);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById(item.href.substring(1));
                    if (section) {
                      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                    }
                    closeMenu();
                  }}
                  className="text-[10px] uppercase tracking-wide whitespace-nowrap shrink-0 text-text-secondary px-1"
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Quick Contact Icon — mobile only, hidden when menu is open */}
          <button
            className={"desktop:hidden items-center justify-center p-2 " + (menuOpen ? "hidden" : "flex")}
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }}
            aria-label="Go to contact"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 13.333A1.667 1.667 0 0 1 15.833 15H5.833L2.5 18.333V4.167A1.667 1.667 0 0 1 4.167 2.5h11.666A1.667 1.667 0 0 1 17.5 4.167v9.166Z"/>
            </svg>
          </button>

          {/* Mobile lang switcher — hidden when menu is open */}
          <div className={"desktop:hidden " + (menuOpen ? "hidden" : "flex")}>
            <LanguageSwitcher compact />
          </div>

          {/* Hamburger — mobile only, hidden when menu is open */}
          <button
            onClick={openMenu}
            className={"desktop:hidden items-center justify-center text-text-secondary hover:text-text-primary transition-colors " + (menuOpen ? "hidden" : "flex")}
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

          {/* × close button — mobile only, visible when menu is open */}
          <button
            onClick={closeMenu}
            className={"desktop:hidden items-center justify-center text-text-secondary hover:text-text-primary transition-colors shrink-0 " + (menuOpen ? "flex" : "hidden")}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      </div>
    </header>
  );
}
