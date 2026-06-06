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
  return Math.floor(cardIndex / 3);
}

const CARD_TAG_STYLE: CSSProperties = {
  borderRadius: "var(--radius-tag, 6px)",
  transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCardRect, setActiveCardRect] = useState<DOMRect | null>(null);
  const [activeTriggerEl, setActiveTriggerEl] = useState<HTMLElement | null>(
    null,
  );
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
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
    <section
      id="projects"
      className="bg-white px-6 py-24 relative"
    >
      <div aria-hidden="true" className="blob-bg">
        <div className="blob-1 absolute rounded-full will-change-transform" style={{ width: "600px", height: "600px", top: "-10%", left: "-8%", opacity: 0.28, filter: "blur(90px)", background: "#CBD5E1" }} />
        <div className="blob-2 absolute rounded-full will-change-transform" style={{ width: "500px", height: "500px", bottom: "5%", right: "5%", opacity: 0.22, filter: "blur(100px)", background: "#D1D5DB" }} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent" />
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

      {/* Bottom fade into Experience section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white"
        style={{ zIndex: 2 }}
      />

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
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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
      if (timeUpdateHandlerRef.current) {
        video.removeEventListener("timeupdate", timeUpdateHandlerRef.current);
        timeUpdateHandlerRef.current = null;
      }
      video.pause();
      setTimeout(() => {
        if (video) video.currentTime = 0;
      }, 300);
    }
    tagRefs.current.forEach(function(tag) {
      if (tag) tag.style.transform = "translate(0px, 0px)";
    });
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

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    wrapper.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
    wrapper.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
  }, []);

  // Magnetic tag repulsion — same physics as About.tsx
  useEffect(function() {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let rafPending = false;
    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = function(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      rafId = requestAnimationFrame(function() {
        rafPending = false;
        const computed = tagRefs.current.map(function(tag) {
          if (!tag) return null;
          const rect = tag.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mouseX - cx;
          const dy = mouseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { tag, dx, dy, dist };
        });
        computed.forEach(function(r) {
          if (!r) return;
          if (r.dist < 60 && r.dist > 0) {
            const force = ((60 - r.dist) / 60) * 6;
            const tx = -(r.dx / r.dist) * Math.min(force, 6);
            const ty = -(r.dy / r.dist) * Math.min(force, 6);
            r.tag.style.transform = "translate(" + tx + "px, " + ty + "px)";
          } else {
            r.tag.style.transform = "translate(0px, 0px)";
          }
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return function() {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isVideo = project.heroMediaType === "video";

  return (
    <div
      ref={revealRef as RefObject<HTMLDivElement>}
      className={isVisible ? "reveal is-visible" : "reveal"}
      style={{ transitionDelay: `${getStaggerDelay(rowIndex)}ms` }}
    >
      {/* Glow wrapper — owns ::after border glow, group class, and lift transition */}
      <div
        ref={wrapperRef}
        className="card-glow-wrapper group hover:-translate-y-0.5 transition-transform duration-300 ease-out"
        style={{ "--mouse-x": "-200px", "--mouse-y": "-200px" } as unknown as CSSProperties}
        onMouseMove={handleCardMouseMove}
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
          className="relative overflow-hidden rounded-card bg-surface border border-border cursor-pointer transition-colors duration-300 ease-out hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          {/* Spotlight — z:5, above media/gradient, below z:10 content */}
          <div aria-hidden="true" className="card-spotlight" />

          {/* Media layer */}
          <div
            className={"absolute inset-0 transition-opacity duration-300 ease-out " + (isTouch ? "opacity-[0.3]" : "opacity-0 group-hover:opacity-100")}
          >
            {isVideo ? (
              <video
                ref={videoRef}
                src={project.heroMediaPath}
                muted
                playsInline
                preload="none"
                className={"w-full h-full object-cover transition-transform duration-300 ease-out " + (isTouch ? "" : "scale-100 group-hover:scale-105")}
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
                  className={"w-full h-full object-cover transition-transform duration-300 ease-out " + (isTouch ? "" : "scale-100 group-hover:scale-105")}
                  onError={() => setSingleImageError(true)}
                />
              )
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200" />
            )}
          </div>

          {/* Gradient overlay */}
          <div
            className={"absolute inset-0 transition-opacity duration-300 ease-out " + (isTouch ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
            }}
          />

          {/* Card content */}
          <div className="relative z-10 flex flex-col min-h-[280px] p-8 justify-end gap-3">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(function(tech, i) {
                return (
                  <span
                    key={tech}
                    ref={function(el) { tagRefs.current[i] = el; }}
                    className="font-mono text-[0.75rem] tablet:text-[0.8125rem] bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-md px-2.5 py-1"
                    style={CARD_TAG_STYLE}
                  >
                    {tech}
                  </span>
                );
              })}
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
    </div>
  );
}
