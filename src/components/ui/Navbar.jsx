'use client';

import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../utils/constants';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useLenis } from '../../hooks/useLenis';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element && lenis.current) {
      lenis.current.scrollTo(element, { offset: -80, duration: 1.5 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(3,27,53,0.95)] backdrop-blur-md border-b border-[rgba(103,232,249,0.1)]'
          : 'bg-transparent'
      }`}
      style={{ backgroundColor: scrolled ? 'rgba(3, 27, 53, 0.95)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                AQUAVISTA
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white/80 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom -2 left 0 right 0 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
              Dive In
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-white/80 hover:text-cyan-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[rgba(103,232,249,0.1)] animate-slide-down">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-2 text-white/80 hover:text-cyan-300 transition-colors text-base font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button className="mt-4 mx-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300">
                Dive In
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>
    </nav>
  );
}