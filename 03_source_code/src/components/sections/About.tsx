"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const COUNTER_TARGETS = [
  { value: 8, label: "Projects Built" },
  { value: 17, label: "Technologies" },
  { value: 4, label: "Professional Roles" },
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

const SOFT_SKILLS = [
  "Technical Leadership",
  "Academic Research",
  "Strategic Thinking",
  "Sales",
  "Complex Problem Solving",
  "Hardware-Software Integration",
  "Cross-layer Systems Thinking",
  "Adaptability",
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
          className="blob-1 absolute rounded-full bg-zinc-200 will-change-transform"
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
          className="blob-2 absolute rounded-full bg-indigo-100 will-change-transform"
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
            About
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display text-text-primary">
            The Engineer Behind the Work
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
          {COUNTER_TARGETS.map(function ({ label }, i) {
            return (
              <div key={label} className="text-center">
                <div className="text-[clamp(2rem,4vw,3.5rem)] font-bold font-display text-text-primary leading-none mb-2">
                  <span
                    ref={function (el) {
                      counterRefs.current[i] = el;
                    }}
                  >
                    0
                  </span>
                </div>
                <p className="text-text-secondary font-sans text-sm">{label}</p>
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
            I am a Computer Science researcher and software engineer driven by a
            single obsession: solving problems that sit at the edge of what is
            currently possible. My work does not live in one layer of the stack.
            I build firmware for microcontrollers, train computer vision models
            that run on edge hardware, and ship the full-stack web interfaces
            that make those systems actionable. That range is not accidental, it
            is the result of deliberately choosing the hardest problems across
            embedded systems, applied AI, and modern web development, and seeing
            each one through to a working solution.
          </p>
          <p className="text-text-secondary font-sans text-lg leading-relaxed">
            At UFBA, I conduct research in IoT and embedded systems as an
            undergraduate research fellow, while also serving as a teaching
            assistant in Computer Networks and Assembly. Beyond the academia, I
            lead the development of production-grade projects spanning biometric
            security, autonomous drones, and AI-powered SaaS platforms. I&apos;m
            not looking to fit into a predefined role. I&apos;m driven by the
            opportunity to build technology that creates meaningful impact.
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
                  Core Technologies
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
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SOFT_SKILLS.map(function (skill, i) {
                    return (
                      <span
                        key={skill}
                        ref={function (el) {
                          tagRefs.current[CORE_TECHNOLOGIES.length + i] = el;
                        }}
                        className="font-mono text-sm bg-zinc-100 text-zinc-800 px-[10px] py-1"
                        style={TAG_STYLE}
                      >
                        {skill}
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
            What I Actually Bring
          </h3>
          <div className="space-y-6">
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "600ms" }}
            >
              Here is what I actually bring to a team.{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                I learn fast.
              </span>{" "}
              When a project demands a framework I have never touched or a
              domain I have never worked in,{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                I do not stall and I do not make excuses.
              </span>{" "}
              I absorb it, apply it, and start delivering. That adaptability is
              what lets me move across layers most engineers never cross, from{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                embedded firmware to applied AI to the web interface
              </span>{" "}
              that ties it all together.
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "680ms" }}
            >
              But{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                raw technical range
              </span>{" "}
              means nothing if you cannot communicate it. I can stand in front
              of a room and translate a dense technical architecture into
              language a business leader, an investor, or a teammate actually
              understands. I have spent time teaching, presenting, and
              explaining complex systems to people who do not live in code, and
              I know how to{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                bridge the gap between what is technically true and what a
                decision maker needs to hear.
              </span>
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "760ms" }}
            >
              What truly defines how I work is simpler than any skill on a list.{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                I do not quit.
              </span>{" "}
              Hand me a problem that looks impossible and I will keep pushing
              until it is solved, no matter what it takes. I carry a{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                relentless drive to grow and improve
              </span>
              , but I carry it with humility and integrity. I am confident in
              what I can build, honest about what I am still learning, and{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                reliable when it matters most.
              </span>
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "840ms" }}
            >
              If you need someone who will{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                own a hard problem from the first circuit to the final
                deployment
              </span>{" "}
              and{" "}
              <span className="font-medium text-zinc-900 bg-zinc-100/80 px-1.5 py-0.5 rounded-md decoration-clone">
                refuse to walk away until it works
              </span>
              , that is exactly who I am.
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
            Beyond Code
          </h3>
          <div className="space-y-6">
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "600ms" }}
            >
              When I step away from the screen, you will most likely find me
              close to the ocean. There is something about the coastline that
              genuinely recharges me, and living in Salvador means I would never
              trade that. I am an extrovert at heart. I love meeting new people
              and connecting easily, even if I might seem a little reserved at
              first. My favorite moments are simple ones: good food at a great
              restaurant, traveling somewhere new, and spending time with
              family.
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "680ms" }}
            >
              Sports are a big part of who I am. I am a proud and devoted
              Esporte Clube Bahia supporter, the kind who shows up to games and
              is fully convinced he brings luck. I balance watching basketball
              (a lifelong Steph Curry fan) and following the NFL for the sheer
              intensity of it, with actually playing: soccer and gym keep me
              disciplined and grounded, even if a good meal occasionally wins
              the negotiation.
            </span>
            <span
              className="line-reveal inline-block font-sans text-lg leading-relaxed"
              style={{ transitionDelay: "760ms" }}
            >
              At the end of the day, I am someone who collects experiences more
              than things. New places, new people, new problems worth solving:
              that is what drives me both inside and outside the code.
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
