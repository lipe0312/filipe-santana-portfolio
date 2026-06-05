# Review Report: Hero & Static Content Sections

## Overview
This review covers the implementation of the Experience timeline, Contact section, and page integration as documented in the handoff file. We found critical bugs related to the Top Bar navigation order and Hero section loading.

## Audit Findings

### Aesthetic & Design System
✅ No deviations from design system colors or typography found.
✅ No unauthorized hex codes used.

### Motion & Interactions
✅ Scroll reveals follow specification (fade + translateY).
✅ Hero section uses opacity-only fade as required.

### Performance & DOM
✅ No heavy synchronous assets found.
✅ All sections use proper semantic tags.

### Critical Resilience Checks

1. **Top Bar Navigation Order (Regression)**: ❌ **Critical Bug**
   - The navigation links in both `TopBar.tsx` and `MobileNav.tsx` are still in the wrong order.
   - Current order: `Experience` → `Projects` → `About` → `Gallery` → `Contact`
   - Required order: `Projects` → `Experience` → `About` → `Gallery` → `Contact`

2. **Hero Section Loading**: ❌ **Critical Bug**
   - The `isLoaded` state may not be set correctly in some cases (e.g., when React hydrates after DOMContentLoaded).
   - Suggest using `useEffect` with `requestAnimationFrame` as a fallback to ensure the state is set.

3. **Hardcoded Values**: ✅ No hardcoded values breaking Tailwind scale.

4. **Client/Server Mismatches**: ✅ All client components are correctly marked `"use client"`.

5. **Responsive Breakage**: ✅ Responsive classes look correct for mobile/tablet/desktop.

6. **Accessibility**: ✅ Links have hover states and aria-labels.

## Final Status

**STATUS:** REJECTED

## Actionable Fix Instructions

### 1. Fix Top Bar Navigation Order

**Files to update:**
- `03_source_code/src/components/TopBar.tsx`
- `03_source_code/src/components/MobileNav.tsx`

**Steps:**
1. In both files, reorder the `navLinks` array to:
   ```javascript
   const navLinks = [
     { label: "Projects", href: "#projects" },
     { label: "Experience", href: "#experience" },
     { label: "About", href: "#about" },
     { label: "Gallery", href: "#gallery" },
     { label: "Contact", href: "#contact" },
   ];
   ```

### 2. Fix Hero Section Loading

**File to update:** `03_source_code/src/components/sections/Hero.tsx`

**Steps:**
1. Improve the `useEffect` to ensure `isLoaded` is set even if the DOMContentLoaded event was already fired before the component mounts.
2. Add a fallback using `requestAnimationFrame` to guarantee the state is set:
   ```javascript
   useEffect(() => {
     const handleLoad = () => {
       setIsLoaded(true);
     };

     if (document.readyState === "complete" || document.readyState === "interactive") {
       // Already loaded, set state immediately
       requestAnimationFrame(handleLoad);
     } else {
       window.addEventListener("DOMContentLoaded", handleLoad);
       return () => window.removeEventListener("DOMContentLoaded", handleLoad);
     }
   }, []);
   ```

Please address these fixes and send the updated implementation back for re-review.
