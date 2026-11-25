import { createContext, useContext } from 'react';

export interface LenisContextValue {
  scrollToTarget: (target: string) => void;
  stopScroll: () => void;
  startScroll: () => void;
}

export const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisScroll(): LenisContextValue {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error('useLenisScroll must be used within LenisScrollProvider');
  }
  return ctx;
}
