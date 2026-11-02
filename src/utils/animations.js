import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTrigger() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

export function createScrollAnimation(element, animationVars, scrollTriggerVars) {
  return gsap.to(element, {
    ...animationVars,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerVars,
    },
  });
}

export function createTimelineScrollAnimation(timeline, triggerElement, scrollTriggerVars) {
  return ScrollTrigger.create({
    animation: timeline,
    trigger: triggerElement,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...scrollTriggerVars,
  });
}

export function animateCounter(element, targetValue, duration = 2, suffix = '') {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toLocaleString() + suffix;
    },
  });
}

export function createParallax(element, speed = 0.5) {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

export function createRevealAnimation(elements, stagger = 0.1) {
  return gsap.fromTo(
    elements,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function createStaggerReveal(selector, stagger = 0.15, delay = 0) {
  return gsap.fromTo(
    selector,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}