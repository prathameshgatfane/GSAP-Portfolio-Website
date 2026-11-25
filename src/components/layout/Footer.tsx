import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone } from 'lucide-react';
import {
  GitHubBrandIcon,
  LinkedInBrandIcon,
} from '../common/BrandIcons';
import { PORTFOLIO_PROFILE, SOCIAL_LINKS } from '../../data/portfolioData';
import { useLenisScroll } from '../../context/useLenisScroll';
import { copyToClipboard, sanitizeUrl } from '../../utils/security';
import { notifyCopied, notifyDownload } from '../../utils/toast';
import type { SocialLinkItem } from '../../types/portfolio';

function renderSocialIcon(iconKey: SocialLinkItem['iconKey']) {
  switch (iconKey) {
    case 'github':
      return <GitHubBrandIcon size={20} />;
    case 'linkedin':
      return <LinkedInBrandIcon size={20} />;
    case 'mail':
      return <Mail size={20} strokeWidth={1.9} />;
  }
}

export function Footer() {
  const { scrollToTarget } = useLenisScroll();

  const handleAnchorNav = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    scrollToTarget(target);
  };

  const handleCopyEmail = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const ok = await copyToClipboard(PORTFOLIO_PROFILE.email);
    if (ok) {
      notifyCopied('Email', PORTFOLIO_PROFILE.email);
    }
    window.location.href = `mailto:${PORTFOLIO_PROFILE.email}`;
  };

  const handleCopyPhone = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const ok = await copyToClipboard(PORTFOLIO_PROFILE.heroPhoneDisplay);
    if (ok) {
      notifyCopied('Phone', PORTFOLIO_PROFILE.heroPhoneDisplay);
    }
    window.location.href = PORTFOLIO_PROFILE.heroPhoneHref;
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo">Prathamesh Gatfane</h2>
          <p className="footer-designation">Full Stack Web Developer</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Navigation</h4>
            <a href="#craft" onClick={(e) => handleAnchorNav(e, '#craft')}>
              Craft
            </a>
            <a href="#works" onClick={(e) => handleAnchorNav(e, '#works')}>
              Works
            </a>
            <a href="#experience" onClick={(e) => handleAnchorNav(e, '#experience')}>
              Experience
            </a>
            <a href="#skills" onClick={(e) => handleAnchorNav(e, '#skills')}>
              Skills
            </a>
          </div>

          <div className="footer-col">
            <h4>More</h4>
            <a href="#credentials" onClick={(e) => handleAnchorNav(e, '#credentials')}>
              Credentials
            </a>
            <a
              href={sanitizeUrl(PORTFOLIO_PROFILE.resumePath)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => notifyDownload('Resume PDF')}
            >
              Resume
            </a>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a
              href={`mailto:${PORTFOLIO_PROFILE.email}`}
              onClick={handleCopyEmail}
              className="footer-contact-link"
            >
              <Mail size={15} />
              <span>{PORTFOLIO_PROFILE.email}</span>
            </a>
            <a
              href={PORTFOLIO_PROFILE.heroPhoneHref}
              onClick={handleCopyPhone}
              className="footer-contact-link"
            >
              <Phone size={15} />
              <span>{PORTFOLIO_PROFILE.heroPhoneDisplay}</span>
            </a>
            <p>{PORTFOLIO_PROFILE.location}</p>
          </div>
        </div>

        <div className="footer-social">
          <h4>Follow Me</h4>
          <div className="social-icons">
            {SOCIAL_LINKS.map((social) => {
              const safeHref = sanitizeUrl(social.href);
              return (
                <motion.a
                  key={social.id}
                  href={safeHref}
                  target={social.isExternal ? '_blank' : undefined}
                  rel={social.isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={social.id === 'email' ? handleCopyEmail : undefined}
                >
                  {renderSocialIcon(social.iconKey)}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer-landscape" aria-hidden="true">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            className="landscape-layer-1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            className="landscape-layer-2"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,165.3C960,149,1056,171,1152,197.3C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            className="landscape-layer-3"
            d="M0,160L48,149.3C96,139,192,117,288,133.3C384,149,480,203,576,224C672,245,768,235,864,229.3C960,224,1056,224,1152,229.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">{PORTFOLIO_PROFILE.copyright}</p>
        <p className="footer-credit">
          <Heart size={14} fill="#AC58E9" color="#AC58E9" className="footer-heart-icon" />
          <span>{PORTFOLIO_PROFILE.credit}</span>
        </p>
      </div>
    </footer>
  );
}
