import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioGsap(containerRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const animateSectionBlocks = (selector: string, triggerSelector: string) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;

        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: triggerSelector,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      };

      animateSectionBlocks('.craft-reveal', '#craft');
      animateSectionBlocks('.works-feed-reveal', '#works');
      animateSectionBlocks('.exp-card-reveal', '#experience');
      animateSectionBlocks('.skill-row-reveal', '#skills');
      animateSectionBlocks('.cred-reveal', '#credentials');

      ScrollTrigger.refresh();
    }, container);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
