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
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 bg-pearl relative">
      <div className="blob-bg" aria-hidden="true">
        <div className="absolute w-96 h-96 rounded-full bg-pearl opacity-50 blur-[80px] will-change-transform animate-blob-slow top-[-10%] left-[-5%]" />
        <div className="absolute w-80 h-80 rounded-full bg-alabaster opacity-50 blur-[80px] will-change-transform animate-blob-mid top-[20%] right-[-8%]" />
        <div className="absolute w-72 h-72 rounded-full bg-soft-slate opacity-40 blur-[80px] will-change-transform animate-blob-fast bottom-[-5%] left-[30%]" />
      </div>
      <div
        className={isLoaded ? "max-w-5xl w-full transition-opacity duration-500 ease-out opacity-100" : "max-w-5xl w-full transition-opacity duration-500 ease-out opacity-0"}
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
            className="px-6 py-3 rounded-lg text-sm font-medium border transition-colors duration-200 bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-700 hover:border-zinc-700 font-sans"
          >
            View Projects
          </a>
          <a
            href="#diferencial"
            onClick={(e) => handleNavClick(e, "#diferencial")}
            className="px-6 py-3 rounded-lg text-sm font-medium border transition-colors duration-200 bg-transparent text-zinc-900 border-zinc-900 hover:bg-zinc-900 hover:text-white font-sans"
          >
            How can I help
          </a>
        </div>
      </div>
    </section>
  );
}
