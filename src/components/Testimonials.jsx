import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "His energy, stories and insights completely transformed the way our team thinks and approaches challenges.",
    name: "Sarah Mitchell",
    role: "HR Director, TechCorp",
    avatar: "/images/testimonial-1.svg",
  },
  {
    quote:
      "One of the most impactful speakers I've ever seen. The audience was engaged from start to finish.",
    name: "David Thompson",
    role: "Event Organizer",
    avatar: "/images/testimonial-2.svg",
    delay: "0.1s",
  },
  {
    quote:
      "Practical, powerful and inspiring. He delivers messages that create real, lasting change.",
    name: "Emily Roberts",
    role: "Marketing Manager",
    avatar: "/images/testimonial-3.svg",
    delay: "0.2s",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-layout">
          <div className="testimonials-col">
            <p className="eyebrow light">
              <span className="eyebrow-line"></span> Testimonials
            </p>
            <h2 className="section-title light">
              What <span className="accent">People</span> Say
            </h2>

            <div className="testimonial-grid">
              {TESTIMONIALS.map((t) => (
                <Reveal className="testimonial-card" delay={t.delay} key={t.name}>
                  <span className="quote-icon">&ldquo;</span>
                  <p>{t.quote}</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="booking-card" delay="0.15s">
            <span className="booking-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="16"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 10h18M8 3v4M16 3v4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h3>Book Me for Your Next Event</h3>
            <p>
              Looking for a speaker who can inspire and create a lasting
              impact? Let's talk.
            </p>
            <a href="#contact" className="btn btn-primary">
              Book Now
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
