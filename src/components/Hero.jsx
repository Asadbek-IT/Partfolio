import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
  Hero — Performance notes
  ────────────────────────
  1. Text reveals use yPercent: 100 → 0 inside overflow:hidden (.line-clip)
     containers.  This is compositor-only (no paint, no layout) and avoids
     the sub-pixel antialiasing flicker that rotationX causes on Chrome/
     Android at small font sizes.

  2. Mouse parallax uses a single requestAnimationFrame loop that reads
     a target position and lerps toward it.  We never call gsap.to() inside
     mousemove — that would create thousands of tweens per second.

  3. force3D: true on every tween ensures a compositing layer is created
     immediately instead of being promoted/demoted mid-animation (which
     causes a repaint).

  4. The scroll parallax is scrub-based, transform-only, on a wrapper div
     ABOVE the text — so the text itself doesn't repaint during scroll.
*/

const TITLE_LINES = ['Digital', 'Craftsmen'];
const STATS = [
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients'  },
  { value: '5+',  label: 'Years'    },
  { value: '12+', label: 'Tech'     },
];

const Hero = () => {
  const { t } = useTranslation();

  const sectionRef   = useRef(null);
  const wrapperRef   = useRef(null);   // parallax wrapper on scroll
  const lineRefs     = useRef([]);     // inner text elements (not the clip)
  const subtitleRef  = useRef(null);
  const ctaRef       = useRef(null);
  const statsRef     = useRef(null);
  const scrollIndRef = useRef(null);
  const orbsRef      = useRef(null);   // mouse parallax target

  // Mouse lerp state — lives in a ref so it never triggers re-render
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0, rafId: null });

  /* ── GSAP intro + scroll parallax ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines    = lineRefs.current.filter(Boolean);
      const subtitle = subtitleRef.current;
      const cta      = ctaRef.current;
      const stats    = statsRef.current;
      const scrollInd = scrollIndRef.current;

      // Set starting state — force3D promotes GPU layer immediately
      gsap.set(lines,    { yPercent: 110, force3D: true });
      gsap.set(subtitle, { y: 40, opacity: 0, force3D: true });
      gsap.set(cta,      { y: 30, opacity: 0, force3D: true });
      gsap.set(stats,    { y: 30, opacity: 0, force3D: true });
      gsap.set(scrollInd,{ y: -15, opacity: 0, force3D: true });

      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: 'power4.out', force3D: true },
      });

      tl
        // Lines clip up — parent overflow:hidden makes them "wipe in"
        .to(lines, {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.12,
        })
        .to(subtitle, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
        .to(cta,      { y: 0, opacity: 1, duration: 0.7 }, '-=0.55')
        .to(stats,    { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .to(scrollInd,{ y: 0, opacity: 1, duration: 0.5 }, '-=0.3');

      // Looping bounce on scroll indicator
      gsap.to(scrollInd, {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        force3D: true,
        delay: 1.5,
      });

      // Scroll parallax — moves the WRAPPER (not text) so text doesn't repaint
      gsap.to(wrapperRef.current, {
        yPercent: 25,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Mouse parallax — RAF lerp, never inside the event handler ─────────── */
  const startMouseParallax = useCallback(() => {
    // Only on non-touch devices — matchMedia is cheaper than a ref check
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const m = mouse.current;

    const onMove = (e) => {
      // Store target position normalised to ±1
      m.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      m.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      m.rafId = requestAnimationFrame(tick);
      if (!orbsRef.current) return;

      // Lerp current toward target (smoothing factor 0.07)
      m.x += (m.tx - m.x) * 0.07;
      m.y += (m.ty - m.y) * 0.07;

      // Apply: max ±20px movement, GPU transform only
      gsap.set(orbsRef.current, {
        x: m.x * 20,
        y: m.y * 20,
        force3D: true,
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    m.rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(m.rafId);
    };
  }, []);

  useEffect(() => {
    const cleanup = startMouseParallax();
    return cleanup;
  }, [startMouseParallax]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-5 sm:px-8 lg:px-12"
    >
      {/* Decorative orbs — mouse parallax target */}
      <div
        ref={orbsRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96
                        rounded-full bg-[#00d9ff]/8 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96
                        rounded-full bg-[#4f46e5]/8 blur-[80px]" />
      </div>

      {/* Scroll parallax wrapper — only this moves, text stays in it */}
      <div ref={wrapperRef} className="relative z-10 w-full max-w-7xl mx-auto"
           style={{ willChange: 'transform' }}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <div className="mb-6 sm:mb-10">
          {TITLE_LINES.map((line, i) => (
            /*
              .line-clip = overflow:hidden — the inner h1 starts below
              this boundary and slides up into view.
              Explicit line-height is set so the clip has a stable height
              and doesn't cause CLS.
            */
            <div key={line} className="line-clip" style={{ lineHeight: 1 }}>
              <h1
                ref={(el) => (lineRefs.current[i] = el)}
                className="font-display font-bold tracking-tight text-white text-glow-hover
                           leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 10.5vw, 9rem)',
                  willChange: 'transform',
                }}
              >
                {line}
              </h1>
            </div>
          ))}
        </div>

        {/* ── Subtitle ──────────────────────────────────────────────────── */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-2xl lg:text-3xl font-light text-white/60
                     max-w-2xl mb-10 sm:mb-14"
          style={{ willChange: 'transform' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div ref={ctaRef} style={{ willChange: 'transform' }}>
          <button className="btn-primary text-base sm:text-lg text-white">
            {t('hero.cta')}
          </button>
        </div>

        {/* ── Stats grid ────────────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-16 sm:mt-24 lg:mt-32"
          style={{ willChange: 'transform' }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-left">
              <div
                className="font-display font-bold clip-text mb-1 leading-none"
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                  background: 'linear-gradient(135deg, #00d9ff 0%, #4f46e5 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </div>
              <div className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div
        ref={scrollIndRef}
        aria-hidden="true"
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-3"
        style={{ willChange: 'transform' }}
      >
        <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
          {t('hero.scroll')}
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20
                        flex justify-center items-start pt-1.5">
          <ArrowDown className="w-2.5 h-2.5 text-white/30" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
