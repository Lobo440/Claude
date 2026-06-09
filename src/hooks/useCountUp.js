import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 up to `end` once the element scrolls into view.
 * Returns [ref, value] — attach ref to the element you want to watch.
 */
export default function useCountUp(end, duration = 1600) {
  const ref = useRef(null);
  // Render the final value when there's no browser (static/SSR output);
  // in the browser we start at 0 and animate up on scroll-in.
  const [value, setValue] = useState(() => (typeof window === 'undefined' ? end : 0));
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(end);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutCubic for a snappy finish
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return [ref, value];
}
