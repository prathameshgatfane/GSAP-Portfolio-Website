import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../../data/portfolioData';
import { copyToClipboard, sanitizeUrl } from '../../utils/security';
import { notifyCallInitiated } from '../../utils/toast';

interface HeroSectionProps {
  ready: boolean;
}

export function HeroSection({ ready }: HeroSectionProps) {
  const handleBookCall = async () => {
    await copyToClipboard(PORTFOLIO_PROFILE.heroPhoneDisplay);
    notifyCallInitiated(PORTFOLIO_PROFILE.heroPhoneDisplay);
  };

  return (
    <div id="page">
      <div className="top">
        <motion.h1
          className="heroHeading"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            width="1309"
            height="165"
            viewBox="0 0 1309 165"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={PORTFOLIO_PROFILE.heroWordmark}
          >
            <text
              x="10"
              y="130"
              fontFamily="Montreal Bold, Arial, sans-serif"
              fontSize="140"
              fontWeight="bold"
              className="hero-wordmark-text"
            >
              {PORTFOLIO_PROFILE.heroWordmark}
            </text>
          </svg>
        </motion.h1>
      </div>

      <div className="bottom">
        <div className="left">
          <motion.h4
            initial={{ y: 30, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArrowDownRight size={28} strokeWidth={1.5} color="#AC58E9" />
          </motion.h4>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {PORTFOLIO_PROFILE.heroDescription}
          </motion.p>

          <motion.a
            href={sanitizeUrl(PORTFOLIO_PROFILE.heroPhoneHref)}
            className="leftBtn"
            initial={{ y: 30, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBookCall}
          >
            <span>Book a Call</span>
            <ArrowUpRight size={18} strokeWidth={2} />
          </motion.a>
        </div>

        <motion.div
          className="middle"
          initial={{ y: 30, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="image">
            <img
              src={PORTFOLIO_PROFILE.heroImageSrc}
              alt={PORTFOLIO_PROFILE.heroImageAlt}
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <div className="right">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            {PORTFOLIO_PROFILE.availabilityPrompt}
          </motion.p>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={ready ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            {PORTFOLIO_PROFILE.availabilityDate}
          </motion.h2>
        </div>
      </div>
    </div>
  );
}
