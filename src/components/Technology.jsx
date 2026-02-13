import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
  Technology — Performance notes
  ──────────────────────────────
  • The marquee now uses a pure CSS keyframe animation defined in index.css
    (.marquee-track).  This runs 100% on the compositor thread — zero JS
    cost per frame.  The old GSAP approach created one tween that ran
    gsap.to(x) every tick, which still required JS evaluation.

  • We duplicate the array once (×2) so the strip is twice as wide as
    the viewport, then translate by -50% so the seam is invisible.

  • Each icon container uses `aspect-ratio: 1 / 1` (explicit) to prevent
    layout shift during font loading.

  • Section reveal uses a single ScrollTrigger fromTo — no scrub so it
    doesn't stay active and waste resources after it has played.
*/

const TECHNOLOGIES = [
  { name: 'React',      color: '#61DAFB' },
  { name: 'Vue.js',     color: '#4FC08D' },
  { name: 'Node.js',    color: '#339933' },
  { name: 'Python',     color: '#3776AB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Next.js',    color: '#EDEDED' },
  { name: 'Tailwind',   color: '#06B6D4' },
  { name: 'GraphQL',    color: '#E10098' },
  { name: 'MongoDB',    color: '#47A248' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker',     color: '#2496ED' },
  { name: 'AWS',        color: '#FF9900' },
];

const STATS = [
  { value: '12+',  label: 'Technologies',  grad: 'from-[#00d9ff] to-[#4f46e5]' },
  { value: '100%', label: 'Modern Stack',  grad: 'from-[#4f46e5] to-[#8b5cf6]' },
  { value: '24/7', label: 'Support',       grad: 'from-[#8b5cf6] to-[#ec4899]' },
];

const Technology = () => {
  const { t }       = useTranslation();
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const statsRef    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal — play once, no scrub
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none', // fire once
          },
        }
      );

      // Stats stagger reveal
      gsap.fromTo(
        statsRef.current.filter(Boolean),
        { y: 40, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: statsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate once → CSS animation translates -50% for seamless loop
  const allTechs = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div ref={headingRef} className="mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-medium text-[#00d9ff] uppercase tracking-[0.2em] mb-4">
            Tools We Master
          </p>
          <h2
            className="font-display font-bold text-white text-glow-hover"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            {t('technology.title')}
          </h2>
        </div>
      </div>

      {/* ── Pure CSS Marquee ───────────────────────────────────────────────── */}
      {/*
        The outer wrapper is full-bleed (no max-w) and clips overflow.
        Gradient overlays are CSS-only — pointer-events:none so they don't
        block the hover pause on the marquee track.
      */}
      <div className="relative overflow-hidden py-4">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10"
          style={{ background: 'linear-gradient(to right, #050505, transparent)' }}
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10"
          style={{ background: 'linear-gradient(to left, #050505, transparent)' }}
          aria-hidden="true"
        />

        {/*
          .marquee-track is defined in index.css.
          It uses `animation: marquee-scroll 40s linear infinite`
          and pauses on hover — pure CSS, zero JS per frame.
        */}
        <div className="marquee-track">
          {allTechs.map((tech, i) => (
            <div
              key={i}
              className="luxury-card flex items-center gap-3 sm:gap-4
                         px-5 sm:px-8 py-3 sm:py-5 shrink-0"
              aria-hidden={i >= TECHNOLOGIES.length ? 'true' : undefined}
            >
              {/* Icon circle — explicit aspect-ratio prevents height collapse */}
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: 'clamp(2rem, 3.5vw, 3rem)',
                  aspectRatio: '1 / 1',
                  backgroundColor: tech.color,
                }}
                aria-hidden="true"
              >
                <span className="text-white font-bold" style={{ fontSize: '0.65em' }}>
                  {tech.name.charAt(0)}
                </span>
              </div>

              <span
                className="font-display font-semibold text-white whitespace-nowrap"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.25rem)' }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 mt-16 sm:mt-24">
          {STATS.map(({ value, label, grad }, i) => (
            <div
              key={label}
              ref={(el) => (statsRef.current[i] = el)}
              className="luxury-card p-6 sm:p-10 text-center"
              style={{ willChange: 'transform' }}
            >
              <div
                className="font-display font-bold mb-2 leading-none"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                }}
              >
                <span
                  style={{
                    background: `linear-gradient(135deg, ${grad.includes('00d9ff') ? '#00d9ff' : grad.includes('4f46e5') && !grad.includes('8b5cf6') ? '#4f46e5' : '#8b5cf6'}, ${grad.includes('4f46e5') && grad.startsWith('from-[#00d9ff]') ? '#4f46e5' : grad.includes('8b5cf6') ? '#8b5cf6' : '#ec4899'})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {value}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
