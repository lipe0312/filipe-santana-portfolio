"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState(
    navLinks[0].href.substring(1),
  );
  const lastScrollY = useRef(0);
  const frameHandle = useRef<number | null>(null);

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
      if (frameHandle.current !== null) {
        return;
      }

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

    if (sectionElements.length === 0) {
      return undefined;
    }

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
      className={`fixed inset-x-0 top-0 z-50 transform transition-transform duration-300 ease-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${isScrolled ? "bg-background-base/75 backdrop-blur-[16px] border-b border-border" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <a
          href="#"
          onClick={handleLogoClick}
          className="text-sm font-semibold tracking-[0.12em] text-text-primary uppercase font-sans"
        >
          Filipe Santana
        </a>

        <nav aria-label="Primary navigation" className="hidden desktop:block">
          <ul className="flex items-center gap-6 text-sm font-medium font-sans">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`transition-colors duration-200 ease-out ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
