import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, ArrowUpRight, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA reveal animation
      gsap.fromTo(
        ctaRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, name: 'GitHub', href: '#' },
    { icon: Linkedin, name: 'LinkedIn', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Dribbble, name: 'Dribbble', href: '#' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Technology', href: '#technology' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <footer id="contact" ref={footerRef} className="relative pt-20 lg:pt-32 pb-12 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Massive CTA Section */}
        <div ref={ctaRef} className="mb-20 lg:mb-32">
          <div className="luxury-card p-12 lg:p-20">
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold text-glow-hover mb-8 lg:mb-12">
              {t('footer.cta')}
            </h2>
            <p className="text-xl lg:text-3xl text-white/60 mb-12 lg:mb-16 max-w-3xl">
              {t('footer.description')}
            </p>
            
            {/* Contact Button */}
            <button className="group inline-flex items-center gap-4 btn-primary text-xl lg:text-2xl px-12 py-6">
              <Mail className="w-6 h-6 lg:w-8 lg:h-8" />
              <span>{t('footer.email')}</span>
              <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 lg:mb-20">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-display font-bold mb-6">DIGITAL</h3>
            <p className="text-white/50 mb-6 leading-relaxed">
              Crafting digital experiences that matter. Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white/80">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-accent-cyan transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white/80">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="flex items-center gap-3 text-white/50 hover:text-accent-cyan transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{t('footer.email')}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-white/50 hover:text-accent-cyan transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/50">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white/80">Follow Us</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-12 h-12 rounded-full border border-white/10 hover:border-accent-cyan hover:bg-accent-cyan/10 flex items-center justify-center transition-all group"
                  >
                    <IconComponent className="w-5 h-5 text-white/50 group-hover:text-accent-cyan transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Digital Craftsmen. {t('footer.rights')}
          </p>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-white/30 hover:text-accent-cyan transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white/30 hover:text-accent-cyan transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
    </footer>
  );
};

export default Footer;
