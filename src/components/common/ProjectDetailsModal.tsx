import { useEffect, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Maximize2, X } from 'lucide-react';
import { useLenisScroll } from '../../context/useLenisScroll';
import type { ProjectItem, ProjectLinkItem } from '../../types/portfolio';
import { isPlaceholderUrl, sanitizeUrl } from '../../utils/security';
import { notifyUnavailable } from '../../utils/toast';
import { GitHubBrandIcon } from './BrandIcons';
import { ProjectArtwork } from './ProjectArtwork';

interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenLightbox: (src: string, title: string) => void;
}

export function ProjectDetailsModal({
  project,
  onClose,
  onOpenLightbox,
}: ProjectDetailsModalProps) {
  const { stopScroll, startScroll } = useLenisScroll();

  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose, startScroll, stopScroll]);

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    projectTitle: string,
    link: ProjectLinkItem,
  ) => {
    if (isPlaceholderUrl(link.href)) {
      event.preventDefault();
      notifyUnavailable(`${projectTitle} (${link.label})`);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal-card"
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="project-modal-grid">
              <div className="project-modal-media">
                {project.artworkVariant ? (
                  <ProjectArtwork
                    variant={project.artworkVariant}
                    title={project.title}
                  />
                ) : (
                  <>
                    <img
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      className="project-modal-zoom-btn"
                      onClick={() => onOpenLightbox(project.imageSrc, project.title)}
                    >
                      <Maximize2 size={14} strokeWidth={2} />
                      <span>Full Resolution</span>
                    </button>
                  </>
                )}
              </div>

              <div className="project-modal-body" data-lenis-prevent>
                <div className="work-meta-line tabular-nums">
                  <span>{project.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                </div>

                <h3 className="project-modal-title">{project.title}</h3>
                <p className="project-modal-desc">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="project-modal-highlights">
                    {project.highlights.map((item) => (
                      <li key={item}>
                        <CheckCircle2
                          size={16}
                          strokeWidth={2}
                          className="project-highlight-icon"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="project-modal-tech-wrap">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="project-modal-tech-item">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-modal-actions">
                  {project.links.length > 0 ? (
                    project.links.map((link) => {
                      const safeHref = sanitizeUrl(link.href);
                      const placeholder = isPlaceholderUrl(link.href);

                      return (
                        <a
                          key={link.label}
                          href={safeHref}
                          target={placeholder ? undefined : '_blank'}
                          rel={placeholder ? undefined : 'noopener noreferrer'}
                          className="work-action-link"
                          onClick={(event) =>
                            handleLinkClick(event, project.title, link)
                          }
                        >
                          {link.type === 'github' ? (
                            <GitHubBrandIcon size={15} />
                          ) : (
                            <ArrowUpRight size={15} />
                          )}
                          <span>{link.label}</span>
                        </a>
                      );
                    })
                  ) : (
                    <p className="project-modal-private-note">
                      Private client platform delivered during tenure at ClickInnovate Pvt. Ltd.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
