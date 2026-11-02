'use client';

import { useRef, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { ECOSYSTEMS } from '../../utils/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FeatureCardsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector('.section-header'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.ecosystem-card'),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystems"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#011627] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(15,118,110,0.08)_0%,_transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20">
          <SectionTitle
            title="Ocean Ecosystems"
            subtitle="From sunlit coral reefs to the mysterious abyss, each ecosystem harbors unique life and vital planetary functions."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ECOSYSTEMS.map((ecosystem) => (
            <GlassCard
              key={ecosystem.id}
              className="ecosystem-card group relative overflow-hidden"
              variant="featured"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div 
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-50"
                style={{ backgroundColor: ecosystem.color }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{ecosystem.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{ecosystem.title}</h3>
                    <p className="text-xs text-white/50 font-mono">{ecosystem.depth}</p>
                  </div>
                </div>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {ecosystem.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">Biodiversity:</span>
                    <span className="text-sm font-medium text-white">{ecosystem.biodiversity}</span>
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ecosystem.color }}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}