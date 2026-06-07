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

const GALLERY_IMAGES = [
  { src: "/images/_gallery/1.png",  alt: "Photo 1"  },
  { src: "/images/_gallery/2.png",  alt: "Photo 2"  },
  { src: "/images/_gallery/3.png",  alt: "Photo 3"  },
  { src: "/images/_gallery/4.png",  alt: "Photo 4"  },
  { src: "/images/_gallery/6.png",  alt: "Photo 6"  },
  { src: "/images/_gallery/7.png",  alt: "Photo 7"  },
  { src: "/images/_gallery/8.png",  alt: "Photo 8"  },
  { src: "/images/_gallery/9.png",  alt: "Photo 9"  },
  { src: "/images/_gallery/10.png", alt: "Photo 10" },
  { src: "/images/_gallery/11.png", alt: "Photo 11" },
];

// Doubled for seamless marquee loop — translateX(-50%) = exactly one set
const MARQUEE_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

// Fixed height; width stays auto so each image keeps its natural aspect ratio
const DESKTOP_H = 288;

// Mobile: fixed box, object-cover gracefully crops
const MOBILE_W = 240;
const MOBILE_H = 300;

const FADE_MASK: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
};

const IMG_TRANSITION =
  "filter 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const WRAP_TRANSITION =
  "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const MOBILE_IMG_TRANSITION =
  "filter 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export default function Gallery() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  // ── Desktop marquee state ────────────────────────────────────────────────
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // ── Mobile center-snap state ─────────────────────────────────────────────
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      className="bg-white relative overflow-hidden px-6 py-24"
    >
      {/* Top seam cover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent"
      />

      {/* Section header — max-w-5xl mx-auto matches Experience/About exactly */}
      <div
        className={(isVisible ? "reveal is-visible" : "reveal") + " max-w-5xl mx-auto mb-12"}
        style={{ transitionDelay: "0ms" }}
      >
        <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold font-display text-text-primary">
          Gallery
        </h2>
      </div>

      {/* ── Desktop: infinite auto-scroll marquee ───────────────────────────── */}
      {/* -mx-6 breaks out of the section's px-6 to reach full viewport width  */}
      <div
        className="hidden md:block overflow-hidden -mx-6"
        style={FADE_MASK}
        onMouseEnter={function () {
          setIsPaused(true);
        }}
        onMouseLeave={function () {
          setIsPaused(false);
          setHoveredKey(null);
        }}
      >
        <div
          className="gallery-track flex items-end"
          style={{
            gap: "16px",
            width: "max-content",
            paddingLeft: "24px",
            paddingRight: "24px",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {MARQUEE_IMAGES.map(function (img, i) {
            const key = String(i);
            const isHovered = hoveredKey === key;
            return (
              <div
                key={key}
                onMouseEnter={function () {
                  setHoveredKey(key);
                }}
                onMouseLeave={function () {
                  setHoveredKey(null);
                }}
                className="flex-shrink-0 overflow-hidden rounded-xl cursor-pointer bg-zinc-100"
                style={{
                  height: DESKTOP_H + "px",
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                  transition: WRAP_TRANSITION,
                }}
              >
                {/*
                  width={600} height={DESKTOP_H}: hints for next/image optimization.
                  CSS height + w-auto renders at the image's natural aspect ratio —
                  no forced cropping; portrait and landscape both display correctly.
                */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={DESKTOP_H}
                  style={{
                    height: DESKTOP_H + "px",
                    width: "auto",
                    display: "block",
                    filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                    opacity: isHovered ? 1 : 0.72,
                    transition: IMG_TRANSITION,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: horizontal snap scroll, center image turns color ─────────── */}
      <div
        ref={mobileContainerRef}
        className="gallery-mobile md:hidden flex overflow-x-auto -mx-6"
        style={{
          gap: "12px",
          scrollSnapType: "x mandatory",
          paddingLeft: "calc(50% - " + MOBILE_W / 2 + "px)",
          paddingRight: "calc(50% - " + MOBILE_W / 2 + "px)",
        } as CSSProperties}
      >
        {GALLERY_IMAGES.map(function (img, i) {
          const isActive = activeIndex === i;
          return (
            <div
              key={String(i)}
              ref={function (el) {
                itemRefs.current[i] = el;
              }}
              data-index={String(i)}
              className="flex-shrink-0 relative overflow-hidden rounded-xl bg-zinc-100"
              style={{
                width: MOBILE_W + "px",
                height: MOBILE_H + "px",
                scrollSnapAlign: "center",
              } as CSSProperties}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{
                  filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                  opacity: isActive ? 1 : 0.6,
                  transition: MOBILE_IMG_TRANSITION,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom fade into Contact */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}
