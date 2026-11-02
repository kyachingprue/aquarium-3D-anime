import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenisRef.current?.raf(time);
    }
    let frame = requestAnimationFrame(function tick(time) {
      raf(time);
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}