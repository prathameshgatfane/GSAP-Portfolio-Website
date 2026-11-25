import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { ProjectItem } from '../../types/portfolio';
import { ProjectArtwork } from '../common/ProjectArtwork';

interface WorksSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

interface FeedColumnConfig {
  id: string;
  direction: 'up' | 'down';
  speed: number;
  items: ProjectItem[];
}

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const DRAG_THRESHOLD = 6;
const SMOOTH_TAU = 0.28;
const GLIDE_TAU = 0.75;
const MAX_FLING = 2600;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

function getColumnCount(width: number): 1 | 2 | 3 {
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 3;
}

function buildFeedColumns(columnCount: 1 | 2 | 3): FeedColumnConfig[] {
  if (columnCount === 1) {
    return [
      {
        id: 'col-mobile',
        direction: 'up',
        speed: 34,
        items: PROJECTS_DATA,
      },
    ];
  }

  if (columnCount === 2) {
    return [
      {
        id: 'col-tablet-1',
        direction: 'up',
        speed: 36,
        items: PROJECTS_DATA.filter((_, idx) => idx % 2 === 0),
      },
      {
        id: 'col-tablet-2',
        direction: 'down',
        speed: 34,
        items: PROJECTS_DATA.filter((_, idx) => idx % 2 === 1),
      },
    ];
  }

  return [
    {
      id: 'col-desktop-1',
      direction: 'up',
      speed: 38,
      items: [PROJECTS_DATA[0], PROJECTS_DATA[3]],
    },
    {
      id: 'col-desktop-2',
      direction: 'down',
      speed: 34,
      items: [PROJECTS_DATA[1], PROJECTS_DATA[4]],
    },
    {
      id: 'col-desktop-3',
      direction: 'up',
      speed: 40,
      items: [PROJECTS_DATA[2], PROJECTS_DATA[5]],
    },
  ];
}

interface VerticalFeedColumnProps {
  config: FeedColumnConfig;
  onSelectProject: (project: ProjectItem) => void;
}

function VerticalFeedColumn({
  config,
  onSelectProject,
}: VerticalFeedColumnProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const suppressUntilRef = useRef<number>(0);

  const copies = config.items.length <= 2 ? 4 : 3;

  const engineConfig = useMemo(
    () => ({
      speed: config.speed,
      dirSign: config.direction === 'up' ? 1 : -1,
    }),
    [config.speed, config.direction],
  );

  const configRef = useRef(engineConfig);

  useIsomorphicLayoutEffect(() => {
    configRef.current = engineConfig;
  }, [engineConfig]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    const st = {
      offset: 0,
      velocity: 0,
      period: 0,
      hovered: false,
      focused: false,
      glide: false,
      reduced: !!motionQuery?.matches,
      visible: typeof IntersectionObserver === 'undefined',
      destroyed: false,
      raf: 0,
      last: 0,
      drag: null as {
        id: number;
        startY: number;
        startX: number;
        active: boolean;
        anchor: number;
        offset: number;
        samples: Array<[number, number]>;
      } | null,
      nudgeOffset: 0,
    };

    const measure = () => {
      const lists = track.children;
      if (!lists.length) {
        st.period = 0;
        return;
      }
      const firstRect = lists[0].getBoundingClientRect();
      const secondRect = lists[1]?.getBoundingClientRect();
      st.period = secondRect ? secondRect.top - firstRect.top : firstRect.height;

      if (st.period > 0 && st.offset === 0 && configRef.current.dirSign < 0) {
        st.offset = st.period * 0.5;
      }
    };

    const applyTransform = () => {
      if (st.period <= 0) return;
      const wrapped = ((st.offset % st.period) + st.period) % st.period;
      st.offset = wrapped;
      track.style.transform = `translate3d(0px, ${(-wrapped).toFixed(2)}px, 0px)`;
    };

    const frame = (now: number) => {
      st.raf = 0;
      if (st.destroyed || st.period <= 0) return;

      const dt = st.last ? clamp((now - st.last) / 1000, 0, 0.1) : 0;
      st.last = now;

      const { speed, dirSign } = configRef.current;
      const baseTarget = st.reduced
        ? 0
        : st.focused
          ? 0
          : st.hovered
            ? speed * 0.22 * dirSign
            : speed * dirSign;

      if (!st.drag?.active) {
        const tau = st.glide ? GLIDE_TAU : SMOOTH_TAU;
        st.velocity += (baseTarget - st.velocity) * (1 - Math.exp(-dt / tau));
        if (st.glide && Math.abs(st.velocity - baseTarget) < 3) {
          st.glide = false;
        }
        if (Math.abs(st.velocity - baseTarget) < 0.05) {
          st.velocity = baseTarget;
        }
        st.offset += st.velocity * dt;

        if (Math.abs(st.nudgeOffset) > 0.2) {
          const step = st.nudgeOffset * (1 - Math.exp(-dt / 0.14));
          st.offset += step;
          st.nudgeOffset -= step;
        } else {
          st.nudgeOffset = 0;
        }
      }

      applyTransform();

      const busy =
        st.drag?.active ||
        st.velocity !== 0 ||
        baseTarget !== 0 ||
        Math.abs(st.nudgeOffset) > 0.2;

      if (busy && st.visible && !st.destroyed) {
        st.raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (st.raf || st.destroyed || !st.visible) return;
      st.last = 0;
      st.raf = requestAnimationFrame(frame);
    };

    const onEnter = () => {
      st.hovered = true;
      wake();
    };

    const onLeave = () => {
      st.hovered = false;
      wake();
    };

    const onFocusIn = () => {
      st.focused = true;
      wake();
    };

    const onFocusOut = (event: FocusEvent) => {
      if (viewport.contains(event.relatedTarget as Node | null)) return;
      st.focused = false;
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      st.drag = {
        id: event.pointerId,
        startY: event.clientY,
        startX: event.clientX,
        active: false,
        anchor: 0,
        offset: st.offset,
        samples: [],
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const d = st.drag;
      if (!d || event.pointerId !== d.id) return;

      const deltaY = event.clientY - d.startY;
      const deltaX = event.clientX - d.startX;

      if (!d.active) {
        if (Math.abs(deltaY) < DRAG_THRESHOLD) return;
        if (Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
          st.drag = null;
          return;
        }
        d.active = true;
        d.anchor = deltaY;
        d.offset = st.offset;
        st.glide = false;
        st.velocity = 0;
        st.nudgeOffset = 0;
        viewport.setAttribute('data-dragging', '');
        try {
          viewport.setPointerCapture(event.pointerId);
        } catch (err) {
          void err;
        }
      }

      const P = st.period || 1;
      const next = d.offset - (deltaY - d.anchor);
      st.offset = ((next % P) + P) % P;
      d.offset += st.offset - next;

      const now = performance.now();
      d.samples.push([now, deltaY]);
      while (d.samples.length > 2 && now - d.samples[0][0] > 100) {
        d.samples.shift();
      }
      applyTransform();
      wake();
    };

    const endDrag = (event: PointerEvent, cancelled: boolean) => {
      const d = st.drag;
      if (!d || event.pointerId !== d.id) return;
      st.drag = null;
      if (!d.active) return;

      viewport.removeAttribute('data-dragging');
      try {
        viewport.releasePointerCapture(event.pointerId);
      } catch (err) {
        void err;
      }

      const now = performance.now();
      suppressUntilRef.current = now + 350;

      let flingVel = 0;
      const samples = d.samples;
      if (!cancelled && samples.length > 1) {
        const [t0, y0] = samples[0];
        const [t1, y1] = samples[samples.length - 1];
        if (t1 > t0 && now - t1 < 90) {
          flingVel = clamp((-(y1 - y0) / (t1 - t0)) * 1000, -MAX_FLING, MAX_FLING);
        }
      }
      st.velocity = flingVel;
      st.glide = Math.abs(flingVel) > 24;
      wake();
    };

    const onPointerUp = (event: PointerEvent) => endDrag(event, false);
    const onPointerCancel = (event: PointerEvent) => endDrag(event, true);

    const onClickCapture = (event: MouseEvent) => {
      if (performance.now() < suppressUntilRef.current) {
        event.preventDefault();
        event.stopPropagation();
        suppressUntilRef.current = 0;
      }
    };

    const onDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        st.nudgeOffset += 160;
        wake();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        st.nudgeOffset -= 160;
        wake();
      }
    };

    const onMotionChange = () => {
      st.reduced = !!motionQuery?.matches;
      wake();
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measure();
        applyTransform();
        wake();
      });
      resizeObserver.observe(viewport);
      if (track.children[0]) {
        resizeObserver.observe(track.children[0]);
      }
    } else {
      window.addEventListener('resize', measure);
    }

    let intersection: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersection = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          st.visible = entry.isIntersecting;
          if (st.visible) wake();
        },
        { threshold: 0.05 },
      );
      intersection.observe(viewport);
    }

    const onVisibility = () => {
      if (!document.hidden) wake();
    };

    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerCancel);
    viewport.addEventListener('lostpointercapture', onPointerCancel);
    viewport.addEventListener('click', onClickCapture, true);
    viewport.addEventListener('dragstart', onDragStart);
    viewport.addEventListener('focusin', onFocusIn);
    viewport.addEventListener('focusout', onFocusOut);
    viewport.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibility);
    motionQuery?.addEventListener?.('change', onMotionChange);

    measure();
    applyTransform();
    wake();

    return () => {
      st.destroyed = true;
      if (st.raf) cancelAnimationFrame(st.raf);
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerCancel);
      viewport.removeEventListener('lostpointercapture', onPointerCancel);
      viewport.removeEventListener('click', onClickCapture, true);
      viewport.removeEventListener('dragstart', onDragStart);
      viewport.removeEventListener('focusin', onFocusIn);
      viewport.removeEventListener('focusout', onFocusOut);
      viewport.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery?.removeEventListener?.('change', onMotionChange);
      resizeObserver?.disconnect();
      intersection?.disconnect();
    };
  }, [copies]);

  const fadeMaskStyle = {
    WebkitMaskImage:
      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)',
    maskImage:
      'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%)',
  } as CSSProperties;

  return (
    <div
      ref={viewportRef}
      className="works-feed-col"
      style={fadeMaskStyle}
      role="region"
      aria-label={`Projects column flowing ${config.direction}`}
    >
      <div ref={trackRef} className="works-feed-track">
        {Array.from({ length: copies }, (_, copyIndex) => (
          <div
            key={`${config.id}-copy-${copyIndex}`}
            className="works-feed-list"
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {config.items.map((project) => (
              <article
                key={`${config.id}-${copyIndex}-${project.id}`}
                className="works-feed-card"
              >
                <button
                  type="button"
                  className="works-feed-card-trigger"
                  tabIndex={copyIndex === 0 ? 0 : -1}
                  aria-label={`View details for ${project.title}`}
                  onClick={() => onSelectProject(project)}
                >
                  <div
                    className={`works-feed-media is-${project.aspect ?? 'landscape'}`}
                  >
                    {project.artworkVariant ? (
                      <ProjectArtwork
                        variant={project.artworkVariant}
                        title={project.title}
                      />
                    ) : (
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  <div className="works-feed-meta tabular-nums">
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="works-feed-title">{project.title}</h3>
                  <p className="works-feed-desc">{project.description}</p>
                </button>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorksSection({ onSelectProject }: WorksSectionProps) {
  const [columnCount, setColumnCount] = useState<1 | 2 | 3>(() =>
    typeof window === 'undefined' ? 3 : getColumnCount(window.innerWidth),
  );

  useEffect(() => {
    const updateColumns = () => {
      const next = getColumnCount(window.innerWidth);
      setColumnCount((prev) => (prev === next ? prev : next));
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columns = useMemo(
    () => buildFeedColumns(columnCount),
    [columnCount],
  );

  return (
    <section id="works" className="editorial-section works-section">
      <div className="section-container">
        <div className="section-heading-row works-heading-row">
          <div>
            <p className="section-kicker">Selected Works</p>
            <h2 className="section-display-title">
              Shipped web platforms &amp; interfaces
            </h2>
          </div>
        </div>
      </div>

      <div
        className={`works-feed-fullbleed works-feed-reveal cols-${columnCount}`}
      >
        {columns.map((col) => (
          <VerticalFeedColumn
            key={col.id}
            config={col}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
