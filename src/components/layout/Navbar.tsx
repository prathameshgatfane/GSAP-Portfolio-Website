import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_LINKS, PORTFOLIO_PROFILE } from '../../data/portfolioData';
import { useLenisScroll } from '../../context/useLenisScroll';
import { useTheme } from '../../context/useTheme';
import { sanitizeUrl } from '../../utils/security';
import { notifyDownload } from '../../utils/toast';
import type { NavLinkItem } from '../../types/portfolio';

interface NavbarProps {
  ready: boolean;
}

export function Navbar({ ready }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToTarget, stopScroll, startScroll } = useLenisScroll();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (mobileMenuOpen) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [mobileMenuOpen, startScroll, stopScroll]);

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: NavLinkItem,
  ) => {
    setMobileMenuOpen(false);

    if (item.isResume) {
      notifyDownload('Resume PDF');
      return;
    }

    if (item.href.startsWith('#')) {
      event.preventDefault();
      scrollToTarget(item.href);
    }
  };

  return (
    <motion.header
      className="navbar"
      initial={{ y: '-100%', opacity: 0 }}
      animate={ready ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="logo-left">
        <h2>
          {PORTFOLIO_PROFILE.brandName} <sup>©</sup>
        </h2>
        <p>{PORTFOLIO_PROFILE.roleLabel}</p>
      </div>

      <div className="navbar-actions">
        <nav
          className={`menu ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((item) => {
            const safeHref = sanitizeUrl(item.href);
            const externalProps = item.isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <div className="menu-line" key={item.id}>
                <a
                  href={safeHref}
                  className="nav-link top-1"
                  onClick={(event) => handleLinkClick(event, item)}
                  {...externalProps}
                >
                  {item.label}
                </a>
                <a
                  href={safeHref}
                  className="nav-link"
                  onClick={(event) => handleLinkClick(event, item)}
                  {...externalProps}
                >
                  {item.label}
                </a>
              </div>
            );
          })}
        </nav>

        <motion.button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          whileTap={{ scale: 0.92 }}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
        </motion.button>

        <button
          type="button"
          className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X size={26} strokeWidth={2} />
          ) : (
            <Menu size={26} strokeWidth={2} />
          )}
        </button>
      </div>
    </motion.header>
  );
}
