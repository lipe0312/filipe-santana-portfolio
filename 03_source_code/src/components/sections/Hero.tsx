"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
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
    <section className="bg-white relative min-h-screen flex items-center justify-center px-6 pt-24">
      {/* Ambient blobs — absolute so they stay inside the white Hero */}
      <div aria-hidden="true" className="blob-bg">
        <div
          className="blob-1 absolute rounded-full will-change-transform"
          style={{
            width: "720px",
            height: "720px",
            top: "-8%",
            left: "-6%",
            opacity: 0.85,
            filter: "blur(70px)",
            background: "#94A3B8",
          }}
        />
        <div
          className="blob-2 absolute rounded-full will-change-transform"
          style={{
            width: "600px",
            height: "600px",
            top: "12%",
            right: "-8%",
            opacity: 0.7,
            filter: "blur(60px)",
            background: "#A5B4FC",
          }}
        />
      </div>

      <div
        className={
          isLoaded
            ? "relative max-w-5xl w-full transition-opacity duration-500 ease-out opacity-100"
            : "relative max-w-5xl w-full transition-opacity duration-500 ease-out opacity-0"
        }
        style={{ zIndex: 1 }}
      >
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-tight font-display mb-4">
          Building systems that think: from the edge device to the interface.
        </h1>
        <div className="text-text-secondary text-lg md:text-xl mb-8 font-sans">
          <p className="mb-2">Filipe Santana</p>
          <p>
            Computer Science Researcher & Software Engineer based in Salvador,
            BA.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* View Projects — dark bg, text slides TOP → BOTTOM on hover */}
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "#projects")}
            className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 rounded-lg text-sm font-medium border transition-colors duration-300 bg-zinc-900 border-zinc-900 hover:bg-transparent hover:border-zinc-900 font-sans"
          >
            <span aria-hidden="true" className="select-none opacity-0">
              View Projects
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-300 ease-out group-hover:translate-y-full">
              View Projects
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-zinc-900 -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
              View Projects
            </span>
          </a>
          {/* How can I help — light border, text slides BOTTOM → TOP on hover */}
          <a
            href="#diferencial"
            onClick={(e) => handleNavClick(e, "#diferencial")}
            className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 rounded-lg text-sm font-medium border transition-colors duration-300 bg-transparent border-zinc-900 hover:bg-zinc-900 font-sans"
          >
            <span aria-hidden="true" className="select-none opacity-0">
              How can I help
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-zinc-900 transition-transform duration-300 ease-out group-hover:-translate-y-full">
              How can I help
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-white translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
              How can I help
            </span>
          </a>
        </div>
      </div>

      {/* Bottom fade — softens the Hero content edge into the Projects section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}
