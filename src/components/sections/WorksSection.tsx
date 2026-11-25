import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ArrowRight } from 'lucide-react';
import { useLenisScroll } from '../../context/useLenisScroll';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { ProjectItem } from '../../types/portfolio';
import { ProjectArtwork } from '../common/ProjectArtwork';

interface WorksSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FEATURED_PROJECT_IDS = new Set([
  'vyawahare',
  'skintotal',
  'insurekaro',
  'aasra',
]);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export function WorksSection({ onSelectProject }: WorksSectionProps) {
  const { scrollToTarget } = useLenisScroll();

  const outerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  const [isDesktopPin, setIsDesktopPin] = useState<boolean>(() =>
    typeof window === 'undefined' ? true : window.innerWidth >= 1025,
  );
  const [outerHeight, setOuterHeight] = useState<string>('3200px');
  const [hoveredWorkId, setHoveredWorkId] = useState<string>(
    PROJECTS_DATA[0]?.id ?? 'vyawahare',
  );

  const featuredProjects = useMemo(
    () => PROJECTS_DATA.filter((project) => FEATURED_PROJECT_IDS.has(project.id)),
    [],
  );

  const activePreviewProject = useMemo(
    () =>
      PROJECTS_DATA.find((project) => project.id === hoveredWorkId) ??
      PROJECTS_DATA[0],
    [hoveredWorkId],
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktopPin(window.innerWidth >= 1025);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (!isDesktopPin) return;

    const outer = outerRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!outer || !stage || !track) return;

    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let raf = 0;
    let maxTranslateX = 0;
    let smoothProgress = 0;
    let targetProgress = 0;
    let destroyed = false;

    const measure = () => {
      const stageWidth = stage.clientWidth;
      const trackWidth = track.scrollWidth;
      const gutter = clamp(stageWidth * 0.06, 48, 120);
      maxTranslateX = Math.max(0, trackWidth - stageWidth + gutter);
      const totalHeight = window.innerHeight + maxTranslateX;
      setOuterHeight(`${Math.round(totalHeight)}px`);
    };

    const applyTransforms = (progress: number) => {
      const currentX = progress * maxTranslateX;
      track.style.transform = `translate3d(${(-currentX).toFixed(2)}px, 0px, 0px)`;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      const reduced = !!motionQuery?.matches;
      const viewportW = stage.clientWidth || window.innerWidth;
      const halfW = viewportW / 2;
      const trackRectLeft = stage.getBoundingClientRect().left;
      void trackRectLeft;

      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;

        if (reduced) {
          cardEl.style.transform = '';
          cardEl.style.opacity = '';
          return;
        }

        const cardLeft = cardEl.offsetLeft;
        const cardW = cardEl.offsetWidth;
        const cardCenterInViewport = cardLeft + cardW / 2 - currentX;
        const normalized = clamp(
          (cardCenterInViewport - halfW) / Math.max(1, viewportW * 0.62),
          -1.4,
          1.4,
        );

        const absNorm = Math.abs(normalized);
        const curveStrength = Math.pow(absNorm, 1.55);
        const rotateY = -normalized * 24;
        const translateZ = curveStrength * 44;
        const scaleY = 1 + curveStrength * 0.085;
        const scaleX = 1 - Math.min(0.06, curveStrength * 0.03);
        const fade = clamp(1 - Math.max(0, absNorm - 0.92) * 0.55, 0.28, 1);

        cardEl.style.transform = `perspective(1200px) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ.toFixed(1)}px) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
        cardEl.style.opacity = fade.toFixed(3);
      });
    };

    const updateTargetProgress = () => {
      const rect = outer.getBoundingClientRect();
      const scrollable = Math.max(1, outer.offsetHeight - window.innerHeight);
      targetProgress = clamp(-rect.top / scrollable, 0, 1);
    };

    const tick = () => {
      raf = 0;
      if (destroyed) return;
      updateTargetProgress();
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) < 0.0005) {
        smoothProgress = targetProgress;
        applyTransforms(smoothProgress);
      } else {
        smoothProgress += diff * 0.14;
        applyTransforms(smoothProgress);
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!raf && !destroyed) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      wake();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            measure();
            updateTargetProgress();
            smoothProgress = targetProgress;
            applyTransforms(smoothProgress);
          })
        : null;

    resizeObserver?.observe(stage);
    resizeObserver?.observe(track);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    measure();
    updateTargetProgress();
    smoothProgress = targetProgress;
    applyTransforms(smoothProgress);

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      resizeObserver?.disconnect();
    };
  }, [isDesktopPin, featuredProjects.length]);

  const handleSkipAhead = () => {
    scrollToTarget('#experience');
  };

  if (!isDesktopPin) {
    return (
      <section id="works" className="editorial-section works-mobile-section">
        <div className="section-container">
          <div className="works-mobile-header">
            <p className="works-featured-kicker tabular-nums">
              01 / SELECTED WORKS
            </p>
            <h2 className="section-display-title">
              Shipped web platforms &amp; interfaces
            </h2>
          </div>
        </div>

        <div
          className="works-mobile-rail"
          role="region"
          aria-label="Featured projects horizontal showcase"
        >
          {featuredProjects.map((project) => (
            <article key={project.id} className="works-showcase-card is-mobile">
              <button
                type="button"
                className="works-showcase-card-btn"
                onClick={() => onSelectProject(project)}
                aria-label={`Open details for ${project.title}`}
              >
                <div className="works-card-topstrip">
                  <div className="works-card-topstrip-left">
                    <h3 className="works-card-name">{project.title}</h3>
                    <p className="works-card-tags">
                      {project.category} · {project.techStack.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                  <span className="works-card-year tabular-nums">
                    {project.number} · {project.year}
                  </span>
                </div>

                <div className="works-card-visual">
                  <img
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            </article>
          ))}
        </div>

        <div className="section-container">
          <div className="works-more-mobile">
            <h3 className="works-more-heading">More work</h3>
            <div className="works-more-list">
              {PROJECTS_DATA.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  className="works-more-row"
                  onClick={() => onSelectProject(project)}
                >
                  <div className="works-more-row-text">
                    <span className="works-more-row-title">{project.title}</span>
                    <span className="works-more-row-sub">
                      {project.category} · {project.techStack.slice(0, 3).join(' · ')}
                    </span>
                  </div>
                  <ArrowRight size={17} className="works-more-row-arrow" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="works"
      ref={outerRef}
      className="works-showcase-outer"
      style={{ height: outerHeight }}
    >
      <div ref={stageRef} className="works-sticky-stage">
        <div className="works-stage-topbar">
          <p className="works-featured-kicker tabular-nums">
            01 / SELECTED WORKS
          </p>
          <p className="works-stage-hint">Scroll to explore projects</p>
        </div>

        <div className="works-stage-viewport">
          <div ref={trackRef} className="works-horizontal-track">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="works-showcase-card"
              >
                <button
                  type="button"
                  className="works-showcase-card-btn"
                  onClick={() => onSelectProject(project)}
                  aria-label={`Open details for ${project.title}`}
                >
                  <div className="works-card-topstrip">
                    <div className="works-card-topstrip-left">
                      <h3 className="works-card-name">{project.title}</h3>
                      <p className="works-card-tags">
                        {project.category} · {project.techStack.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                    <span className="works-card-year tabular-nums">
                      {project.number} · {project.year}
                    </span>
                  </div>

                  <div className="works-card-visual">
                    <img
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </button>
              </article>
            ))}

            <div
              ref={(el) => {
                cardRefs.current[featuredProjects.length] = el;
              }}
              className="works-more-panel"
            >
              <div className="works-more-header">
                <h3 className="works-more-heading">More work</h3>
                <span className="works-more-count tabular-nums">
                  {PROJECTS_DATA.length} Shipped Projects
                </span>
              </div>

              <div className="works-more-grid">
                <div className="works-more-list" role="list">
                  {PROJECTS_DATA.map((project) => {
                    const isActive = activePreviewProject?.id === project.id;
                    return (
                      <button
                        type="button"
                        key={project.id}
                        role="listitem"
                        className={`works-more-row${isActive ? ' is-active' : ''}`}
                        onMouseEnter={() => setHoveredWorkId(project.id)}
                        onFocus={() => setHoveredWorkId(project.id)}
                        onClick={() => onSelectProject(project)}
                      >
                        <div className="works-more-row-text">
                          <span className="works-more-row-title">
                            {project.title}
                          </span>
                          <span className="works-more-row-sub">
                            {project.category} · {project.techStack.slice(0, 3).join(' · ')}
                          </span>
                        </div>
                        <ArrowRight
                          size={16}
                          className="works-more-row-arrow"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>

                {activePreviewProject && (
                  <div className="works-more-preview-pane">
                    <div
                      className="works-more-preview-card"
                      onClick={() => onSelectProject(activePreviewProject)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${activePreviewProject.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectProject(activePreviewProject);
                        }
                      }}
                    >
                      <div className="works-more-preview-media">
                        {activePreviewProject.artworkVariant ? (
                          <ProjectArtwork
                            variant={activePreviewProject.artworkVariant}
                            title={activePreviewProject.title}
                          />
                        ) : (
                          <img
                            src={activePreviewProject.imageSrc}
                            alt={activePreviewProject.imageAlt}
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                      <div className="works-more-preview-caption">
                        <span className="works-more-preview-year tabular-nums">
                          {activePreviewProject.year}
                        </span>
                        <p className="works-more-preview-title">
                          {activePreviewProject.title}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="works-progress-rail" aria-hidden="true">
          <div className="works-progress-track">
            <div ref={progressBarRef} className="works-progress-fill" />
          </div>
          <span ref={progressTextRef} className="works-progress-pct tabular-nums">
            0%
          </span>
        </div>

        <div className="works-stage-bottombar">
          <button
            type="button"
            className="works-skip-btn"
            onClick={handleSkipAhead}
          >
            <span>SKIP AHEAD</span>
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
