import { AnimatePresence, motion } from 'framer-motion';

interface PreloaderProps {
  visible: boolean;
  onComplete: () => void;
}

export function Preloader({ visible, onComplete }: PreloaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ y: '0%', borderRadius: '0% 0% 0% 0%' }}
          animate={{
            y: '-100%',
            borderRadius: '10% 10% 36% 39% / 10% 10% 55% 56%',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onComplete}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
