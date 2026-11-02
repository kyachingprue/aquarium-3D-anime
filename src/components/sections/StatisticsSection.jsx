'use client';

import { useRef, useEffect } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { STATISTICS } from '../../utils/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StatisticsSection() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

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
        sectionRef.current?.querySelectorAll('.stat-card'),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              countersRef.current.forEach((counter, index) => {
                const targetValue = parseInt(counter.dataset.value);
                const suffix = counter.dataset.suffix || '';
                const duration = 2;
                const obj = { value: 0 };
                
                gsap.to(obj, {
                  value: targetValue,
                  duration,
                  delay: index * 0.1,
                  ease: 'power2.out',
                  onUpdate: () => {
                    counter.textContent = Math.floor(obj.value).toLocaleString() + suffix;
                  },
                });
              });
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#011627] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(103,232,249,0.05)_0%,_transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20 text-center">
          <SectionTitle
            title="Ocean by Numbers"
            subtitle="The staggering scale of our blue planet — and what's at stake."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATISTICS.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card relative text-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent mb-3"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                  ref={(el) => { countersRef.current[index] = el; }}
                >
                  0{stat.suffix}
                </div>
                <p className="text-white/70 text-lg font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}