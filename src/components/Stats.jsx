import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STATS = [
  {
    label: "Events",
    count: 500,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle
          cx="9"
          cy="8"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2.5 19c.6-3.6 3.1-6 6.5-6s5.9 2.4 6.5 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="17"
          cy="8"
          r="2.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M15.8 13.3c2.7.4 4.6 2.5 5.1 5.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "People Inspired",
    count: 1,
    suffix: "M+",
    icon: (
      <svg viewBox="0 0 24 24">
        <path
          d="M4 10h3l3-5v14l-3-5H4v-4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Cities Covered",
    count: 10,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 12h18M12 3c2.5 2.6 4 5.7 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.7-4-9s1.5-6.4 4-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    label: "Years Experience",
    count: 12,
    suffix: "+",
    icon: (
      <svg viewBox="0 0 24 24">
        <path
          d="M12 2.5 14.6 9l6.9.5-5.3 4.5L18 21l-6-3.6L6 21l1.8-7-5.3-4.5L9.4 9 12 2.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function StatNumber({ target }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            if (reduced) {
              setValue(target);
            } else {
              const duration = 1500;
              let start = null;
              const step = (timestamp) => {
                if (start === null) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.floor(eased * target));
                if (progress < 1) requestAnimationFrame(step);
                else setValue(target);
              };
              requestAnimationFrame(step);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span className="stat-number" ref={ref} data-count={target}>
      {value}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((stat, i) => (
          <Reveal
            className="stat-item"
            delay={i ? `${i * 0.1}s` : undefined}
            key={stat.label}
          >
            <span className="stat-icon">{stat.icon}</span>
            <StatNumber target={stat.count} />
            <span className="stat-plus">{stat.suffix}</span>
            <span className="stat-label">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
