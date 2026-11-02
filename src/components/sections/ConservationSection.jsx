'use client';

import { useRef, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONSERVATION_ACTIONS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    title: 'Protect 30% by 2030',
    description: 'Support the global 30x30 initiative to protect 30% of oceans through marine protected areas.',
    impact: 'High',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Reduce Plastic Pollution',
    description: 'Eliminate single-use plastics and support circular economy initiatives to stop 8M tons of plastic entering oceans yearly.',
    impact: 'Critical',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Sustainable Seafood',
    description: 'Choose MSC/ASC certified seafood and support local, sustainable fisheries to protect fish populations.',
    impact: 'High',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Climate Action',
    description: 'Reduce carbon footprint to combat ocean warming and acidification threatening coral reefs globally.',
    impact: 'Critical',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    title: 'Restore Habitats',
    description: 'Support mangrove, seagrass, and coral restoration projects that sequester carbon and protect coastlines.',
    impact: 'High',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Science & Education',
    description: 'Fund marine research and ocean literacy programs to inspire the next generation of ocean stewards.',
    impact: 'Essential',
    color: 'from-indigo-500 to-purple-600',
  },
];

export function ConservationSection() {
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

return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="conservation"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#011627] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(15,118,110,0.08)_0%,_transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20">
          <SectionTitle
            title="Ocean Conservation"
            subtitle="Every action creates ripples. Join the movement to protect and restore our blue planet."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {CONSERVATION_ACTIONS.map((action) => (
            <GlassCard
              key={action.title}
              className="action-card group relative overflow-hidden"
              variant="featured"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div 
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-30"
                style={{ background: `linear-gradient(135deg, ${action.color.split(' to ')[0]}, ${action.color.split(' to ')[1]})` }}
              />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-cyan-300 mb-6 group-hover:scale-110 transition-transform duration-500" 
                     style={{ background: `linear-gradient(135deg, ${action.color.split(' to ')[0]}/20, ${action.color.split(' to ')[1]}/20)` }}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {action.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40 uppercase tracking-wide">Impact Level</span>
                  <span className="text-sm font-medium text-cyan-300">{action.impact}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="text-center">
          <GlassCard variant="elevated" className="max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-300 mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Make Waves?</h3>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of ocean advocates worldwide. Your support funds critical research, conservation projects, and education programs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Take Action Now
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn How to Help
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.action-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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