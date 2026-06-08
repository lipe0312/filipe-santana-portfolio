"use client";

import { useRef, useState } from "react";
import type { ComponentType } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/context/LanguageContext";

// ─── Flag SVGs ────────────────────────────────────────────────────────────────

function FlagUS() {
  return (
    <svg viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="20" height="13" fill="#B22234" />
      <rect y="1" width="20" height="1" fill="#fff" />
      <rect y="3" width="20" height="1" fill="#fff" />
      <rect y="5" width="20" height="1" fill="#fff" />
      <rect y="7" width="20" height="1" fill="#fff" />
      <rect y="9" width="20" height="1" fill="#fff" />
      <rect y="11" width="20" height="1" fill="#fff" />
      <rect width="8" height="7" fill="#3C3B6E" />
    </svg>
  );
}

function FlagBR() {
  return (
    <svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="20" height="14" fill="#009c3b" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3.5" fill="#002776" />
    </svg>
  );
}

// ─── Config ───────────────────────────────────────────────────────────────────

type LangConfig = {
  code: Language;
  label: string;
  Flag: ComponentType;
  ariaLabel: string;
};

const LANGUAGES: LangConfig[] = [
  { code: "en", label: "EN", Flag: FlagUS, ariaLabel: "Switch to English" },
  { code: "pt", label: "PT", Flag: FlagBR, ariaLabel: "Mudar para Português" },
];

// ─── Dropdown Language Switcher (TopBar) ──────────────────────────────────────

interface Props {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: Props) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const active = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const others = LANGUAGES.filter((l) => l.code !== language);

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setIsOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger: active language only */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={active.ariaLabel}
        className="group flex items-center gap-1.5 cursor-pointer"
      >
        {/* Flag — always full color */}
        <span
          className={
            "block rounded-[2px] overflow-hidden shrink-0 " +
            (compact ? "w-[18px] h-[12px]" : "w-[20px] h-[13px]")
          }
        >
          <active.Flag />
        </span>

        {/* Label + chevron — non-compact (desktop) only */}
        {!compact && (
          <>
            {/* Sliding text — slides UP out, new slides UP in from below */}
            <span className="relative inline-flex items-center overflow-hidden">
              <span aria-hidden="true" className="select-none opacity-0 text-[11px] font-medium tracking-[0.08em]">
                {active.label}
              </span>
              <span className="absolute inset-0 flex items-center text-text-primary text-[11px] font-medium tracking-[0.08em] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {active.label}
              </span>
              <span className="absolute inset-0 flex items-center text-text-primary text-[11px] font-medium tracking-[0.08em] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                {active.label}
              </span>
            </span>

            {/* Chevron */}
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                "w-3 h-3 text-text-secondary shrink-0 transition-transform duration-200 " +
                (isOpen ? "rotate-180" : "rotate-0")
              }
            >
              <path d="M2 4l4 4 4-4" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown panel — pt-2 bridges the hover gap so cursor stays within the group */}
      <div
        className={
          "absolute z-50 top-full pt-2 transition-all duration-200 ease-out " +
          (compact ? "right-0" : "left-0") +
          " " +
          (isOpen
            ? "visible opacity-100 translate-y-0 pointer-events-auto"
            : "invisible opacity-0 -translate-y-2 pointer-events-none")
        }
      >
        <ul
          role="listbox"
          aria-label="Select language"
          className="bg-white border border-zinc-100 shadow-xl rounded-lg py-1.5 min-w-[90px] overflow-hidden"
        >
          {others.map(({ code, label, Flag, ariaLabel }) => (
            <li key={code} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => handleSelect(code)}
                aria-label={ariaLabel}
                className="group flex items-center gap-2 w-full px-3 py-2 hover:bg-zinc-50 transition-colors duration-150 cursor-pointer"
              >
                {/* Flag — grayscale until hover */}
                <span className="block rounded-[2px] overflow-hidden shrink-0 w-[18px] h-[12px] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Flag />
                </span>

                {/* Sliding text — dark colors for light dropdown bg */}
                <span className="relative inline-flex items-center overflow-hidden">
                  <span aria-hidden="true" className="select-none opacity-0 text-[11px] font-medium tracking-[0.08em]">
                    {label}
                  </span>
                  <span className="absolute inset-0 flex items-center text-zinc-500 text-[11px] font-medium tracking-[0.08em] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {label}
                  </span>
                  <span className="absolute inset-0 flex items-center text-zinc-800 text-[11px] font-medium tracking-[0.08em] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    {label}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Inline Picker (Mobile Overlay) ───────────────────────────────────────────
// Used inside the full-screen nav overlay where a dropdown would be clipped.

export function MobileLangPicker() {
  const { language, setLanguage } = useLanguage();

  return (
    <div role="group" aria-label="Language selector" className="flex items-center gap-5">
      {LANGUAGES.map(({ code, label, Flag, ariaLabel }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
          >
            {/* Flag */}
            <span
              className={
                "block rounded-[2px] overflow-hidden w-[22px] h-[14px] transition-all duration-300 " +
                (isActive
                  ? "grayscale-0 opacity-100"
                  : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100")
              }
            >
              <Flag />
            </span>

            {/* Static label */}
            <span
              className={
                "text-[10px] font-medium tracking-[0.1em] transition-colors duration-200 " +
                (isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary")
              }
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}