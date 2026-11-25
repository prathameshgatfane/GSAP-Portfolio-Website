import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

const SLOP = { fine: 4, coarse: 8 } as const;
const TILT_SPRING = { stiffness: 240, damping: 24, mass: 0.6 };
const LIFT_SPRING = { stiffness: 320, damping: 26 };
const FLING = 0.16;
const HISTORY_MS = 90;

const clamp = (value: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, value));
const snap = (deg: number): number => Math.round(deg / 180) * 180;
const isBack = (deg: number): boolean => Math.abs(Math.round(deg / 180)) % 2 === 1;

interface GripState {
  id: number;
  x: number;
  y: number;
  base: number;
  moved: boolean;
  slop: number;
  width: number;
  height: number;
  hist: Array<{ t: number; v: number }>;
}

export interface FlipCardProps {
  front?: ReactNode;
  back?: ReactNode;
  flipped?: boolean;
  defaultFlipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
  axis?: 'x' | 'y';
  flipOnClick?: boolean;
  draggable?: boolean;
  dragDistance?: number;
  tilt?: boolean;
  tiltMax?: number;
  glare?: boolean;
  glareOpacity?: number;
  hoverScale?: number;
  perspective?: number;
  stiffness?: number;
  damping?: number;
  width?: number | string;
  height?: number | string;
  radius?: number;
  background?: string;
  color?: string;
  shadow?: boolean;
  shadowColor?: string;
  shadowOpacity?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function FlipCard({
  front = null,
  back = null,
  flipped,
  defaultFlipped = false,
  onFlipChange,
  axis = 'y',
  flipOnClick = true,
  draggable = true,
  dragDistance = 0,
  tilt = true,
  tiltMax = 12,
  glare = true,
  glareOpacity = 0.22,
  hoverScale = 1.03,
  perspective = 1100,
  stiffness = 170,
  damping = 20,
  width,
  height,
  radius = 18,
  background = 'var(--bg-primary)',
  color = 'var(--text-primary)',
  shadow = true,
  shadowColor = '#000000',
  shadowOpacity = 0.28,
  disabled = false,
  ariaLabel = 'Flip certificate card',
  className = '',
}: FlipCardProps) {
  const reduce = useReducedMotion();
  const controlled = flipped !== undefined;
  const [inner, setInner] = useState(defaultFlipped);
  const [dragging, setDragging] = useState(false);

  const shown = controlled ? Boolean(flipped) : inner;
  const shownRef = useRef(shown);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const grip = useRef<GripState | null>(null);
  const spin = useRef<{ stop: () => void } | null>(null);
  const target = useRef<number>(shown ? 180 : 0);

  const turn = useMotionValue(shown ? 180 : 0);
  const tiltX = useSpring(0, TILT_SPRING);
  const tiltY = useSpring(0, TILT_SPRING);
  const lift = useSpring(1, LIFT_SPRING);
  const sheen = useSpring(0, LIFT_SPRING);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const sumX = useTransform([turn, tiltX], ([t, x]) => (t as number) + (x as number));
  const sumY = useTransform([turn, tiltY], ([t, y]) => (t as number) + (y as number));
  const turnY = useMotionTemplate`perspective(${perspective}px) scale(${lift}) rotateX(${tiltX}deg) rotateY(${sumY}deg)`;
  const turnX = useMotionTemplate`perspective(${perspective}px) scale(${lift}) rotateY(${tiltY}deg) rotateX(${sumX}deg)`;
  const facing = useTransform(turn, (t) => Math.abs(Math.cos((t * Math.PI) / 180)));
  const spread = useTransform(facing, (f) => 0.08 + 0.92 * f);
  const shade = useTransform(facing, (f) => 0.1 + 0.9 * f * f);
  const gxPct = useMotionTemplate`${gx}%`;
  const gyPct = useMotionTemplate`${gy}%`;

  useEffect(() => {
    shownRef.current = shown;
  }, [shown]);

  const settle = (to: number, velocity: number, instant?: boolean) => {
    spin.current?.stop();
    target.current = to;
    if (instant || reduce) {
      turn.jump(to);
    } else {
      spin.current = animate(turn, to, {
        type: 'spring',
        stiffness,
        damping,
        velocity,
        restDelta: 0.05,
      });
    }
    const next = isBack(to);
    if (next === shownRef.current) return;
    shownRef.current = next;
    if (!controlled) setInner(next);
    onFlipChange?.(next);
  };

  const flip = (instant?: boolean) => {
    const base = snap(turn.get());
    settle(isBack(base) ? base - 180 : base + 180, 0, instant);
  };

  const rest = () => {
    tiltX.set(0);
    tiltY.set(0);
    sheen.set(0);
    lift.set(1);
  };

  useEffect(() => {
    if (!controlled || isBack(target.current) === Boolean(flipped)) return;
    const base = target.current;
    spin.current?.stop();
    target.current = isBack(base) ? base - 180 : base + 180;
    if (reduce) {
      turn.jump(target.current);
    } else {
      spin.current = animate(turn, target.current, {
        type: 'spring',
        stiffness,
        damping,
        restDelta: 0.05,
      });
    }
  }, [flipped, controlled, reduce, turn, stiffness, damping]);

  useEffect(() => () => spin.current?.stop(), []);

  useEffect(() => {
    if (disabled) {
      tiltX.set(0);
      tiltY.set(0);
      sheen.set(0);
      lift.set(1);
    }
  }, [disabled, tiltX, tiltY, sheen, lift]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0 || grip.current) return;
    const targetEl = event.target as HTMLElement | null;
    const nestedAction = targetEl?.closest('a, button');
    if (nestedAction && nestedAction !== event.currentTarget) return;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore synthetic capture failures on unsupported pointers
    }
    spin.current?.stop();
    const rect = event.currentTarget.getBoundingClientRect();
    grip.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      base: turn.get(),
      moved: false,
      slop: event.pointerType === 'touch' ? SLOP.coarse : SLOP.fine,
      width: rect.width || 360,
      height: rect.height || 260,
      hist: [],
    };
    if (!reduce) lift.set(hoverScale);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const g = grip.current;
    if (g && g.id === event.pointerId) {
      const delta = axis === 'x' ? event.clientY - g.y : event.clientX - g.x;
      if (!g.moved) {
        if (Math.abs(delta) < g.slop || !draggable || reduce) return;
        g.moved = true;
        setDragging(true);
        tiltX.set(0);
        tiltY.set(0);
        sheen.set(0);
      }
      const span =
        dragDistance > 0
          ? dragDistance
          : axis === 'x'
            ? g.height
            : g.width;
      const deg = g.base + (axis === 'x' ? -1 : 1) * (delta / Math.max(1, span)) * 180;
      turn.set(deg);
      const now = performance.now();
      g.hist.push({ t: now, v: deg });
      while (g.hist.length > 2 && now - g.hist[0].t > HISTORY_MS) {
        g.hist.shift();
      }
      return;
    }

    if (!tilt || reduce || disabled || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    tiltX.set((0.5 - py) * 2 * tiltMax);
    tiltY.set((px - 0.5) * 2 * tiltMax);
    gx.set(px * 100);
    gy.set(py * 100);
    sheen.set(1);
  };

  const release = (event: PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const g = grip.current;
    if (!g || g.id !== event.pointerId) return;
    grip.current = null;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore release errors if pointer capture was already cleared
    }
    setDragging(false);
    if (event.pointerType === 'touch' || !rootRef.current?.matches(':hover')) {
      rest();
    }
    if (!g.moved) {
      if (!cancelled && flipOnClick) flip(false);
      else settle(target.current, 0, false);
      return;
    }

    const here = turn.get();
    let velocity = 0;
    const a = g.hist[0];
    const b = g.hist[g.hist.length - 1];
    if (!cancelled && a && b && b.t > a.t && performance.now() - b.t < 60) {
      velocity = ((b.v - a.v) / (b.t - a.t)) * 1000;
    }
    const to = cancelled
      ? snap(g.base)
      : clamp(snap(here + velocity * FLING), snap(here) - 180, snap(here) + 180);
    settle(to, velocity, false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return;
    const targetEl = event.target as HTMLElement | null;
    if (targetEl && targetEl !== event.currentTarget && targetEl.closest('a, button')) {
      return;
    }
    event.preventDefault();
    if (!event.repeat) flip(Boolean(reduce));
  };

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || event.detail !== 0) return;
    const targetEl = event.target as HTMLElement | null;
    if (targetEl && targetEl !== event.currentTarget && targetEl.closest('a, button')) {
      return;
    }
    flip(Boolean(reduce));
  };

  const rootStyle: CSSProperties & Record<string, string | number | undefined> = {
    '--fc-radius': `${radius}px`,
    '--fc-bg': background,
    '--fc-ink': color,
    '--fc-shadow': shadowColor,
    '--fc-shadow-o': shadowOpacity,
    '--fc-glare': glareOpacity,
    ...(width !== undefined
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : {}),
    ...(height !== undefined
      ? { height: typeof height === 'number' ? `${height}px` : height }
      : {}),
  };

  const rotorMotionStyle = reduce
    ? undefined
    : ({
        transform: axis === 'x' ? turnX : turnY,
        '--fc-gx': gxPct,
        '--fc-gy': gyPct,
        '--fc-sheen': sheen,
      } as unknown as CSSProperties);

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={shown}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={`fc-root${className ? ` ${className}` : ''}`}
      data-axis={axis}
      data-draggable={draggable && !disabled && !reduce ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-fade={reduce ? (shown ? 'back' : 'front') : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => release(e, false)}
      onPointerCancel={(e) => release(e, true)}
      onLostPointerCapture={(e) => release(e, true)}
      onPointerEnter={(e) => {
        if (!reduce && !disabled && e.pointerType !== 'touch') {
          lift.set(hoverScale);
        }
      }}
      onPointerLeave={() => {
        if (!grip.current) rest();
      }}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onDragStart={(e) => e.preventDefault()}
      style={rootStyle}
    >
      {shadow ? (
        <motion.span
          className="fc-shadow"
          aria-hidden="true"
          style={
            axis === 'x'
              ? { scaleY: spread, opacity: shade }
              : { scaleX: spread, opacity: shade }
          }
        />
      ) : null}

      <motion.div className="fc-rotor" style={rotorMotionStyle}>
        <div
          className="fc-face fc-face-front"
          aria-hidden={shown}
          inert={shown || undefined}
        >
          {front}
          {glare ? <span className="fc-glare" aria-hidden="true" /> : null}
        </div>

        <div
          className="fc-face fc-face-back"
          aria-hidden={!shown}
          inert={!shown || undefined}
        >
          {back}
          {glare ? <span className="fc-glare" aria-hidden="true" /> : null}
        </div>
      </motion.div>
    </div>
  );
}
