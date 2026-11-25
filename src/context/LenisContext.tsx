import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from './useLenisScroll';

gsap.registerPlugin(ScrollTrigger);

export function LenisScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTarget = useCallback((target: string) => {
    const cleanTarget = target.trim();
    if (!cleanTarget.startsWith('#')) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(cleanTarget, { duration: 1.1 });
    } else {
      const element = document.querySelector(cleanTarget);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const value = useMemo(
    () => ({
      scrollToTarget,
      stopScroll,
      startScroll,
    }),
    [scrollToTarget, stopScroll, startScroll],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
