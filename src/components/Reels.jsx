import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const SPEAKER_AVATAR = "/images/about-photo.png";

const REELS = [
  {
    id: "WZxNRd2JVgg",
    thumb: "/images/gallery-1.png",
    title: "Believe In Yourself",
    context: "Corporate Keynote",
  },
  {
    id: "YOUR_REEL_ID_2",
    thumb: "/images/gallery-2.svg",
    title: "Turning Failure Into Fuel",
    context: "College Seminar",
  },
  {
    id: "YOUR_REEL_ID_3",
    thumb: "/images/gallery-3.svg",
    title: "Stay Consistent",
    context: "Leadership Workshop",
  },
  {
    id: "YOUR_REEL_ID_4",
    thumb: "/images/gallery-4.svg",
    title: "Lead With Purpose",
    context: "Virtual Session",
  },
  {
    id: "YOUR_REEL_ID_5",
    thumb: "/images/gallery-5.svg",
    title: "Own Your Story",
    context: "Corporate Keynote",
  },
  {
    id: "YOUR_REEL_ID_6",
    thumb: "/images/gallery-6.svg",
    title: "Rise Every Day",
    context: "Conference Talk",
  },
  {
    id: "YOUR_REEL_ID_7",
    thumb: "/images/gallery-1.png",
    title: "Dream Big, Start Now",
    context: "College Seminar",
  },
];

export default function Reels({ onPlay }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".reel-card");
    const amount = card ? card.offsetWidth + 18 : 220;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  function scrollToIndex(index) {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    function updateActive() {
      ticking = false;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    }

    updateActive();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="reels" id="reels">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center light">
            <span className="eyebrow-line"></span> Testimonials
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center light">
            Video <span className="accent">Testimonials</span>
          </h2>
          <p className="section-sub light">
            Tap to watch real reactions from stages, workshops and sessions.
          </p>
        </Reveal>

        <div className="reels-scroller">
          <button
            type="button"
            className="reels-nav reels-nav-prev"
            aria-label="Scroll reels left"
            onClick={() => scrollByCards(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="reels-track" id="reelsTrack" ref={trackRef}>
            {REELS.map((reel, i) => (
              <Reveal
                className="reel-card"
                delay={i ? `${Math.min(i * 0.05, 0.3)}s` : undefined}
                key={reel.id + reel.title}
              >
                <button
                  type="button"
                  className="reel-card-media"
                  ref={(el) => (cardRefs.current[i] = el)}
                  onClick={() => onPlay(reel.id)}
                  aria-label={`Play reel: ${reel.title}`}
                >
                  <img src={reel.thumb} alt={reel.title} loading="lazy" />
                  <span className="reel-badge">
                    {i + 1}/{REELS.length}
                  </span>
                  <span className="reel-info">
                    <span className="reel-avatar">
                      <img src={SPEAKER_AVATAR} alt="" />
                    </span>
                    <span className="reel-meta">
                      <strong>{reel.title}</strong>
                      <span>{reel.context}</span>
                    </span>
                    <span className="reel-play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="13" height="13">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <button
            type="button"
            className="reels-nav reels-nav-next"
            aria-label="Scroll reels right"
            onClick={() => scrollByCards(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="reels-dots" role="tablist" aria-label="Reel navigation">
          {REELS.map((reel, i) => (
            <button
              key={reel.id + reel.title}
              type="button"
              className={`reels-dot${i === activeIndex ? " active" : ""}`}
              aria-label={`Go to reel ${i + 1}`}
              aria-selected={i === activeIndex}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
