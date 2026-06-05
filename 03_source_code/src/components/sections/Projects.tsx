"use client";

import dynamic from "next/dynamic";
import { type CSSProperties, type RefObject, useState, useRef, useCallback, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getStaggerDelay } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

// Loaded client-only: framer-motion + focus-trap-react never run on the server
const ProjectModal = dynamic(() => import("@/components/modals/ProjectModal"), {
  ssr: false,
  loading: () => null,
});

function getCardRowIndex(cardIndex: number): number {
  // Uniform 3-col grid — each row holds exactly 3 cards
  return Math.floor(cardIndex / 3);
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null);
  const [activeTriggerEl, setActiveTriggerEl] = useState<HTMLElement | null>(
    null,
  );
  const [isTouch, setIsTouch] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let rafPending = false;
    let rafId = 0;

    const handler = (e: MouseEvent) => {
      if (rafPending) return;
      rafPending = true;
      rafId = requestAnimationFrame(() => {
        rafPending = false;
        const glow = glowRef.current;
        const section = sectionRef.current;
        if (!glow || !section) return;
        const rect = section.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          glow.style.opacity = "1";
          glow.style.setProperty("--glow-x", `${e.clientX}px`);
          glow.style.setProperty("--glow-y", `${e.clientY}px`);
        } else {
          glow.style.opacity = "0";
        }
      });
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleOpenModal = useCallback(
    (project: Project, rect: DOMRect, trigger: HTMLElement) => {
      setActiveCardRect(rect);
      setActiveTriggerEl(trigger);
      setActiveProject(project);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="px-6 py-24 relative bg-alabaster">
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "fixed",
          inset: 0,
          opacity: 0,
          transition: "opacity 300ms ease-out",
          background:
            "radial-gradient(200px circle at var(--glow-x) var(--glow-y), rgba(0,0,0,0.035), transparent 70%)",
          zIndex: 0,
        } as CSSProperties}
      />
      <div className="max-w-[1200px] mx-auto relative" style={{ zIndex: 1 }}>
        <div className="mb-12">
          <p className="font-mono text-text-secondary text-xs uppercase tracking-widest mb-3">
            Selected Work
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display text-text-primary">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 tablet:gap-5 desktop:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              isTouch={isTouch}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        cardRect={activeCardRect}
        onClose={handleCloseModal}
        triggerElement={activeTriggerEl}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isTouch,
  onOpenModal,
}: {
  project: Project;
  index: number;
  isTouch: boolean;
  onOpenModal: (project: Project, rect: DOMRect, trigger: HTMLElement) => void;
}) {
  const { ref: revealRef, isVisible } = useIntersectionObserver();
  const rowIndex = Math.floor(index / 3);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeUpdateHandlerRef = useRef<(() => void) | null>(null);
  const [leftImageError, setLeftImageError] = useState(false);
  const [rightImageError, setRightImageError] = useState(false);
  const [singleImageError, setSingleImageError] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Set up time update listener to loop within hoverStartTime and hoverEndTime
      const handleTimeUpdate = () => {
        if (
          project.hoverEndTime !== undefined &&
          video.currentTime >= project.hoverEndTime
        ) {
          video.currentTime = project.hoverStartTime ?? 0;
        }
      };

      timeUpdateHandlerRef.current = handleTimeUpdate;
      video.addEventListener("timeupdate", handleTimeUpdate);

      // Seek to start time
      if (project.hoverStartTime !== undefined) {
        video.currentTime = project.hoverStartTime;
      }

      video.play().catch(() => {});
    }
  }, [project.hoverStartTime, project.hoverEndTime]);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Remove time update listener
      if (timeUpdateHandlerRef.current) {
        video.removeEventListener("timeupdate", timeUpdateHandlerRef.current);
        timeUpdateHandlerRef.current = null;
      }

      video.pause();
      setTimeout(() => {
        if (video) video.currentTime = 0;
      }, 300);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onOpenModal(project, rect, cardRef.current);
    }
  }, [project, onOpenModal]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  const isVideo = project.heroMediaType === "video";

  return (
    <div
      ref={revealRef as RefObject<HTMLDivElement>}
      className={isVisible ? "reveal is-visible" : "reveal"}
      style={{ transitionDelay: `${getStaggerDelay(rowIndex)}ms` }}
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.name} details`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-card bg-surface border border-border group cursor-pointer transition-[border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        {/* Media layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            isTouch ? "opacity-[0.3]" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={project.heroMediaPath}
              muted
              playsInline
              preload="none"
              className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                isTouch ? "" : "scale-100 group-hover:scale-105"
              }`}
            />
          ) : project.heroMediaType === "side-by-side" &&
            project.heroMediaPaths ? (
            <div className="flex w-full h-full gap-2 p-2">
              {leftImageError ? (
                <div className="flex-1 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.heroMediaPaths.left}
                  alt=""
                  className="flex-1 object-cover rounded-lg"
                  onError={() => setLeftImageError(true)}
                />
              )}
              {rightImageError ? (
                <div className="flex-1 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.heroMediaPaths.right}
                  alt=""
                  className="flex-1 object-cover rounded-lg"
                  onError={() => setRightImageError(true)}
                />
              )}
            </div>
          ) : project.heroMediaPath ? (
            singleImageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.heroMediaPath}
                alt=""
                className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                  isTouch ? "" : "scale-100 group-hover:scale-105"
                }`}
                onError={() => setSingleImageError(true)}
              />
            )
          ) : (
            // Default fallback
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200" />
          )}
        </div>

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            isTouch ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
          }}
        />

        {/* Card content */}
        <div className="relative z-10 flex flex-col min-h-[280px] p-8 justify-end gap-3">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.75rem] tablet:text-[0.8125rem] bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-md px-2.5 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
          <div>
            <h3 className="text-text-primary font-display font-bold text-xl leading-tight mb-1">
              {project.name}
            </h3>
            <p className="text-text-secondary font-sans text-sm leading-relaxed">
              {project.oneLiner}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
