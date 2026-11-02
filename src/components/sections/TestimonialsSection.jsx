'use client';

import { useRef, useEffect, useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { TESTIMONIALS } from '../../utils/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        sectionRef.current?.querySelectorAll('.testimonial-card'),
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#075985] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(103,232,249,0.05)_0%,_transparent_70%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20">
          <SectionTitle
            title="Voices of the Ocean"
            subtitle="Leading marine scientists and explorers share their passion for our blue planet."
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <GlassCard className="testimonial-card" variant="elevated">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h-5.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4 3.638-4 5.849h-5.996zm18.983-12.525c-2.433-.917-4-3.638-4-5.849h5.983v7.391l-.996-2.151c2.432-.917 3.995-3.638 3.995-5.849h-5.982z" />
                          </svg>
                          <span className="text-sm text-cyan-300 font-medium">Testimonial</span>
                        </div>
                        <p className="text-white/80 text-lg leading-relaxed mb-6">"{testimonial.quote}"</p>
                        <div>
                          <p className="text-white font-bold">{testimonial.name}</p>
                          <p className="text-white/50 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cyan-400 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`} 
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}