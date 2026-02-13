import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import MenuOverlay from '../Menu/MenuOverlay';


/* ─────────────────────────────────────────────────────────────────────────────
   Scroll lock helpers
   ─────────────────────────────────────────────────────────────────────────── */
let scrollY = 0;

function lockScroll() {
  scrollY = window.scrollY;
  document.body.classList.add('menu-open');
  document.body.style.top = `-${scrollY}px`;
}

function unlockScroll() {
  document.body.classList.remove('menu-open');
  document.body.style.top = '';
  window.scrollTo({ top: scrollY, behavior: 'instant' });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Burger icon — three lines that morph to X via CSS
   ─────────────────────────────────────────────────────────────────────────── */
const BurgerIcon = ({ isOpen }) => (
  <span aria-hidden="true" className="burger-icon-wrap">
    <span
      className={`burger-line ${isOpen ? 'burger-line--top-open' : 'burger-line--top'}`}
    />
    <span
      className={`burger-line ${isOpen ? 'burger-line--mid-open' : 'burger-line--mid'}`}
    />
    <span
      className={`burger-line ${isOpen ? 'burger-line--bot-open' : 'burger-line--bot'}`}
    />

    {/* Inline keyframe styles for the morphing animation */}
    <style>{`
      .burger-icon-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 22px;
        height: 22px;
      }
      .burger-line {
        display: block;
        width: 22px;
        height: 2px;
        background: white;
        border-radius: 2px;
        transform-origin: center center;
        transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                    opacity 0.2s ease;
      }
      .burger-line--top-open {
        transform: translateY(7px) rotate(45deg);
      }
      .burger-line--mid-open {
        opacity: 0;
        transform: scaleX(0);
      }
      .burger-line--bot-open {
        transform: translateY(-7px) rotate(-45deg);
      }
    `}</style>
  </span>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Navbar
   ─────────────────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [isMenuOpen,     setIsMenuOpen]     = useState(false);
  const [isLangOpen,     setIsLangOpen]     = useState(false);
  const [isScrolled,     setIsScrolled]     = useState(false);
  const langMenuRef = useRef(null);
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) ?? languages[0];

  /* ── Scroll detection ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    // passive: true — never blocks scrolling
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close lang menu on outside click ────────────────────────────────── */
  useEffect(() => {
    if (!isLangOpen) return;
    const handler = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [isLangOpen]);

  /* ── Menu toggle with scroll lock ────────────────────────────────────── */
  const openMenu = useCallback(() => {
    lockScroll();
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    unlockScroll();
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    isMenuOpen ? closeMenu() : openMenu();
  }, [isMenuOpen, openMenu, closeMenu]);

  /* ── Language change ──────────────────────────────────────────────────── */
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <>
      {/*
        z-index: 999 — sits below MenuOverlay (998) but above all page content.
        We do NOT use mix-blend-mode on the nav root because it breaks
        backdrop-filter in Safari when the blend mode is applied to the
        same element — keep blend modes on child text only if needed.
      */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          isScrolled ? 'navbar-scrolled' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <a
              href="#home"
              className="text-xl sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-white select-none"
              aria-label="Go to top"
            >
              DIGITAL
            </a>

            {/* Controls */}
            <div className="flex items-center gap-3">

              {/* Language Selector */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             border border-white/20 hover:border-white/50
                             text-sm font-medium text-white
                             transition-colors duration-200
                             focus-visible:outline-2 focus-visible:outline-offset-2"
                  aria-haspopup="listbox"
                  aria-expanded={isLangOpen}
                  aria-label="Select language"
                >
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{currentLang.label}</span>
                </button>

                {isLangOpen && (
                  <ul
                    role="listbox"
                    aria-label="Languages"
                    className="absolute right-0 mt-2 w-28 py-1 rounded-xl
                               border border-white/10 bg-[#0f0f0f]
                               shadow-lg shadow-black/60"
                  >
                    {languages.map((lang) => (
                      <li key={lang.code} role="option" aria-selected={i18n.language === lang.code}>
                        <button
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                            i18n.language === lang.code
                              ? 'text-[#00d9ff] font-semibold'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {lang.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Burger Button */}
              <button
                onClick={toggleMenu}
                className="relative w-11 h-11 rounded-full
                           border border-white/20 hover:border-white/50
                           flex items-center justify-center
                           transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="main-menu-overlay"
              >
                <BurgerIcon isOpen={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <MenuOverlay
        id="main-menu-overlay"
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </>
  );
};

export default Navbar;
