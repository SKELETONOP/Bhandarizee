import { useState } from "react";
import Reveal from "./Reveal";
import TopicModal from "./TopicModal";

const TOPICS = [
  {
    title: "Overcoming Adversity",
    photo: "/images/topics/overcoming-adversity-bs-bhandari-keynote.webp",
    desc: "Turning setbacks into stepping stones for growth.",
    quoteSanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।",
    quoteHindi: "उद्यम करने से ही कार्य सिद्ध होते हैं, केवल इच्छा करने से नहीं।",
    quoteEnglish: "Great works are accomplished through effort, not mere wishing.",
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
    photo: "/images/topics/unlocking-your-potential-bs-bhandari-leadership-training.webp",
    desc: "Discover your strengths and learn to maximize them.",
    delay: "0.05s",
    quoteSanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।",
    quoteHindi: "उठो, जागो और लक्ष्य की प्राप्ति तक रुको मत।",
    quoteEnglish: "Arise, awake, and stop not till the goal is reached.",
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
    photo: "/images/topics/mindset-and-motivation-bs-bhandari-portrait.webp",
    desc: "Build a resilient mindset that drives lasting success.",
    delay: "0.1s",
    quoteSanskrit: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः।",
    quoteHindi: "मन ही मनुष्य के बंधन और मुक्ति, दोनों का कारण है।",
    quoteEnglish: "The mind alone is the cause of both bondage and freedom.",
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
    photo: "/images/topics/goal-setting-and-achievement-bs-bhandari-success.webp",
    desc: "Set goals that truly inspire and follow through on them.",
    delay: "0.15s",
    quoteSanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    quoteHindi: "तुम्हारा अधिकार केवल कर्म करने में है, फल की चिंता कभी मत करो।",
    quoteEnglish: "Your right is to action alone, never to its fruits.",
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
    photo: "/images/topics/leadership-and-influence-bs-bhandari-portrait.webp",
    desc: "Lead with purpose and create meaningful impact.",
    delay: "0.2s",
    quoteSanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।",
    quoteHindi: "श्रेष्ठ व्यक्ति जैसा आचरण करता है, बाकी लोग वैसा ही अनुसरण करते हैं।",
    quoteEnglish: "Whatever a great person does, others follow.",
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
    photo: "/images/topics/purpose-and-fulfillment-bs-bhandari-namaste.webp",
    desc: "Live a life aligned with what matters most to you.",
    delay: "0.25s",
    quoteSanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।",
    quoteHindi: "सभी सुखी हों, सभी निरोगी हों — यही जीवन का सच्चा उद्देश्य है।",
    quoteEnglish: "May all be happy, may all be free from illness.",
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
  const [openTopic, setOpenTopic] = useState(null);
  const [flippingTitle, setFlippingTitle] = useState(null);

  function handleSelect(topic) {
    setFlippingTitle(topic.title);
    setOpenTopic(topic);
    window.setTimeout(() => setFlippingTitle(null), 600);
  }

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
            <Reveal
              as="button"
              type="button"
              className={`topic-card${
                flippingTitle === topic.title ? " is-flipping" : ""
              }`}
              delay={topic.delay}
              key={topic.title}
              onClick={() => handleSelect(topic)}
            >
              <span className="topic-card-face">
                <span className="topic-icon">{topic.icon}</span>
                <h3>{topic.title}</h3>
                <p>{topic.desc}</p>
                <span className="topic-card-hint">Tap for a quote</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      <TopicModal topic={openTopic} onClose={() => setOpenTopic(null)} />
    </section>
  );
}
