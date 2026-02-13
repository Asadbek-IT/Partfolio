import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: t('team.roles.lead'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      bio: 'Full-stack architect with 10+ years of experience',
      social: { github: '#', linkedin: '#', twitter: '#' },
    },
    {
      name: 'Sarah Chen',
      role: t('team.roles.frontend'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
      bio: 'Creative frontend developer and UI specialist',
      social: { github: '#', linkedin: '#', twitter: '#' },
    },
    {
      name: 'Michael Rodriguez',
      role: t('team.roles.backend'),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
      bio: 'Backend specialist and cloud architect',
      social: { github: '#', linkedin: '#', twitter: '#' },
    },
    {
      name: 'Emily Watson',
      role: t('team.roles.designer'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
      bio: 'Award-winning UI/UX designer',
      social: { github: '#', linkedin: '#', twitter: '#' },
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for cards
      gsap.fromTo(
        cardsRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Dim other cards when one is hovered
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (hoveredIndex === null) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else if (index === hoveredIndex) {
        gsap.to(card, {
          opacity: 1,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(card, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  }, [hoveredIndex]);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-20 lg:py-32 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-section font-display font-bold text-glow-hover mb-6">
            {t('team.title')}
          </h2>
          <p className="text-lg lg:text-xl text-white/50 max-w-2xl mx-auto">
            Meet the talented individuals behind our success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="luxury-card p-6 lg:p-8 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links on Hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={member.social.github}
                    className="w-10 h-10 rounded-full bg-dark-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent-cyan/20 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 rounded-full bg-dark-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent-cyan/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 rounded-full bg-dark-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent-cyan/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-xl lg:text-2xl font-display font-bold mb-2">
                  {member.name}
                </h3>
                <p className="text-sm lg:text-base text-accent-cyan mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-white/50">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
