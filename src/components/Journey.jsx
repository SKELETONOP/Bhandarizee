import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Phones get a reversible, scroll-driven timeline; desktop keeps the
// original one-time reveal.
const MOBILE_QUERY = "(max-width: 640px)";
// Points switch on once they cross ~80% down the screen.
const POINT_TRIGGER = "0px 0px -20% 0px";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

const TIMELINE = [
  {
    year: "2015",
    title: "First Stage",
    desc: "Took the very first stage, turning a personal journey into a mission to inspire others.",
  },
  {
    year: "2017",
    title: "Corporate Breakthrough",
    desc: "Began delivering keynotes for corporate teams, leadership summits and large conventions.",
    delay: "0.1s",
  },
  {
    year: "2019",
    title: "300,000+ Lives Touched",
    desc: "Crossed a major milestone, reaching lakhs of people across live sessions nationwide.",
    delay: "0.2s",
  },
  {
    year: "2022",
    title: "800,000+ Lives Touched",
    desc: "Nearly tripled that reach, becoming a trusted voice for personal and professional growth.",
    delay: "0.3s",
  },
  {
    year: "2026",
    title: "Explored 10+ Countries",
    desc: "Now carrying the message of resilience and success across stages in 10+ countries.",
    delay: "0.4s",
  },
];

export default function Journey() {
  const isMobile = useIsMobile();
  const timelineRef = useRef(null);
  const [timelineActive, setTimelineActive] = useState(false);

  // Draws the mobile timeline's base line in (and back out) as the
  // section enters and leaves the screen.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el || !isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setTimelineActive(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section className="journey" id="journey">
      <div className="container">
        <Reveal className="section-head center" repeat={isMobile}>
          <p className="eyebrow center">
            <span className="eyebrow-line"></span> Journey
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center">
            The Story So <span className="accent">Far</span>
          </h2>
        </Reveal>

        <div
          ref={timelineRef}
          className={`timeline${timelineActive ? " is-active" : ""}`}
        >
          {TIMELINE.map((item) => (
            <Reveal
              className="timeline-item"
              delay={item.delay}
              repeat={isMobile}
              rootMargin={isMobile ? POINT_TRIGGER : undefined}
              key={item.year}
            >
              <div className="timeline-dot"></div>
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
