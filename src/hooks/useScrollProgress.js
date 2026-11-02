import { useEffect, useState } from 'react';
import { useLenis } from './useLenis';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis.current) return;

    const onScroll = ({ scroll, limit }) => {
      setProgress(scroll / limit);
    };

    lenis.current.on('scroll', onScroll);

    return () => {
      lenis.current?.off('scroll', onScroll);
    };
  }, [lenis]);

  return progress;
}

export function useSectionProgress(sectionRef, offset = 0) {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis.current || !sectionRef.current) return;

    const onScroll = ({ scroll }) => {
      const element = sectionRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = scroll + rect.top;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const start = elementTop - viewportHeight + offset;
      const end = elementTop + elementHeight - offset;

      const sectionProgress = (scroll - start) / (end - start);
      setProgress(Math.max(0, Math.min(1, sectionProgress)));
    };

    lenis.current.on('scroll', onScroll);

    return () => {
      lenis.current?.off('scroll', onScroll);
    };
  }, [lenis, sectionRef, offset]);

  return progress;
}