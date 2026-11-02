'use client';

import { useRef, useEffect, useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { FISH_SPECIES } from '../../utils/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MarineLifeSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
        sectionRef.current?.querySelectorAll('.species-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
      id="marine-life"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#011627] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(15,118,110,0.08)_0%,_transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20">
          <SectionTitle
            title="Marine Life Discovery"
            subtitle="Meet the extraordinary inhabitants of our oceans. Each species tells a story of adaptation and survival."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FISH_SPECIES.map((species, index) => (
            <GlassCard
              key={species.id}
              className="species-card group relative overflow-hidden"
              variant="featured"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl transform translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: species.color }}
                  >
                    {species.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{species.name}</h3>
                    <p className="text-xs text-white/50 italic">{species.scientificName}</p>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  {species.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Habitat</p>
                    <p className="text-sm font-medium text-white">{species.habitat}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Depth</p>
                    <p className="text-sm font-medium text-white">{species.depth}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Size</p>
                    <p className="text-sm font-medium text-white">{species.size}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40">Conservation Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: species.color }} />
                    <span className="text-sm font-medium text-white/80">Monitored</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}