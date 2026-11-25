import { motion } from 'framer-motion';
import { BACK_RIBBON_ITEMS, FRONT_RIBBON_ITEMS } from '../../data/portfolioData';
import type { RibbonPhraseItem } from '../../types/portfolio';

function RibbonSparkle() {
  return (
    <svg
      className="ribbon-sparkle"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0L14.9 9.1L24 12L14.9 14.9L12 24L9.1 14.9L0 12L9.1 9.1L12 0Z" />
    </svg>
  );
}

function RibbonTrackSegment({
  items,
  segmentKey,
  ariaHidden,
}: {
  items: RibbonPhraseItem[];
  segmentKey: string;
  ariaHidden?: boolean;
}) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="ribbon-track-segment" aria-hidden={ariaHidden}>
      {repeatedItems.map((item, idx) => (
        <span className="ribbon-unit" key={`${segmentKey}-${item.id}-${idx}`}>
          <span
            className={item.italic ? 'ribbon-item-italic' : 'ribbon-item-caps'}
          >
            {item.text}
          </span>
          <RibbonSparkle />
        </span>
      ))}
    </div>
  );
}

export function CrossingRibbons() {
  return (
    <motion.section
      className="crossing-ribbons-band"
      aria-label="Developer highlights ticker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Back Ribbon: Tilted upward left-to-right, scrolling left-to-right */}
      <div className="ribbon-strip ribbon-back">
        <div className="ribbon-track ribbon-track-reverse">
          <RibbonTrackSegment items={BACK_RIBBON_ITEMS} segmentKey="back-a" />
          <RibbonTrackSegment
            items={BACK_RIBBON_ITEMS}
            segmentKey="back-b"
            ariaHidden
          />
        </div>
      </div>

      {/* Front Ribbon: Tilted downward left-to-right, Vibe Purple, scrolling right-to-left */}
      <div className="ribbon-strip ribbon-front">
        <div className="ribbon-track ribbon-track-forward">
          <RibbonTrackSegment items={FRONT_RIBBON_ITEMS} segmentKey="front-a" />
          <RibbonTrackSegment
            items={FRONT_RIBBON_ITEMS}
            segmentKey="front-b"
            ariaHidden
          />
        </div>
      </div>
    </motion.section>
  );
}
