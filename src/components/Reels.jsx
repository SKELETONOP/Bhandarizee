import { useRef } from "react";
import Reveal from "./Reveal";

const REELS = [
  {
    id: "WZxNRd2JVgg",
    thumb: "/images/gallery-1.png",
    title: "Believe In Yourself",
  },
  {
    id: "YOUR_REEL_ID_2",
    thumb: "/images/gallery-2.svg",
    title: "Turning Failure Into Fuel",
  },
  {
    id: "YOUR_REEL_ID_3",
    thumb: "/images/gallery-3.svg",
    title: "Stay Consistent",
  },
  {
    id: "YOUR_REEL_ID_4",
    thumb: "/images/gallery-4.svg",
    title: "Lead With Purpose",
  },
  {
    id: "YOUR_REEL_ID_5",
    thumb: "/images/gallery-5.svg",
    title: "Own Your Story",
  },
  {
    id: "YOUR_REEL_ID_6",
    thumb: "/images/gallery-6.svg",
    title: "Rise Every Day",
  },
  {
    id: "YOUR_REEL_ID_7",
    thumb: "/images/gallery-1.png",
    title: "Dream Big, Start Now",
  },
];

export default function Reels({ onPlay }) {
  const trackRef = useRef(null);

  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".reel-card");
    const amount = card ? card.offsetWidth + 18 : 220;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section className="reels" id="reels">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center light">
            <span className="eyebrow-line"></span> Reels
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center light">
            Quick <span className="accent">Bites</span> of Motivation
          </h2>
          <p className="section-sub light">
            Short, shareable moments from stages and sessions — swipe
            through.
          </p>
        </Reveal>
      </div>

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
              <div className="reel-thumb">
                <img src={reel.thumb} alt={reel.title} loading="lazy" />
                <button
                  className="play-btn"
                  aria-label={`Play reel: ${reel.title}`}
                  onClick={() => onPlay(reel.id)}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <p className="reel-title">{reel.title}</p>
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
    </section>
  );
}
