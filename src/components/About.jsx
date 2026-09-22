import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "Inspiring Talks",
    desc: "Engaging, powerful and thought-provoking keynote sessions.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path
          d="M12 3a5 5 0 0 1 5 5c0 2.5-1.6 4-2.5 5.2-.5.7-.9 1.3-1 2.3H10.5c-.1-1-.5-1.6-1-2.3C8.6 12 7 10.5 7 8a5 5 0 0 1 5-5Zm-2 15h4v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Actionable Strategies",
    desc: "Practical tools your audience can apply right away.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Real Impact",
    desc: "Transforming mindsets and empowering real change.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8" cy="9" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="9" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5M13.5 19c.4-2.6 2.2-4.6 4.5-4.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Proven Experience",
    desc: "Years of experience speaking to diverse audiences.",
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

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <Reveal className="about-photo-wrap">
          <img
            src="/images/about-photo.png"
            alt="B. S. Bhandari, Motivational Speaker"
            className="about-photo"
          />
          <div className="about-photo-badge">
            <strong>12+</strong>
            <span>Years Inspiring</span>
          </div>
        </Reveal>

        <Reveal className="about-content" delay="0.15s">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> About Me
          </p>
          <h2 className="section-title">
            Turning Struggles Into <span className="accent">Stepping Stones</span>
          </h2>
          <p className="about-text">
            My mission is simple: to help people believe in themselves, take
            action, and create extraordinary results. Through powerful
            storytelling, real-life experience, and practical strategies, I
            deliver talks and workshops that don't just motivate for a moment
            — they create lasting change.
          </p>
          <p className="signature-name">B. S. Bhandari</p>
          <p className="signature-role">
            Motivational Speaker · Life Coach · Author
          </p>

          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <div className="feature-item" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
