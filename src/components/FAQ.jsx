import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "How do I book Bhandari for my event?",
    a: "Simply fill out the contact form below with your event details, or reach out directly by phone or email. We typically respond within 24 hours.",
  },
  {
    q: "What topics does he cover?",
    a: "Mindset, leadership, overcoming adversity, goal setting and purpose — every talk is tailored to your audience and event goals.",
  },
  {
    q: "Does he travel internationally?",
    a: "Yes. Bhandari speaks at events across the country and internationally, both in-person and via live virtual keynotes.",
  },
  {
    q: "What is the typical session length?",
    a: "Keynotes typically run 30-60 minutes, with half-day and full-day workshop formats also available on request.",
  },
  {
    q: "Do you offer virtual sessions?",
    a: "Absolutely. Virtual and hybrid keynotes are available for remote teams and global audiences.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container faq-layout">
        <Reveal className="faq-head">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> FAQ
          </p>
          <h2 className="section-title">
            Frequently Asked <span className="accent">Questions</span>
          </h2>
          <p className="section-sub">
            Everything you need to know before booking a session.
          </p>
        </Reveal>

        <Reveal className="faq-list" delay="0.1s">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <span className="faq-toggle">+</span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
