import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../data/testimonials";

// Muted looping player that only loads/plays while it's on screen, with
// the same top-right mute toggle as the Shorts section.
function TestimonialCard({ item, muted, onToggleMute }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <div className="testimonial-video-card">
      <div className="testimonial-video-frame">
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${item.name} — ${item.role} video testimonial`}
        />
      </div>

      <button
        type="button"
        className="reel-mute-btn"
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={onToggleMute}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
            <path
              d="M16 9l5 6M21 9l-5 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="15" height="15">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
            <path
              d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      <span className="testimonial-video-info">
        <strong>{item.name}</strong>
        <span>{item.role}</span>
      </span>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  // Only one testimonial plays with sound at a time.
  const [unmutedIndex, setUnmutedIndex] = useState(null);

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
                    key={item.src}
                  >
                    <TestimonialCard
                      item={item}
                      muted={unmutedIndex !== i}
                      onToggleMute={() =>
                        setUnmutedIndex((cur) => (cur === i ? null : i))
                      }
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
