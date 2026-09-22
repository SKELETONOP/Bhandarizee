import Reveal from "./Reveal";

const TIMELINE = [
  {
    year: "2012",
    title: "First Stage",
    desc: "Began speaking at local colleges and community events.",
  },
  {
    year: "2016",
    title: "Corporate Breakthrough",
    desc: "Started delivering keynotes for corporate teams and leadership summits.",
    delay: "0.1s",
  },
  {
    year: "2019",
    title: "Published Author",
    desc: "Released a book on resilience and mindset, reaching readers nationwide.",
    delay: "0.2s",
  },
  {
    year: "2022",
    title: "200,000+ Lives Touched",
    desc: "Crossed a major milestone in people reached across live and virtual sessions.",
    delay: "0.3s",
  },
  {
    year: "2026",
    title: "Going Global",
    desc: "Now booking international keynotes, workshops and executive coaching.",
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
