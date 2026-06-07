"use client";

import { type RefObject } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Mail, Link, GitBranch } from "lucide-react";

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="contact" className="bg-white px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className={isVisible ? "reveal is-visible" : "reveal"}
        >
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display mb-4 text-text-primary">
            Let&apos;s build something that matters.
          </h2>
          <p className="text-text-secondary text-lg md:text-xl mb-12 font-sans leading-relaxed">
            Open to collaborations, engineering challenges, and opportunities
            where the problem is genuinely interesting.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {/* Email — dual-span slide on text portion, icon stays static */}
            <a
              href="mailto:filipe.santana.0312@gmail.com"
              className="group flex items-center gap-3 px-5 sm:px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans min-w-0"
            >
              <Mail size={20} className="shrink-0" />
              <span className="relative inline-flex overflow-hidden min-w-0">
                <span aria-hidden="true" className="select-none opacity-0 whitespace-nowrap">
                  filipe.santana.0312@gmail.com
                </span>
                <span className="absolute inset-0 flex items-center whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-y-full">
                  filipe.santana.0312@gmail.com
                </span>
                <span className="absolute inset-0 flex items-center whitespace-nowrap -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                  filipe.santana.0312@gmail.com
                </span>
              </span>
            </a>

            {/* LinkedIn — dual-span slide */}
            <a
              href="https://www.linkedin.com/in/filipe-santana-home/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 sm:px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans"
            >
              <Link size={20} className="shrink-0" />
              <span className="relative inline-flex overflow-hidden">
                <span aria-hidden="true" className="select-none opacity-0">
                  LinkedIn
                </span>
                <span className="absolute inset-0 flex items-center transition-transform duration-300 ease-out group-hover:translate-y-full">
                  LinkedIn
                </span>
                <span className="absolute inset-0 flex items-center -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                  LinkedIn
                </span>
              </span>
            </a>

            {/* GitHub — dual-span slide */}
            <a
              href="https://github.com/lipe0312"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 sm:px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans"
            >
              <GitBranch size={20} className="shrink-0" />
              <span className="relative inline-flex overflow-hidden">
                <span aria-hidden="true" className="select-none opacity-0">
                  GitHub
                </span>
                <span className="absolute inset-0 flex items-center transition-transform duration-300 ease-out group-hover:translate-y-full">
                  GitHub
                </span>
                <span className="absolute inset-0 flex items-center -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                  GitHub
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
