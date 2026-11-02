'use client';

import { useRef, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPLORATION_FEATURES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Deep Discovery',
    description: 'Explore uncharted territories with cutting-edge submersible technology and ROV expeditions.',
    depth: '0-11,000m',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Live Research',
    description: 'Real-time data from oceanographic sensors, satellite tracking, and autonomous underwater vehicles.',
    depth: 'Global',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    title: 'Species Tracking',
    description: 'Follow migratory patterns of marine megafauna across ocean basins with satellite telemetry.',
    depth: 'Pelagic',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Climate Monitoring',
    description: 'Track ocean temperature, acidification, and currents to understand global climate systems.',
    depth: 'Surface-Deep',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Habitat Mapping',
    description: 'High-resolution 3D mapping of coral reefs, seamounts, and hydrothermal vent communities.',
    depth: 'Benthic',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Citizen Science',
    description: 'Join global research initiatives and contribute to marine biodiversity databases worldwide.',
    depth: 'Community',
  },
];

export function OceanExplorationSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.feature-card'),
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

      gsap.fromTo(
        sectionRef.current?.querySelector('.section-header'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exploration"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#075985] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(103,232,249,0.06)_0%,_transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20">
          <SectionTitle
            title="Ocean Exploration"
            subtitle="Discover the cutting-edge technology and missions revealing the secrets of our blue planet."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {EXPLORATION_FEATURES.map((feature, index) => (
            <GlassCard
              key={feature.title}
              className="feature-card group"
              variant="elevated"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-300 mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/40 pt-4 border-t border-white/10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <span className="font-mono text-cyan-300">{feature.depth}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);