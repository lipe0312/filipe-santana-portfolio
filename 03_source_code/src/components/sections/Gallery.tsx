"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useTranslations } from "@/context/LanguageContext";

// ── Types ─────────────────────────────────────────────────────────────────────
type ImageItem = { kind: "image"; src: string; alt: string };
type VideoItem = { kind: "video"; webm: string; mov: string; alt: string };
type GalleryItem = ImageItem | VideoItem;

// ── Data ──────────────────────────────────────────────────────────────────────
// Videos are interspersed so they appear roughly every ~8 items in the loop.
const GALLERY_ITEMS: GalleryItem[] = [
  { kind: "image", src: "/images/_gallery/1.png", alt: "Photo 1" },
  { kind: "image", src: "/images/_gallery/2.png", alt: "Photo 2" },
  { kind: "image", src: "/images/_gallery/3.png", alt: "Photo 3" },
  {
    kind: "video",
    webm: "/videos/_gallery/v1.webm",
    mov: "/videos/_gallery/v1.MOV",
    alt: "Video 1",
  },
  { kind: "image", src: "/images/_gallery/4.png", alt: "Photo 4" },
  { kind: "image", src: "/images/_gallery/6.png", alt: "Photo 6" },
  { kind: "image", src: "/images/_gallery/7.png", alt: "Photo 7" },
  { kind: "image", src: "/images/_gallery/8.png", alt: "Photo 8" },
  { kind: "image", src: "/images/_gallery/9.png", alt: "Photo 9" },
  {
    kind: "video",
    webm: "/videos/_gallery/v2.webm",
    mov: "/videos/_gallery/v2.MOV",
    alt: "Video 2",
  },
  { kind: "image", src: "/images/_gallery/10.png", alt: "Photo 10" },
  { kind: "image", src: "/images/_gallery/11.png", alt: "Photo 11" },
  { kind: "image", src: "/images/_gallery/12.png", alt: "Photo 12" },
  { kind: "image", src: "/images/_gallery/13.png", alt: "Photo 13" },
  { kind: "image", src: "/images/_gallery/14.png", alt: "Photo 14" },
  { kind: "image", src: "/images/_gallery/15.png", alt: "Photo 15" },
  { kind: "image", src: "/images/_gallery/16.png", alt: "Photo 16" },
  { kind: "image", src: "/images/_gallery/17.png", alt: "Photo 17" },
  { kind: "image", src: "/images/_gallery/18.png", alt: "Photo 18" },
  { kind: "image", src: "/images/_gallery/19.png", alt: "Photo 19" },
  { kind: "image", src: "/images/_gallery/20.png", alt: "Photo 20" },
  { kind: "image", src: "/images/_gallery/21.png", alt: "Photo 21" },
  { kind: "image", src: "/images/_gallery/22.png", alt: "Photo 22" },
];

// Doubled so scrollLeft can reset at the halfway point for a seamless loop
const MARQUEE_ITEMS: GalleryItem[] = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

// px per animation frame at ~60fps.
// 0.5px/frame × 60fps × 240s = 7200px per full cycle — sized for this gallery.
const SCROLL_SPEED = 0.5;

const MOBILE_W = 240;
const MOBILE_H = 300;

const FADE_MASK: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Gallery() {
  const t = useTranslations();
  const { ref: sectionRef, isVisible } = useIntersectionObserver();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Refs for RAF / setTimeout closures — avoid stale-closure over React state
  const isPausedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Mobile snap-scroll
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Desktop: auto-scroll + manual scroll harmony ──────────────────────────
  useEffect(function () {
    const container = desktopRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    // Keep scrollLeft inside [0, half) — fires on both auto and manual scroll
    const normalize = function () {
      const half = container.scrollWidth / 2;
      if (half <= 0) return;
      if (container.scrollLeft >= half) container.scrollLeft -= half;
    };

    const tick = function () {
      if (!isPausedRef.current) container.scrollLeft += SCROLL_SPEED;
      rafId = requestAnimationFrame(tick);
    };

    // 3s after the last interaction, resume auto-scroll (unless mouse is still over)
    const scheduleResume = function () {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        if (!isHoveredRef.current) isPausedRef.current = false;
      }, 3000);
    };

    const onWheel = function () {
      isPausedRef.current = true;
      scheduleResume();
    };

    const onTouchStart = function () {
      isPausedRef.current = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };

    const onTouchEnd = function () {
      scheduleResume();
    };

    container.addEventListener("scroll", normalize, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    rafId = requestAnimationFrame(tick);

    return function () {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      container.removeEventListener("scroll", normalize);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mobile: center-image detection ───────────────────────────────────────
  useEffect(function () {
    const container = mobileContainerRef.current;
    if (!container) return;

    const recalc = function () {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      itemRefs.current.forEach(function (item, i) {
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const dist = Math.abs(center - itemCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    recalc();
    container.addEventListener("scroll", recalc, { passive: true });
    return function () {
      container.removeEventListener("scroll", recalc);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="gallery"
      ref={sectionRef as RefObject<HTMLElement>}
      className="bg-white relative overflow-hidden py-24"
    >
      {/* Top seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent"
      />

      {/* Section header */}
      <div
        className={
          (isVisible ? "reveal is-visible" : "reveal") +
          " max-w-5xl mx-auto mb-12 px-6"
        }
        style={{ transitionDelay: "0ms" }}
      >
        <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display text-text-primary">
          {t("nav.gallery")}
        </h2>
      </div>

      {/* ── Desktop: scrollable strip ──────────────────────────────────────────
          Outer div:  FADE_MASK + full-width bleed (-mx-6)
          Inner div:  the actual scroll container (overflow-x-auto, no scrollbar)
          Auto-scroll runs via RAF; trackpad wheel pauses it for 3s then resumes.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block" style={FADE_MASK}>
        <div
          ref={desktopRef}
          className="gallery-desktop overflow-x-auto flex flex-row items-center gap-8"
          style={{ paddingLeft: "24px", paddingRight: "24px" }}
          onMouseEnter={function () {
            isPausedRef.current = true;
            isHoveredRef.current = true;
          }}
          onMouseLeave={function () {
            isPausedRef.current = false;
            isHoveredRef.current = false;
            setHoveredKey(null);
          }}
        >
          {MARQUEE_ITEMS.map(function (item, i) {
            const key = String(i);
            const isHovered = hoveredKey === key;
            const mediaClass =
              "max-h-[400px] w-auto h-auto transition-all duration-700 " +
              (isHovered ? "grayscale-0 scale-[1.02]" : "grayscale scale-100");

            return (
              <div
                key={key}
                onMouseEnter={function () {
                  setHoveredKey(key);
                }}
                onMouseLeave={function () {
                  setHoveredKey(null);
                }}
                className="flex-shrink-0 relative overflow-hidden rounded-xl cursor-pointer"
              >
                {item.kind === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={800}
                    unoptimized
                    className={mediaClass}
                  />
                ) : (
                  <video
                    muted
                    autoPlay
                    loop
                    playsInline
                    aria-label={item.alt}
                    className={mediaClass}
                  >
                    <source src={item.webm} type="video/webm" />
                    <source src={item.mov} type="video/quicktime" />
                  </video>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: horizontal snap scroll ────────────────────────────────────── */}
      <div
        ref={mobileContainerRef}
        className="gallery-mobile md:hidden flex overflow-x-auto"
        style={
          {
            gap: "12px",
            scrollSnapType: "x mandatory",
            paddingLeft: "calc(50% - " + MOBILE_W / 2 + "px)",
            paddingRight: "calc(50% - " + MOBILE_W / 2 + "px)",
          } as CSSProperties
        }
      >
        {GALLERY_ITEMS.map(function (item, i) {
          const isActive = activeIndex === i;
          const mobileClass =
            "absolute inset-0 w-full h-full object-cover transition-all duration-500 " +
            (isActive ? "grayscale-0 opacity-100" : "grayscale opacity-60");

          return (
            <div
              key={String(i)}
              ref={function (el) {
                itemRefs.current[i] = el;
              }}
              data-index={String(i)}
              className="flex-shrink-0 relative overflow-hidden rounded-xl bg-zinc-100"
              style={
                {
                  width: MOBILE_W + "px",
                  height: MOBILE_H + "px",
                  scrollSnapAlign: "center",
                } as CSSProperties
              }
            >
              {item.kind === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="240px"
                  className={mobileClass}
                />
              ) : (
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  aria-label={item.alt}
                  className={mobileClass}
                >
                  <source src={item.webm} type="video/webm" />
                  <source src={item.mov} type="video/quicktime" />
                </video>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}
