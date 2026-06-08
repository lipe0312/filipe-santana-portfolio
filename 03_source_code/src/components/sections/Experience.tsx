"use client";

import { useState, useEffect, type RefObject } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getStaggerDelay } from "@/lib/utils";
import { useTranslations } from "@/context/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface ExperienceData {
  roleKey: TranslationKey;
  companyKey: TranslationKey;
  locationKey: TranslationKey;
  timelineKey: TranslationKey;
  summaryKey: TranslationKey;
  achievementKeys: TranslationKey[];
}

const experiences: ExperienceData[] = [
  {
    roleKey: "experience.role1.role",
    companyKey: "experience.role1.company",
    locationKey: "experience.role1.location",
    timelineKey: "experience.role1.timeline",
    summaryKey: "experience.role1.summary",
    achievementKeys: ["experience.role1.a1", "experience.role1.a2"],
  },
  {
    roleKey: "experience.role2.role",
    companyKey: "experience.role2.company",
    locationKey: "experience.role2.location",
    timelineKey: "experience.role2.timeline",
    summaryKey: "experience.role2.summary",
    achievementKeys: ["experience.role2.a1", "experience.role2.a2"],
  },
  {
    roleKey: "experience.role3.role",
    companyKey: "experience.role3.company",
    locationKey: "experience.role3.location",
    timelineKey: "experience.role3.timeline",
    summaryKey: "experience.role3.summary",
    achievementKeys: ["experience.role3.a1", "experience.role3.a2", "experience.role3.a3"],
  },
  {
    roleKey: "experience.role4.role",
    companyKey: "experience.role4.company",
    locationKey: "experience.role4.location",
    timelineKey: "experience.role4.timeline",
    summaryKey: "experience.role4.summary",
    achievementKeys: ["experience.role4.a1", "experience.role4.a2"],
  },
];

export default function Experience() {
  const t = useTranslations();

  return (
    <section id="experience" className="bg-white relative px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display mb-12 text-text-primary">
          {t("experience.heading")}
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => {
            return (
              <ExperienceItem key={index} experience={exp} index={index} />
            );
          })}
        </div>
      </div>

      {/* Gentle bottom fade into About section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}

function ExperienceItem({
  experience,
  index,
}: {
  experience: ExperienceData;
  index: number;
}) {
  const { ref, isVisible } = useIntersectionObserver();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={isVisible ? "reveal is-visible" : "reveal"}
      style={{ transitionDelay: `${getStaggerDelay(index)}ms` }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => { if (!isTouchDevice) setIsExpanded(true); }}
      onMouseLeave={() => { if (!isTouchDevice) setIsExpanded(false); }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary">
            {t(experience.roleKey)}
          </h3>
          <p className="text-text-secondary font-sans">
            {t(experience.companyKey)} · {t(experience.locationKey)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <p className="text-text-secondary font-mono text-sm">
            {t(experience.timelineKey)}
          </p>
          {/* Mobile-only expand indicator — hidden on md+ where hover takes over */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={"md:hidden text-zinc-400 transition-transform duration-300 " + (isExpanded ? "rotate-180" : "rotate-0")}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <p className="text-text-secondary font-sans mb-4 leading-relaxed">
        {t(experience.summaryKey)}
      </p>

      {/* CSS grid trick: grid-rows 0fr → 1fr animates height without fixed px */}
      <div
        className={"grid transition-all duration-300 ease-out " + (isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2 pb-1">
            {experience.achievementKeys.map((key, i) => {
              return (
                <li
                  key={i}
                  className="text-text-secondary font-sans leading-relaxed list-disc list-inside"
                >
                  {t(key)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
