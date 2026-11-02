'use client';

import { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { useLenis } from '../../hooks/useLenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ scrollProgress, scrollToSection }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const lenis = useLenis();
useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
      .from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }, '-=0.5')
      .from(scrollIndicatorRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.3');

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.set(titleRef.current, { 
              y: progress * -100,
              opacity: 1 - progress * 1.5,
            });
          }
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, { 
              y: progress * -80,
              opacity: 1 - progress * 1.5,
            });
          }
          if (ctaRef.current) {
            gsap.set(ctaRef.current, { 
              y: progress * -60,
              opacity: 1 - progress * 1.5,
            });
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToExplore = () => {
    if (lenis.current) {
      lenis.current.scrollTo('#exploration', { offset: -80, duration: 2 });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#075985] to-[#031B35]" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(103,232,249,0.08)_0%,_transparent_70%)]" />
      
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#031B35] to-transparent" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <div ref={titleRef} className="mb-8">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                AQUAVISTA
              </span>
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </div>

          <p ref={subtitleRef} className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Journey into the depths of our planet&apos;s most mysterious realm. 
            Experience the ocean like never before through immersive 3D exploration.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={handleScrollToExplore}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Journey
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4m-6-12V2m0 0L6 6m4-4H2v12" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="hidden sm:inline-flex"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div ref={scrollIndicatorRef} className="mt-20 flex flex-col items-center gap-3 animate-bounce-subtle" onClick={handleScrollToExplore}>
          <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-scroll-mouse" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        @keyframes scroll-mouse {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        .animate-scroll-mouse { animation: scroll-mouse 1.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}