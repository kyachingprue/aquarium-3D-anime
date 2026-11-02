'use client';

import { forwardRef } from 'react';

export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#031B35] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:ring-cyan-500',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm focus:ring-white/50',
    outline: 'bg-transparent text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-400 focus:ring-cyan-500',
    ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';