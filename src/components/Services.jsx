import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Palette, Smartphone, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
  Services — stacking card effect via ScrollTrigger scrub.

  Layout fix vs old version:
  • Cards use `position: sticky` (not absolute + spacer hack) which is the
    correct CSS-native approach for stacking scroll effects.  The browser
    handles the geometry — no JS math required.
  • Each card has an explicit zIndex so later cards correctly cover earlier
    ones without z-index racing.
  • Icon containers have `aspect-ratio: 1 / 1` to prevent CLS.

  Animation:
  • Entrance: opacity + translateY, force3D.
  • Stack push: scale only (translateY caused position jitter on iOS).
  • No section pin — sticky positioning achieves the same effect without
    the ScrollTrigger pin overhead, which is expensive on mobile.
*/

const SERVICES = (t) => [
  {
    Icon: Code2,
    title: t('services.web.title'),
    desc:  t('services.web.desc'),
    grad:  'from-[#00d9ff] to-[#4f46e5]',
    num:   '01',
  },
  {
    Icon: Palette,
    title: t('services.design.title'),
    desc:  t('services.design.desc'),
    grad:  'from-[#4f46e5] to-[#8b5cf6]',
    num:   '02',
  },
  {
    Icon: Smartphone,
    title: t('services.mobile.title'),
    desc:  t('services.mobile.desc'),
    grad:  'from-[#8b5cf6] to-[#ec4899]',
    num:   '03',
  },
  {
    Icon: Lightbulb,
    title: t('services.consulting.title'),
    desc:  t('services.consulting.desc'),
    grad:  'from-[#ec4899] to-[#00d9ff]',
    num:   '04',
  },
];

const Services = () => {
  const { t } = useTranslation();
  const sectionRef  = useRef(null);
  const cardsRef    = useRef([]);

  const services = SERVICES(t);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        // Entrance animation
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, force3D: true },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Scale-down for cards that get "pushed back" by the next card
        // Only applies to cards that are NOT the last one
        if (i < cards.length - 1) {
          const scaleTarget = 0.97 - i * 0.01; // 0.96, 0.95, 0.94
          gsap.to(card, {
            scale: scaleTarget,
            opacity: 0.6,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1], // triggered when NEXT card enters
              start: 'top 60%',
              end: 'top 30%',
              scrub: 1.5,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 sm:py-32 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <p className="text-xs sm:text-sm font-medium text-[#00d9ff] uppercase tracking-[0.2em] mb-4">
            What We Do
          </p>
          <h2
            className="font-display font-bold text-white text-glow-hover"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            {t('services.title')}
          </h2>
        </div>

        {/* Cards — stacked via sticky */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {services.map(({ Icon, title, desc, grad, num }, i) => (
            <div
              key={num}
              ref={(el) => (cardsRef.current[i] = el)}
              className="sticky luxury-card p-6 sm:p-10 lg:p-12"
              style={{
                top: `${80 + i * 20}px`,   /* staggered sticky offset */
                zIndex: 10 + i,            /* later cards sit on top  */
                willChange: 'transform, opacity',
              }}
            >
              {/* CSS Grid layout — no flex wrapping issues on mobile */}
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: 'auto 1fr auto' }}
              >
                {/* Icon — explicit aspect-ratio prevents CLS */}
                <div
                  className={`rounded-xl sm:rounded-2xl bg-gradient-to-br ${grad}
                              flex items-center justify-center shrink-0`}
                  style={{ width: 'clamp(3rem, 5vw, 5rem)', aspectRatio: '1 / 1' }}
                >
                  <Icon
                    className="text-white"
                    style={{ width: '45%', height: '45%' }}
                    aria-hidden="true"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3
                    className="font-display font-bold text-white mb-2 sm:mb-3 leading-tight"
                    style={{ fontSize: 'clamp(1.1rem, 3vw, 1.9rem)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Number — decorative, hidden on small screens */}
                <div
                  className="hidden sm:block font-display font-bold text-white/[0.04] shrink-0 leading-none select-none"
                  style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
                  aria-hidden="true"
                >
                  {num}
                </div>
              </div>

              {/* Gradient bottom line */}
              <div className={`mt-6 sm:mt-8 h-px bg-gradient-to-r ${grad} rounded-full opacity-60`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
