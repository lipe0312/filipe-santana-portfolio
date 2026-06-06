"use client";
import { useEffect, useRef } from "react";

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(function() {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let started = false;
    let rafId = 0;

    const tick = function() {
      currentX = currentX + (targetX - currentX) * 0.12;
      currentY = currentY + (targetY - currentY) * 0.12;
      // 32px element — offset by 16 to keep centre on the hot-spot
      cursor.style.transform = "translate(" + (currentX - 16) + "px, " + (currentY - 16) + "px)";
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = function(e: MouseEvent) {
      if (!started) {
        currentX = e.clientX;
        currentY = e.clientY;
        started = true;
        cursor.style.opacity = "1";
      }
      targetX = e.clientX;
      targetY = e.clientY;
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return function() {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        border: "1.5px solid rgba(113, 113, 122, 0.8)",
        background: "transparent",
        willChange: "transform",
        opacity: 0,
        transition: "opacity 400ms ease-out",
      }}
    />
  );
}
