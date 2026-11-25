import { motion } from 'framer-motion';
import { Brain, Eye, Heart, Sliders, Wrench } from 'lucide-react';
import { CRAFT_PILLARS, PORTFOLIO_PROFILE } from '../../data/portfolioData';
import type { CraftPillarItem } from '../../types/portfolio';

function renderPillarIcon(iconKey: CraftPillarItem['iconKey']) {
  switch (iconKey) {
    case 'brain':
      return <Brain size={22} strokeWidth={1.8} />;
    case 'eye':
      return <Eye size={22} strokeWidth={1.8} />;
    case 'sliders':
      return <Sliders size={22} strokeWidth={1.8} />;
    case 'wrench':
      return <Wrench size={22} strokeWidth={1.8} />;
    case 'heart':
      return <Heart size={22} strokeWidth={1.8} />;
  }
}

export function CraftSection() {
  return (
    <section id="craft" className="editorial-section craft-section">
      <div className="section-container">
        <div className="summary-header">
          <p className="section-kicker">{PORTFOLIO_PROFILE.summaryKicker}</p>
          <div className="summary-grid">
            <h2 className="section-display-title">
              {PORTFOLIO_PROFILE.summaryHeading}
            </h2>
            <p className="section-lead-copy">{PORTFOLIO_PROFILE.summaryText}</p>
          </div>
        </div>

        <div className="craft-bento-grid">
          {CRAFT_PILLARS.map((pillar) => (
            <motion.article
              key={pillar.id}
              className={`craft-card craft-reveal ${pillar.featured ? 'craft-card-featured' : ''}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="craft-card-top">
                <span className="craft-part-label">{pillar.partLabel}</span>
                <span className="craft-icon-wrap" aria-hidden="true">
                  {renderPillarIcon(pillar.iconKey)}
                </span>
              </div>

              <h3 className="craft-card-headline">{pillar.headline}</h3>
              <p className="craft-card-metric tabular-nums">{pillar.metric}</p>
              <p className="craft-card-desc">{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
