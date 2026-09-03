'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { ASSETS } from '@/lib/assets';

// Sticky sections follow native scroll. Tabs only jump to the matching offset.
export function usePinnedSteps(count: number) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = useRef(0);
  const navigate = useRef<(index: number) => void>(() => {});
  const choose = useCallback((index: number) => navigate.current(index), []);

  useEffect(() => {
    const el = root.current,
      panel = stage.current;
    if (!el || !panel) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame = 0,
      programmatic = false;
    const geometry = () => {
      const start = el.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(1, el.offsetHeight - panel.offsetHeight);
      return { start, end: start + range, step: range / Math.max(1, count - 1) };
    };
    const select = (index: number) => {
      const next = Math.max(0, Math.min(count - 1, index));
      if (current.current === next) return;
      setDirection(next > current.current ? 1 : -1);
      current.current = next;
      setActive(next);
    };
    const jump = (top: number) => {
      programmatic = true;
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo({ top, left: 0, behavior: 'instant' });
      html.style.scrollBehavior = previous;
      requestAnimationFrame(() => {
        programmatic = false;
      });
    };
    navigate.current = (index) => {
      select(index);
      if (!media.matches) {
        const { start, step } = geometry();
        jump(start + current.current * step);
      }
    };
    const sync = () => {
      scrollFrame = 0;
      if (programmatic || media.matches) return;
      const { start, end, step } = geometry();
      const y = window.scrollY;
      if (y < start - 48 || y > end + 48) return;
      select(Math.round((y - start) / step));
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(sync);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    media.addEventListener('change', sync);
    sync();
    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      media.removeEventListener('change', sync);
    };
  }, [count]);
  return { root, stage, active, choose, direction };
}

export function CountUp({
  value,
  suffix = '',
  decimals = 0,
  grouped = false,
  className = '',
  gauge = false,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  grouped?: boolean;
  className?: string;
  gauge?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [amount, setAmount] = useState(value);
  const format = (n: number) =>
    grouped ? Math.round(n).toLocaleString('ru-RU') : n.toFixed(decimals);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0,
      played = false;
    setAmount(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1600);
          setAmount(value * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span
      ref={ref}
      className={'count-up ' + className + (gauge ? ' ring' : '')}
      data-target={value}
      aria-label={format(value) + suffix}
      style={
        gauge ? ({ '--progress': amount + '%' } as CSSProperties) : undefined
      }
    >
      {gauge ? (
        <b aria-hidden="true">
          {format(amount)}
          {suffix}
        </b>
      ) : (
        <span aria-hidden="true">
          {format(amount)}
          {suffix}
        </span>
      )}
    </span>
  );
}

export function Dashboard({ kind, label }: { kind: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch(ASSETS + 'dashboard-' + kind + '.svg', { signal: controller.signal })
      .then((response) => response.text())
      .then(setMarkup)
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error);
      });
    return () => controller.abort();
  }, [kind]);
  useEffect(() => {
    const el = ref.current;
    if (!el || !markup) return;
    el.querySelectorAll('foreignObject').forEach((node) => node.remove());
    el.querySelectorAll('[data-figma-bg-blur-radius]').forEach((node) =>
      node.removeAttribute('filter'),
    );
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counters = Array.from(el.querySelectorAll('[data-counter]'));
    let frame = 0,
      played = false;
    if (!reduced)
      counters.forEach((counter) => {
        counter.textContent = '0%';
      });
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.setAttribute('data-visible', String(entry.isIntersecting));
        if (!entry.isIntersecting || played || reduced) return;
        played = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1600);
          counters.forEach((counter) => {
            counter.textContent =
              Math.round(
                Number(counter.getAttribute('data-counter')) *
                  (1 - Math.pow(1 - progress, 3)),
              ) + '%';
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [markup]);
  return (
    <div
      ref={ref}
      className={'hero-widget widget-' + kind}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
