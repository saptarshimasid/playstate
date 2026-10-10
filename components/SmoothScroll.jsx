'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Dynamic scrollbar visibility: show only when scrolling, hide when idle
    let scrollTimeout;
    const triggerScrolling = () => {
      document.body.classList.add('is-scrolling');
      document.documentElement.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
        document.documentElement.classList.remove('is-scrolling');
      }, 850);
    };

    lenis.on('scroll', triggerScrolling);
    window.addEventListener('scroll', triggerScrolling, { passive: true });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('scroll', triggerScrolling);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return <>{children}</>;
}
