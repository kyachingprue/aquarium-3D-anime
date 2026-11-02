'use client';

export function SectionTitle({ title, subtitle, className = '', align = 'center' }) {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  };

  return (
    <div className={`${alignClasses[align]} ${className}`}>
      <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-4 tracking-wide uppercase">
        Explore
      </span>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}