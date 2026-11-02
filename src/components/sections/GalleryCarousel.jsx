'use client';

import { useRef, useEffect, useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { 
    id: 1, 
    title: 'Coral Reef Paradise', 
    location: 'Great Barrier Reef, Australia',
    color: 'from-pink-500/30 to-red-500/30',
    gradient: 'from-pink-500 to-red-500',
  },
  { 
    id: 2, 
    title: 'Manta Ray Ballet', 
    location: 'Maldives, Indian Ocean',
    color: 'from-blue-500/30 to-cyan-500/30',
    gradient: 'from-blue-500 to-cyan-500',
const [isAnimating, setIsAnimating] = useState(true);

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
        sectionRef.current?.querySelector('.gallery-track'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
    if (!trackRef.current || !isAnimating) return;

    const track = trackRef.current;
    let animationId;
    let lastTime = 0;

    const animate = (time) => {
      if (time - lastTime < 50) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      track.scrollLeft += 0.5;
      
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
        track.scrollLeft = 0;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => setIsAnimating(false);
    const handleMouseLeave = () => setIsAnimating(true);

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAnimating]);

  const duplicatedImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#031B35] via-[#075985] to-[#031B35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(103,232,249,0.06)_0%,_transparent_60%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="section-header mb-16 lg:mb-20">
          <SectionTitle
            title="Marine Gallery"
            subtitle="A visual journey through Earth's most breathtaking underwater landscapes and encounters."
          />
        </div>

        <div 
          ref={trackRef}
          className="gallery-track overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-6 min-w-max" style={{ scrollSnapAlign: 'start' }}>
            {duplicatedImages.map((image, index) => (
              <GlassCard
                key={`${image.id}-${index}`}
                className="flex-shrink-0 w-[380px] snap-start group cursor-pointer"
                variant="elevated"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br"
                    style={{ background: image.gradient }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/60 uppercase tracking-wider">{image.location}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {image.title}
                </h3>
                <p className="text-sm text-white/50">Click to view full experience</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#031B35] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#031B35] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#031B35] to-transparent pointer-events-none" />
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
  },
  { 
    id: 3, 
    title: 'Kelp Forest Cathedral', 
    location: 'Channel Islands, California',
    color: 'from-green-500/30 to-emerald-500/30',
    gradient: 'from-green-500 to-emerald-500',
  },
  { 
    id: 4, 
    title: 'Bioluminescent Night', 
    location: 'Deep Sea, Pacific Ocean',
    color: 'from-purple-500/30 to-indigo-500/30',
    gradient: 'from-purple-500 to-indigo-500',
  },
  { 
    id: 5, 
    title: 'Sea Turtle Journey', 
    location: 'Hawaii, Pacific Ocean',
    color: 'from-teal-500/30 to-green-500/30',
    gradient: 'from-teal-500 to-green-500',
  },
  { 
    id: 6, 
    title: 'Whale Shark Encounter', 
    location: 'Philippines, Coral Triangle',
    color: 'from-indigo-500/30 to-blue-600/30',
    gradient: 'from-indigo-500 to-blue-600',
  },
];

export function GalleryCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);