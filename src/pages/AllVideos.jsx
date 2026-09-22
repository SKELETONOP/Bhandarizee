import { useState } from "react";
import Reveal from "../components/Reveal";
import VideoModal from "../components/VideoModal";
import { VIDEOS, videoThumb } from "../data/videos";

export default function AllVideos() {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  return (
    <main>
      <section className="videos-page">
        <div className="container">
          <Reveal className="section-head center">
            <p className="eyebrow center light">
              <span className="eyebrow-line"></span> All Videos
              <span className="eyebrow-line"></span>
            </p>
            <h1 className="section-title center light">
              Every Talk. <span className="accent">Every Lesson.</span>
            </h1>
            <p className="section-sub light">
              The complete library — {VIDEOS.length} talks, stories and
              sessions from stages and screens.
            </p>
          </Reveal>

          <div className="video-grid">
            {VIDEOS.map((video, i) => (
              <Reveal
                className="video-card"
                delay={i ? `${Math.min((i % 4) * 0.05, 0.15)}s` : undefined}
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
                    onClick={() => setPlayingVideoId(video.id)}
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
        </div>
      </section>

      <VideoModal
        youtubeId={playingVideoId}
        onClose={() => setPlayingVideoId(null)}
      />
    </main>
  );
}
