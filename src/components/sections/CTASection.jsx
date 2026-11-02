'use client';

import { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { useLenis } from '../../hooks/useLenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.cta-content > *'),
        { y: 40, opacity: 0 },
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

  const handleScrollToTop = () => {
    if (lenis.current) {
      lenis.current.scrollTo('#hero', { offset: 0, duration: 2 });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#075985] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(103,232,249,0.1)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.02]" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="cta-content">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-300 mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
            </svg>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Your Ocean Journey
            </span>
            <br />
            <span className="text-white/80">Begins Now</span>
          </h2>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dive deeper into the wonders of our blue planet. Explore, learn, and join a global community 
            dedicated to understanding and protecting the ocean.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="xl" onClick={handleScrollToTop} className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Start Exploring
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4m-6-12V2m0 0L6 6m4-4H2v12" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button variant="secondary" size="xl" className="hidden sm:inline-flex">
              Join the Mission
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-white/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm">Live Ocean Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="text-sm">Active Expeditions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
              <span className="text-sm">Species Tracked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}