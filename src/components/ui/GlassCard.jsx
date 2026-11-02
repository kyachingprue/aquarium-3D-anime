'use client';

import { forwardRef } from 'react';

export const GlassCard = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20',
    elevated: 'bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/30 hover:shadow-cyan-500/10',
    subtle: 'bg-white/3 backdrop-blur-md border border-white/5 hover:border-white/10',
    featured: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-cyan-400/30',
  };

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl transition-all duration-500 ${variants[variant]} ${hover ? 'hover:scale-[1.02] hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
});

GlassCard.displayName = 'GlassCard';