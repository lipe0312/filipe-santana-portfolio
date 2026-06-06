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
            Let's build something that matters.
          </h2>
          <p className="text-text-secondary text-lg md:text-xl mb-12 font-sans leading-relaxed">
            Open to collaborations, engineering challenges, and opportunities where the problem is genuinely interesting.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="mailto:filipe.santana.0312@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans"
            >
              <Mail size={20} />
              <span>filipe.santana.0312@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/filipe-santana-home/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans"
            >
              <Link size={20} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/lipe0312"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-surface border border-border rounded-card text-text-primary hover:border-text-secondary/50 transition-colors font-sans"
            >
              <GitBranch size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
