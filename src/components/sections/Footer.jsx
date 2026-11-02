'use client';

import { useRef, useEffect } from 'react';
import { NAV_LINKS, FOOTER_LINKS } from '../../utils/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll('.footer-column'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div className="footer-column space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-lg text-cyan-300">
                🐟
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[0.12em] text-white">AQUAVISTA</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/70">Ocean stories</p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-300">
              Exploring the deep beauty of the ocean and sharing the stories, science, and wonder that keep it alive.
            </p>

            <div className="flex flex-wrap gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <div key={key} className="footer-column">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                {key}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.href)}
                      className="transition hover:text-cyan-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Aquavista. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('#hero')}
              className="font-medium text-slate-200 transition hover:text-cyan-300"
            >
              Back to top
            </button>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Made for the blue planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

