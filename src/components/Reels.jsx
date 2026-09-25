import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { loadYouTubeIframeApi } from "../lib/youtubeIframeApi";

const SPEAKER_AVATAR = "/images/bs-bhandari-avatar.webp";

// Sourced from https://www.youtube.com/@bsbhandariofficial/shorts — update
// by swapping the `id` (and thumb, which is keyed to the same id) as new
// Shorts go up.
const REELS = [
  {
    id: "7QPNMYSa2E0",
    thumb: "https://i.ytimg.com/vi/7QPNMYSa2E0/oar2.jpg",
    title: "How To Achieve Success?",
    context: "Motivational Short",
  },
  {
    id: "kz5WNpn-Atw",
    thumb: "https://i.ytimg.com/vi/kz5WNpn-Atw/oar2.jpg",
    title: "Thank You Sanjeev Sir",
    context: "AWPL Tribute",
  },
  {
    id: "Nbt3Tyfzwgg",
    thumb: "https://i.ytimg.com/vi/Nbt3Tyfzwgg/oar2.jpg",
    title: "Indian Customer Kaisa Hota Hai!",
    context: "Relatable Fact",
  },
  {
    id: "S279gg6X-Ng",
    thumb: "https://i.ytimg.com/vi/S279gg6X-Ng/oar2.jpg",
    title: "Blue Ocean Theory: First Mover Advantage",
    context: "Business Tip",
  },
  {
    id: "lMzvaFPq2xw",
    thumb: "https://i.ytimg.com/vi/lMzvaFPq2xw/oar2.jpg",
    title: "You Want Happiness — What About Your Family?",
    context: "Life Lesson",
  },
  {
    id: "cv5_qtXgIsY",
    thumb: "https://i.ytimg.com/vi/cv5_qtXgIsY/oar2.jpg",
    title: "2 Days That Are Very Important In Life",
    context: "Motivational Story",
  },
  {
    id: "6lR3IwCICVA",
    thumb: "https://i.ytimg.com/vi/6lR3IwCICVA/oar2.jpg",
    title: "I'll Believe Money Is Worthless When Ambani Says It",
    context: "Money Mindset",
  },
];

// Renders the actual looping, initially-muted YouTube player for a reel
// that's currently playing, plus the mute/unmute toggle for it.
function ReelPlayer({ videoId }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            setMuted(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId]);

  function toggleMute() {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  }

  return (
    <>
      <div className="reel-player-wrap">
        <div ref={containerRef} />
      </div>
      <button
        type="button"
        className="reel-mute-btn"
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={toggleMute}
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
    </>
  );
}

export default function Reels() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState(null);

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
            <span className="eyebrow-line"></span> Motivational Shorts
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center light">
            Short Video <span className="accent">Motivation</span>
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
            {REELS.map((reel, i) => {
              const isPlaying = playingId === reel.id;
              return (
                <Reveal
                  className="reel-card"
                  delay={i ? `${Math.min(i * 0.05, 0.3)}s` : undefined}
                  key={reel.id + reel.title}
                >
                  <div
                    className="reel-card-media"
                    ref={(el) => (cardRefs.current[i] = el)}
                  >
                    {isPlaying ? (
                      <ReelPlayer videoId={reel.id} />
                    ) : (
                      <button
                        type="button"
                        className="reel-play-trigger"
                        onClick={() => setPlayingId(reel.id)}
                        aria-label={`Play reel: ${reel.title}`}
                      >
                        <img src={reel.thumb} alt={reel.title} loading="lazy" />
                      </button>
                    )}

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
                      {!isPlaying && (
                        <span className="reel-play" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="13" height="13">
                            <path d="M8 5v14l11-7z" fill="currentColor" />
                          </svg>
                        </span>
                      )}
                    </span>
                  </div>
                </Reveal>
              );
            })}
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
