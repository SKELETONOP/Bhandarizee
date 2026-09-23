import Reveal from "./Reveal";

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
    title: "Explored 30+ Countries",
    desc: "Now carrying the message of resilience and success across stages in 30+ countries.",
    delay: "0.4s",
  },
];

export default function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center">
            <span className="eyebrow-line"></span> Journey
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center">
            The Story So <span className="accent">Far</span>
          </h2>
        </Reveal>

        <div className="timeline">
          {TIMELINE.map((item) => (
            <Reveal className="timeline-item" delay={item.delay} key={item.year}>
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
