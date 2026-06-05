"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import type { Project } from "@/data/projects";

export interface ProjectModalProps {
  project: Project | null;
  cardRect: DOMRect | null;
  onClose: () => void;
  triggerElement: HTMLElement | null;
}

function ProjectModal({ project, onClose, triggerElement }: ProjectModalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  // Escape key
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [project, onClose]);

  // Return focus to originating card
  useEffect(() => {
    if (!project && triggerElement) {
      triggerElement.focus();
    }
  }, [project, triggerElement]);

  if (!portalTarget) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
          />

          {/* Centering shell — pointer-events-none so backdrop clicks pass through */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 desktop:p-8 pointer-events-none">
            <motion.div
              key={project.name}
              role="dialog"
              aria-modal="true"
              aria-label={project.name}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-zinc-200 shadow-xl outline-none pointer-events-auto"
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.3, ease: [0.32, 0, 0, 1] }}
            >
              <FocusTrap focusTrapOptions={{ escapeDeactivates: false }}>
                <div>
                  {/* Sticky close */}
                  <div className="sticky top-0 z-10 flex justify-end px-4 pt-4 pb-2 bg-white border-b border-zinc-100 desktop:px-8">
                    <button
                      onClick={onClose}
                      className="font-mono text-zinc-400 hover:text-zinc-900 transition-colors duration-200 text-xl leading-none p-2"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="px-4 desktop:px-8 pb-16 pt-4">
                    {/* Status badge */}
                    <div className="mb-4">
                      <span className="font-mono text-[0.75rem] text-zinc-500 border border-zinc-200 rounded-md px-2.5 py-1">
                        [ {project.status} ]
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className="font-display font-bold text-zinc-900 text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] mb-2">
                      {project.name}
                    </h2>

                    {/* Date */}
                    <p className="font-mono text-zinc-500 text-sm mb-8">{project.date}</p>

                    {/* Hero media */}
                    <div className="w-full rounded-xl overflow-hidden mb-10 bg-zinc-100 aspect-video">
                      {project.heroMediaType === "video" ? (
                        <video
                          src={project.heroMediaPath}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        project.heroMediaPath && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.heroMediaPath}
                            alt={project.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )
                      )}
                    </div>

                    {/* The Problem */}
                    <section className="mb-10">
                      <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest mb-3">
                        The Problem
                      </p>
                      <p className="font-sans text-zinc-700 text-[0.9375rem] desktop:text-base leading-[1.7]">
                        {project.theProblem}
                      </p>
                    </section>

                    {/* The Solution */}
                    <section className="mb-10">
                      <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest mb-3">
                        The Solution
                      </p>
                      <p className="font-sans text-zinc-700 text-[0.9375rem] desktop:text-base leading-[1.7]">
                        {project.theSolution}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[0.75rem] bg-indigo-50 text-indigo-700 rounded-md px-2.5 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* External links */}
                    {project.externalLinks.length > 0 && (
                      <section>
                        <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest mb-4">
                          Links
                        </p>
                        <div className="flex flex-col gap-3">
                          {project.externalLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-sans text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-200 inline-flex items-center gap-1"
                            >
                              ↗ {link.label}
                            </a>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </FocusTrap>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    portalTarget
  );
}

export default ProjectModal;
