import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const MenuOverlay = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const overlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const closeButtonRef = useRef(null);
  const socialLinksRef = useRef([]);

  const menuItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.technology'), href: '#technology' },
    { name: t('nav.team'), href: '#team' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Dribbble', href: '#' },
  ];

  useEffect(() => {
    const overlay = overlayRef.current;
    const menuLinks = menuLinksRef.current;
    const closeButton = closeButtonRef.current;
    const socials = socialLinksRef.current;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Opening animation
      const tl = gsap.timeline();

      tl.set(overlay, { display: 'flex' })
        .to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        .fromTo(
          menuLinks,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .fromTo(
          closeButton,
          {
            rotation: -90,
            opacity: 0,
          },
          {
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        )
        .fromTo(
          socials,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    } else {
      // Closing animation
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto';
        },
      });

      tl.to(menuLinks, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
      })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          },
          '-=0.2'
        )
        .set(overlay, { display: 'none' });
    }
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onClose();
    
    // Wait for menu to close, then scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden opacity-0 bg-gradient-to-br from-dark via-dark-lighter to-dark"
      style={{ display: 'none' }}
    >
      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-6 right-6 lg:top-12 lg:right-12 w-14 h-14 rounded-full border border-white/20 hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all flex items-center justify-center group"
        aria-label="Close menu"
      >
        <X className="w-6 h-6 text-white group-hover:text-accent-cyan transition-colors" />
      </button>

      {/* Menu Content */}
      <div className="flex flex-col justify-center items-center h-full px-6 lg:px-12">
        {/* Main Navigation */}
        <nav className="mb-16">
          <ul className="space-y-4 lg:space-y-6">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                ref={(el) => (menuLinksRef.current[index] = el)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="group relative inline-block text-5xl sm:text-6xl lg:text-8xl font-display font-bold text-glow-hover"
                >
                  <span className="relative z-10">{item.name}</span>
                  <ArrowUpRight className="inline-block w-8 h-8 lg:w-12 lg:h-12 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex flex-wrap gap-6 justify-center">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              ref={(el) => (socialLinksRef.current[index] = el)}
              href={social.href}
              className="text-sm lg:text-base font-medium text-white/50 hover:text-accent-cyan transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
    </div>
  );
};

export default MenuOverlay;
