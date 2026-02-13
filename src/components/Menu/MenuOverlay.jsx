import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

/*
  MenuOverlay — full-screen navigation panel.

  Layout contract:
  • position: fixed, top:0, left:0, width:100vw, height:100vh  (see .menu-overlay in CSS)
  • z-index: 998  — above aurora (0) and page content (1), below navbar (999)

  Visibility contract:
  • We manage opacity and transform via GSAP, NOT display:none/flex toggling.
  • display:none breaks GSAP measurement (getBoundingClientRect returns zeros).
  • Instead: visibility is toggled via the .is-open class + pointer-events.
    opacity:0 + pointer-events:none means the element exists in the DOM but
    is invisible and non-interactive — no flash, no layout shift.

  Animation strategy:
  • Overlay slides in from the top (y: -100% → y: 0) — pure transform, no paint.
  • Links clip upward using a .line-clip overflow:hidden wrapper.
  • A single GSAP context is used and reverted on unmount.
  • The same timeline instance is stored in a ref — calling .reverse() on it
    is far cheaper than building a new reverse timeline each time.
*/

const NAV_ITEMS = (t) => [
  { label: t('nav.home'),       href: '#home'       },
  { label: t('nav.services'),   href: '#services'   },
  { label: t('nav.technology'), href: '#technology' },
  { label: t('nav.team'),       href: '#team'       },
  { label: t('nav.contact'),    href: '#contact'    },
];

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter',  href: '#' },
  { label: 'Dribbble', href: '#' },
];

const MenuOverlay = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation();

  const overlayRef   = useRef(null);
  const itemsRef     = useRef([]);
  const socialsRef   = useRef([]);
  const dividerRef   = useRef(null);
  const tlRef        = useRef(null);      // stores the GSAP timeline
  const ctxRef       = useRef(null);      // stores the GSAP context for cleanup

  const navItems = NAV_ITEMS(t);

  /* ── Build timeline once after mount ───────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const overlay = overlayRef.current;

      // Filter out any null refs (React may leave gaps during dev HMR)
      const items   = itemsRef.current.filter(Boolean);
      const socials = socialsRef.current.filter(Boolean);

      // Set initial state — no flash on first render
      gsap.set(overlay, { y: '-100%', opacity: 0 });
      gsap.set(items,   { yPercent: 110 });
      gsap.set(socials, { opacity: 0, y: 12 });
      if (dividerRef.current) gsap.set(dividerRef.current, { scaleX: 0 });

      // Build the open timeline but keep it paused
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tl
        // 1. Overlay slides down from above
        .to(overlay, {
          y: '0%',
          opacity: 1,
          duration: 0.55,
          ease: 'power4.out',
          force3D: true,
        })
        // 2. Nav items clip up from their container
        .to(items, {
          yPercent: 0,
          duration: 0.65,
          stagger: 0.08,
          force3D: true,
        }, '-=0.25')
        // 3. Divider line scales in
        .to(dividerRef.current, {
          scaleX: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.4')
        // 4. Social links fade up
        .to(socials, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
        }, '-=0.3');

      tlRef.current  = tl;
    });

    ctxRef.current = ctx;

    return () => ctx.revert(); // full cleanup: kills all tweens, restores props
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Play / reverse on isOpen change ───────────────────────────────────── */
  useEffect(() => {
    if (!tlRef.current) return;

    if (isOpen) {
      // Add class so CSS enables pointer-events and visibility
      overlayRef.current?.classList.add('is-open');
      tlRef.current.play();
    } else {
      tlRef.current.reverse().then(() => {
        // Remove class only after reverse animation completes
        overlayRef.current?.classList.remove('is-open');
      });
    }
  }, [isOpen]);

  /* ── Keyboard escape to close ───────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* ── Handle nav link click ─────────────────────────────────────────────── */
  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault();
    onClose();
    // Wait for reverse animation (~600ms) then scroll
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 650);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      id={id}
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* ── Background accent orbs ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-[#4f46e5] opacity-[0.06] blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full
                        bg-[#00d9ff] opacity-[0.05] blur-[100px]" />
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center items-start
                      w-full h-full px-6 sm:px-12 lg:px-20 xl:px-32
                      max-w-screen-xl mx-auto">

        {/* Nav links */}
        <nav aria-label="Main menu" className="mb-10 sm:mb-14">
          <ul className="space-y-2 sm:space-y-3">
            {navItems.map((item, i) => (
              <li key={item.href}>
                {/*
                  .line-clip clips the inner element so it slides in from
                  below without overflowing — gives the "mask reveal" feel.
                */}
                <div className="line-clip">
                  <a
                    ref={(el) => (itemsRef.current[i] = el)}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="group inline-flex items-center gap-3
                               text-[clamp(2.4rem,8vw,6rem)]
                               font-display font-bold leading-none tracking-tight
                               text-white text-glow-hover
                               transition-opacity duration-200
                               will-change-[opacity]"
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.label}
                    <ArrowUpRight
                      className="w-[0.6em] h-[0.6em] opacity-0
                                 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1
                                 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div
          ref={dividerRef}
          aria-hidden="true"
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent
                     mb-8 origin-left"
        />

        {/* Social links */}
        <div className="flex flex-wrap gap-6 sm:gap-8">
          {SOCIAL_LINKS.map((s, i) => (
            <a
              key={s.label}
              ref={(el) => (socialsRef.current[i] = el)}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-medium text-white/40
                         hover:text-[#00d9ff] transition-colors duration-200"
              tabIndex={isOpen ? 0 : -1}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px
                   bg-gradient-to-r from-transparent via-[#00d9ff]/40 to-transparent"
      />
    </div>
  );
};

export default MenuOverlay;
