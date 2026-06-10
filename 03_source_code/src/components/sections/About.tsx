"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useTranslations } from "@/context/LanguageContext";

import type { TranslationKey } from "@/i18n/translations";

const COUNTER_TARGETS: { value: number; labelKey: TranslationKey }[] = [
  { value: 8, labelKey: "about.counter.projects" },
  { value: 17, labelKey: "about.counter.technologies" },
  { value: 4, labelKey: "about.counter.roles" },
];

const CORE_TECHNOLOGIES = [
  "Python",
  "C",
  "C++",
  "JavaScript",
  "Java",
  "React",
  "TypeScript",
  "Flask",
  "OpenCV",
  "YOLO",
  "ESP32",
  "MQTT",
  "Git",
  "Linux",
  "SQL",
  "Assembly",
  "TensorFlow",
];

const SOFT_SKILL_KEYS: TranslationKey[] = [
  "about.skill.leadership",
  "about.skill.research",
  "about.skill.strategic",
  "about.skill.sales",
  "about.skill.problemSolving",
  "about.skill.hwsw",
  "about.skill.crossLayer",
  "about.skill.adaptability",
];

const TAG_STYLE: CSSProperties = {
  borderRadius: "var(--radius-tag, 6px)",
  transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const PIXEL_GRID_BASE: CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "20px 20px",
};

const PIXEL_GRID_HIGHLIGHT: CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "20px 20px",
  maskImage:
    "radial-gradient(circle 150px at var(--mouse-x, -999px) var(--mouse-y, -999px), black, transparent)",
  WebkitMaskImage:
    "radial-gradient(circle 150px at var(--mouse-x, -999px) var(--mouse-y, -999px), black, transparent)",
};

export default function About() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { ref: statsRevealRef, isVisible: statsVisible } =
    useIntersectionObserver();
  const { ref: summaryRef, isVisible: summaryVisible } =
    useIntersectionObserver();
  const { ref: techRef, isVisible: techVisible } = useIntersectionObserver();
  const { ref: diferencialRef, isVisible: diferencialVisible } =
    useIntersectionObserver();
  const { ref: beyondRef, isVisible: beyondVisible } =
    useIntersectionObserver();

  // Counter animation — fires once when stats row enters viewport
  useEffect(() => {
    const stats = statsRevealRef.current;
    if (!stats) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      COUNTER_TARGETS.forEach(function ({ value }, i) {
        const el = counterRefs.current[i];
        if (el) {
          el.textContent = String(value);
        }
      });
      return;
    }

    const rafIds: number[] = [];

    const runAnimation = function () {
      COUNTER_TARGETS.forEach(function ({ value }, i) {
        const el = counterRefs.current[i];
        if (!el) return;
        let startTime: number | null = null;
        const tick = function (timestamp: number) {
          if (startTime === null) {
            startTime = timestamp;
          }
          const progress = Math.min((timestamp - startTime) / 1200, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(value * eased));
          if (progress < 1) {
            rafIds[i] = requestAnimationFrame(tick);
          } else {
            el.textContent = String(value);
          }
        };
        rafIds[i] = requestAnimationFrame(tick);
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      runAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      function ([entry]) {
        if (entry.isIntersecting) {
          runAnimation();
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(stats);
    return function () {
      observer.disconnect();
      rafIds.forEach(function (id) {
        cancelAnimationFrame(id);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Magnetic tag repulsion — rAF-throttled, read-then-write
  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let rafPending = false;
    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = function (e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      rafId = requestAnimationFrame(function () {
        rafPending = false;
        const tags = tagRefs.current;
        const computed = tags.map(function (tag) {
          if (!tag) return null;
          const rect = tag.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mouseX - cx;
          const dy = mouseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { tag, dx, dy, dist };
        });
        computed.forEach(function (r) {
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

    const handleMouseLeave = function () {
      tagRefs.current.forEach(function (tag) {
        if (tag) {
          tag.style.transform = "translate(0px, 0px)";
        }
      });
    };

    const section = sectionRef.current;
    window.addEventListener("mousemove", handleMouseMove);
    section?.addEventListener("mouseleave", handleMouseLeave);

    return function () {
      window.removeEventListener("mousemove", handleMouseMove);
      section?.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pixel grid mouse interaction
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const container = gridContainerRef.current;
    if (!container) return;

    let rafPending = false;
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const handleMouseMove = function (e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      if (rafPending) return;
      rafPending = true;
      rafId = requestAnimationFrame(function () {
        rafPending = false;
        container.style.setProperty("--mouse-x", pendingX + "px");
        container.style.setProperty("--mouse-y", pendingY + "px");
      });
    };

    const handleMouseLeave = function () {
      container.style.setProperty("--mouse-x", "-999px");
      container.style.setProperty("--mouse-y", "-999px");
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return function () {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Line-reveal IntersectionObserver for Diferencial and Beyond Code paragraphs
  useEffect(function () {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll(".line-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    els.forEach(function (el) {
      observer.observe(el);
    });

    return function () {
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="about"
      ref={sectionRef as RefObject<HTMLElement>}
      className="bg-white relative overflow-hidden px-6 py-24"
    >
      {/* Blob background — slow-sweeping ambient wave */}
      <div aria-hidden="true" className="blob-bg">
        <div
          className="blob-1 absolute rounded-full bg-zinc-200"
          style={{
            width: "700px",
            height: "700px",
            top: "-40px",
            left: "-80px",
            opacity: 0.85,
            filter: "blur(120px)",
          }}
        />
        <div
          className="blob-2 absolute rounded-full bg-indigo-100"
          style={{
            width: "600px",
            height: "600px",
            bottom: "-30px",
            right: "-60px",
            opacity: 0.75,
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Top-seam cover — masks blob bleed at the Experience → About boundary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-text-secondary text-xs uppercase tracking-widest mb-3">
            {t("about.label")}
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display text-text-primary">
            {t("about.heading")}
          </h2>
        </div>

        {/* Stats counter row */}
        <div
          ref={statsRevealRef as RefObject<HTMLDivElement>}
          id="about-stats"
          className={
            (statsVisible ? "reveal is-visible" : "reveal") +
            " grid grid-cols-3 gap-8 mb-16"
          }
          style={{ transitionDelay: "0ms" }}
        >
          {COUNTER_TARGETS.map(function ({ labelKey }, i) {
            return (
              <div key={labelKey} className="text-center">
                <div className="text-[clamp(2rem,4vw,3.5rem)] font-bold font-display text-text-primary leading-none mb-2">
                  <span
                    ref={function (el) {
                      counterRefs.current[i] = el;
                    }}
                  >
                    0
                  </span>
                </div>
                <p className="text-text-secondary font-sans text-sm">{t(labelKey)}</p>
              </div>
            );
          })}
        </div>

        {/* Executive Summary */}
        <div
          ref={summaryRef as RefObject<HTMLDivElement>}
          className={
            (summaryVisible ? "reveal is-visible" : "reveal") + " mb-16"
          }
          style={{ transitionDelay: "50ms" }}
        >
          <p className="text-text-secondary font-sans text-lg leading-relaxed mb-6">
            {t("about.summary.p1")}
          </p>
          <p className="text-text-secondary font-sans text-lg leading-relaxed">
            {t("about.summary.p2")}
          </p>
        </div>

        {/* Core Technologies + Soft Skills — two-column card layout with pixel grid */}
        <div
          ref={techRef as RefObject<HTMLDivElement>}
          className={(techVisible ? "reveal is-visible" : "reveal") + " mb-16"}
          style={{ transitionDelay: "100ms" }}
        >
          <div
            ref={gridContainerRef}
            className="relative"
            style={
              {
                "--mouse-x": "-999px",
                "--mouse-y": "-999px",
              } as unknown as CSSProperties
            }
          >
            {/* Base pixel grid layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              style={PIXEL_GRID_BASE}
            />
            {/* Highlight pixel grid layer — revealed near cursor via mask */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              style={PIXEL_GRID_HIGHLIGHT}
            />
            {/* Two-column card grid */}
            <div
              className="relative grid grid-cols-1 lg:grid-cols-2 gap-6"
              style={{ zIndex: 1 }}
            >
              {/* Core Technologies card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold font-display text-zinc-900 mb-4">
                  {t("about.tech.heading")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CORE_TECHNOLOGIES.map(function (tech, i) {
                    return (
                      <span
                        key={tech}
                        ref={function (el) {
                          tagRefs.current[i] = el;
                        }}
                        className="font-mono text-sm bg-zinc-100 text-zinc-800 px-[10px] py-1"
                        style={TAG_STYLE}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Soft Skills card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold font-display text-zinc-900 mb-4">
                  {t("about.skills.heading")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SOFT_SKILL_KEYS.map(function (key, i) {
                    return (
                      <span
                        key={key}
                        ref={function (el) {
                          tagRefs.current[CORE_TECHNOLOGIES.length + i] = el;
                        }}
                        className="font-mono text-sm bg-zinc-100 text-zinc-800 px-[10px] py-1"
                        style={TAG_STYLE}
                      >
                        {t(key)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diferencial — scroll target of Hero "How can I help" CTA */}
        <div
          id="diferencial"
          ref={diferencialRef as RefObject<HTMLDivElement>}
          className={
            (diferencialVisible ? "reveal is-visible" : "reveal") + " mb-16"
          }
          style={{ transitionDelay: "150ms" }}
        >
          <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold font-display text-text-primary mb-8">
            {t("about.diferencial.heading")}
          </h3>
          <div className="space-y-6">
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "600ms" }}
            >
              {t("about.diferencial.p1.a")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p1.b")}
              </span>{" "}
              {t("about.diferencial.p1.c")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p1.d")}
              </span>{" "}
              {t("about.diferencial.p1.e")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p1.f")}
              </span>{" "}
              {t("about.diferencial.p1.g")}
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "680ms" }}
            >
              {t("about.diferencial.p2.a")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p2.b")}
              </span>{" "}
              {t("about.diferencial.p2.c")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p2.d")}
              </span>
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "760ms" }}
            >
              {t("about.diferencial.p3.a")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p3.b")}
              </span>{" "}
              {t("about.diferencial.p3.c")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p3.d")}
              </span>
              {t("about.diferencial.p3.e")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p3.f")}
              </span>
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "840ms" }}
            >
              {t("about.diferencial.p4.a")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p4.b")}
              </span>{" "}
              {t("about.diferencial.p4.c")}{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                {t("about.diferencial.p4.d")}
              </span>
              {t("about.diferencial.p4.e")}
            </span>
          </div>
        </div>

        {/* Beyond Code */}
        <div
          ref={beyondRef as RefObject<HTMLDivElement>}
          className={beyondVisible ? "reveal is-visible" : "reveal"}
          style={{ transitionDelay: "150ms" }}
        >
          <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold font-display text-text-primary mb-8">
            {t("about.beyond.heading")}
          </h3>
          <div className="space-y-6">
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "600ms" }}
            >
              {t("about.beyond.p1")}
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "680ms" }}
            >
              {t("about.beyond.p2")}
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "760ms" }}
            >
              {t("about.beyond.p3")}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade into Gallery / next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}
