import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../data/testimonials";
import { videoThumb } from "../data/videos";

function TestimonialCard({ item, isPlaying, onPlay }) {
  return (
    <div className="testimonial-video-card">
      {isPlaying ? (
        <div className="testimonial-video-frame">
          <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(
              item.videoId
            )}?autoplay=1&rel=0`}
            title={`${item.name} testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <button
          type="button"
          className="testimonial-play-trigger"
          onClick={onPlay}
          aria-label={`Play testimonial from ${item.name}`}
        >
          <img
            src={videoThumb(item.videoId)}
            alt={`${item.name} testimonial thumbnail`}
            loading="lazy"
          />
          <span className="testimonial-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}

      <span className="testimonial-video-info">
        <strong>{item.name}</strong>
        <span>{item.role}</span>
      </span>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".testimonial-video-card");
    const amount = card ? card.offsetWidth + 18 : 220;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

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

            <div className="testimonial-scroller">
              <button
                type="button"
                className="testimonial-nav testimonial-nav-prev"
                aria-label="Scroll testimonials left"
                onClick={() => scrollByCards(-1)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
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

              <div className="testimonial-track" ref={trackRef}>
                {TESTIMONIALS.map((item, i) => (
                  <Reveal
                    className="testimonial-video-wrap"
                    delay={i ? `${Math.min(i * 0.05, 0.25)}s` : undefined}
                    key={item.name}
                  >
                    <TestimonialCard
                      item={item}
                      isPlaying={playingIndex === i}
                      onPlay={() => setPlayingIndex(i)}
                    />
                  </Reveal>
                ))}
              </div>

              <button
                type="button"
                className="testimonial-nav testimonial-nav-next"
                aria-label="Scroll testimonials right"
                onClick={() => scrollByCards(1)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
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
            <div className="booking-card-text">
              <h3>Book Me for Your Next Event</h3>
              <p>
                Looking for a speaker who can inspire and create a lasting
                impact? Let's talk.
              </p>
            </div>
            <a href="#contact" className="btn btn-primary">
              Book Now
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
