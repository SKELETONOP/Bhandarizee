import Reveal from "./Reveal";

const TOPICS = [
  {
    title: "Overcoming Adversity",
    desc: "Turning setbacks into stepping stones for growth.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path
          d="M4 20 14 4l2 4 4-2-2 8 2 6H4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Unlocking Your Potential",
    desc: "Discover your strengths and learn to maximize them.",
    delay: "0.05s",
    icon: (
      <svg viewBox="0 0 24 24">
        <path
          d="M12 2c3 3 4 6 4 9a4 4 0 1 1-8 0c0-3 1-6 4-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 21h6M10 18.5h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Mindset & Motivation",
    desc: "Build a resilient mindset that drives lasting success.",
    delay: "0.1s",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7.5v5l3.2 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Goal Setting & Achievement",
    desc: "Set goals that truly inspire and follow through on them.",
    delay: "0.15s",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Leadership & Influence",
    desc: "Lead with purpose and create meaningful impact.",
    delay: "0.2s",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="7" cy="7" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="16" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.8 8.6 10.6 14M15.2 8.6 13.4 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    title: "Purpose & Fulfillment",
    desc: "Live a life aligned with what matters most to you.",
    delay: "0.25s",
    icon: (
      <svg viewBox="0 0 24 24">
        <path
          d="M9 18h6M10 21h4M12 3a5.5 5.5 0 0 0-3 10.1c.6.4 1 1.1 1 1.9h4c0-.8.4-1.5 1-1.9A5.5 5.5 0 0 0 12 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Topics() {
  return (
    <section className="topics" id="topics">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center">
            <span className="eyebrow-line"></span> Topics
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center">
            What I <span className="accent">Speak</span> About
          </h2>
          <p className="section-sub">
            Engaging topics that inspire, educate and empower every audience.
          </p>
        </Reveal>

        <div className="topics-grid">
          {TOPICS.map((topic) => (
            <Reveal className="topic-card" delay={topic.delay} key={topic.title}>
              <span className="topic-icon">{topic.icon}</span>
              <h3>{topic.title}</h3>
              <p>{topic.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
