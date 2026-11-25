import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenisScroll } from '../../context/useLenisScroll';
import type { LightboxState } from '../../types/portfolio';

interface LightboxModalProps {
  lightbox: LightboxState;
  onClose: () => void;
}

export function LightboxModal({ lightbox, onClose }: LightboxModalProps) {
  const { stopScroll, startScroll } = useLenisScroll();

  useEffect(() => {
    if (!lightbox.isOpen) return;

    document.body.style.overflow = 'hidden';
    stopScroll();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      startScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightbox.isOpen, onClose, startScroll, stopScroll]);

  return (
    <AnimatePresence>
      {lightbox.isOpen && (
        <motion.div
          className="lightbox-overlay active"
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title || 'Project Preview'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="lightbox-content"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={onClose}
              aria-label="Close preview"
            >
              <X size={28} strokeWidth={2} />
            </button>
            <img id="lightbox-img" src={lightbox.src} alt={lightbox.title || 'Project Preview'} />
            <p id="lightbox-title">{lightbox.title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
