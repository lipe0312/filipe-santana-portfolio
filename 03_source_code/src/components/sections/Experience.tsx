"use client";

import { type RefObject } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getStaggerDelay } from "@/lib/utils";

const experiences = [
  {
    role: "Undergraduate Research Fellow — Embedded Systems & IoT",
    company: "Federal University of Bahia (UFBA)",
    location: "Salvador, BA",
    timeline: "2025 — Present",
    summary:
      "Conducting applied research at the intersection of embedded hardware and intelligent automation, designing systems that integrate microcontrollers, sensors, and computer vision into cohesive, production-grade solutions.",
    achievements: [
      "Engineered hardware-software integration pipelines using ESP32 and industrial communication protocols, enabling real-time data capture and automated decision-making at the edge.",
      "Applied computer vision systems to automate visual inspection and environmental monitoring tasks, reducing the need for manual intervention in controlled environments.",
    ],
  },
  {
    role: "Academic Teaching Assistant — Computer Networks & Assembly",
    company: "Federal University of Bahia (UFBA)",
    location: "Salvador, BA",
    timeline: "2025 — 2026",
    summary:
      "Selected to support undergraduate instruction across two technically demanding disciplines, bridging the gap between low-level architecture and modern networking concepts for a undergraduate cohort.",
    achievements: [
      "Led practical sessions in Assembly programming, guiding students through memory management, register operations, and CPU-level logic with measurable improvements in class performance.",
      "Delivered support in Computer Networks, reinforcing protocol architecture, infrastructure design, and hands-on packet analysis for a cohort of 40+ students.",
    ],
  },
  {
    role: "Systems Developer — Smart Lock Project",
    company: "Innovative Solutions Laboratory (UNIFACS)",
    location: "Salvador, BA",
    timeline: "2025",
    summary:
      "Leading the full technical development of an enterprise-grade physical access control system, architecting a dual-validation security pipeline that merges NFC hardware with real-time computer vision.",
    achievements: [
      "Architected a two-factor authentication system combining mobile NFC reading and facial recognition via OpenCV, delivering a security standard comparable to commercial access control products.",
      "Implemented real-time MQTT communication between the management software and ESP32 microcontrollers over Wi-Fi, achieving sub-second lock actuation response times.",
      "Owned the full development lifecycle — from circuit design and firmware to the backend management interface — as the sole technical lead on the project.",
    ],
  },
  {
    role: "Full Stack Developer — Freelance",
    company: "Independent Clients",
    location: "Remote",
    timeline: "2024 — Present",
    summary:
      "Designing and delivering high-performance web products for clients, with a focus on conversion-optimized interfaces and reliable data infrastructure.",
    achievements: [
      "Built and shipped production web applications using React and Vite, achieving fast load times and fully responsive layouts across devices.",
      "Integrated MySQL database layers into client projects, ensuring structured, scalable data management for business-critical operations.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display mb-12 text-text-primary">
          Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={isVisible ? "reveal is-visible" : "reveal"}
      style={{ transitionDelay: `${getStaggerDelay(index)}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary">
            {experience.role}
          </h3>
          <p className="text-text-secondary font-sans">
            {experience.company} · {experience.location}
          </p>
        </div>
        <p className="text-text-secondary font-mono text-sm shrink-0">
          {experience.timeline}
        </p>
      </div>
      <p className="text-text-secondary font-sans mb-4 leading-relaxed">
        {experience.summary}
      </p>
      <ul className="space-y-2">
        {experience.achievements.map((achievement, i) => (
          <li
            key={i}
            className="text-text-secondary font-sans leading-relaxed list-disc list-inside"
          >
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
}
