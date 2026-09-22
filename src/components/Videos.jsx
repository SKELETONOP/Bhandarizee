import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { VIDEOS, videoThumb } from "../data/videos";

const PREVIEW_COUNT = 8;

export default function Videos({ onPlay }) {
  const preview = VIDEOS.slice(0, PREVIEW_COUNT);

  return (
    <section className="videos" id="videos">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center light">
            <span className="eyebrow-line"></span> Videos
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center light">
            Watch Me <span className="accent">In Action</span>
          </h2>
          <p className="section-sub light">
            A glimpse into the energy, stories and lessons from recent
            keynotes.
          </p>
        </Reveal>

        <div className="video-grid">
          {preview.map((video, i) => (
            <Reveal
              className="video-card"
              delay={i ? `${Math.min(i * 0.05, 0.3)}s` : undefined}
              key={video.id}
            >
              <div className="video-thumb">
                <img
                  src={videoThumb(video.id)}
                  alt={`${video.title} — video thumbnail`}
                  loading="lazy"
                />
                <button
                  className="play-btn"
                  aria-label={`Play video: ${video.title}`}
                  onClick={() => onPlay(video.id)}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <h3>{video.title}</h3>
              <p>
                {video.views} · {video.duration}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="videos-cta">
          <Link to="/videos" className="btn btn-primary">
            View All Videos
          </Link>
          <a
            href="https://www.youtube.com/@bsbhandariofficial"
            target="_blank"
            rel="noopener"
            className="btn btn-outline light"
          >
            Subscribe on YouTube
          </a>
        </Reveal>
      </div>
    </section>
  );
}
