"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      // Already loaded, set state immediately
      requestAnimationFrame(handleLoad);
    } else {
      window.addEventListener("DOMContentLoaded", handleLoad);
      return () => window.removeEventListener("DOMContentLoaded", handleLoad);
    }
  }, []);

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

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div
        className={`max-w-5xl w-full transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-tight font-display mb-4">
          Building systems that think: from the edge device to the interface.
        </h1>
        <div className="text-text-secondary text-lg md:text-xl mb-8 font-sans">
          <p className="mb-2">Filipe Santana</p>
          <p>Computer Science Researcher & Software Engineer based in Salvador, BA.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "#projects")}
            className="px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans"
          >
            View Projects
          </a>
          <a
            href="#diferencial"
            onClick={(e) => handleNavClick(e, "#diferencial")}
            className="px-6 py-3 text-text-secondary hover:text-text-primary transition-colors font-sans"
          >
            How can I help
          </a>
        </div>
      </div>
    </section>
  );
}
