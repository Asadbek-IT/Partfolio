import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useLenis — Production-grade smooth scroll hook.
 *
 * Strategy:
 * - Desktop (pointer: fine)  → Lenis enabled, synced to GSAP ticker.
 * - Mobile  (pointer: coarse) → Lenis SKIPPED entirely. Native scroll runs
 *   at 60/120 Hz, so we just keep ScrollTrigger alive via a lightweight
 *   requestAnimationFrame loop that calls ScrollTrigger.update().
 *
 * Why not just set smoothTouch: false?
 * Lenis still attaches event listeners and runs its RAF loop even when
 * smoothTouch is off, which adds overhead. On low-end Android devices this
 * alone can cause jank. Fully skipping it is the only correct approach.
 */
export function useLenis() {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // Detect touch-primary device (phones, tablets).
    // `pointer: fine` means mouse/stylus → use Lenis.
    // `pointer: coarse` means finger → native scroll only.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouchDevice) {
      // ── Desktop: full Lenis smooth scroll ─────────────────────────────────
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0, // never smooth-scroll on touch even if somehow reached
        infinite: false,
      });

      lenisRef.current = lenis;

      // Bridge Lenis → ScrollTrigger so scrub animations stay in sync.
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP's own ticker so Lenis runs in the same animation frame
      // as all GSAP tweens — no double-RAF, no drift.
      const tickerCb = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0); // don't skip frames on tab switch

      return () => {
        lenis.off('scroll', ScrollTrigger.update);
        gsap.ticker.remove(tickerCb);
        lenis.destroy();
        lenisRef.current = null;
      };
    } else {
      // ── Mobile: native scroll + lightweight ScrollTrigger sync ────────────
      // ScrollTrigger needs scroll position updates when we're NOT using
      // Lenis. A simple RAF loop that calls ScrollTrigger.update() is enough
      // and costs almost nothing.
      const syncScrollTrigger = () => {
        ScrollTrigger.update();
        rafIdRef.current = requestAnimationFrame(syncScrollTrigger);
      };
      rafIdRef.current = requestAnimationFrame(syncScrollTrigger);

      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }
  }, []); // run once on mount

  return lenisRef; // expose ref if parent needs to call lenis.scrollTo(…)
}
