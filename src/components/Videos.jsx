import Reveal from "./Reveal";

const VIDEOS = [
  {
    id: "WZxNRd2JVgg",
    thumb: "/images/gallery-1.png",
    alt: "How to Build an Unbreakable Mindset — video thumbnail",
    ariaLabel: "Play video: How to Build an Unbreakable Mindset",
    title: "How to Build an Unbreakable Mindset",
    meta: "Keynote highlights · 12:40",
    featured: true,
    playSize: 26,
  },
  {
    id: "YOUR_VIDEO_ID_2",
    thumb: "/images/gallery-2.svg",
    alt: "Turning Failure Into Fuel — video thumbnail",
    ariaLabel: "Play video: Turning Failure Into Fuel",
    title: "Turning Failure Into Fuel",
    meta: "Talk excerpt · 8:15",
    delay: "0.1s",
    playSize: 22,
  },
  {
    id: "YOUR_VIDEO_ID_3",
    thumb: "/images/gallery-3.svg",
    alt: "The Power of Purpose-Driven Leadership — video thumbnail",
    ariaLabel: "Play video: The Power of Purpose-Driven Leadership",
    title: "Purpose-Driven Leadership",
    meta: "Corporate session · 15:02",
    delay: "0.2s",
    playSize: 22,
  },
  {
    id: "YOUR_VIDEO_ID_4",
    thumb: "/images/gallery-4.svg",
    alt: "Live Keynote: Rise After You Fall — video thumbnail",
    ariaLabel: "Play video: Live Keynote, Rise After You Fall",
    title: "Live Keynote: Rise After You Fall",
    meta: "Full session · 42:18",
    delay: "0.3s",
    playSize: 22,
  },
];

export default function Videos({ onPlay }) {
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
          {VIDEOS.map((video) => (
            <Reveal
              className={`video-card${video.featured ? " featured" : ""}`}
              delay={video.delay}
              key={video.id + video.title}
            >
              <div className="video-thumb">
                <img src={video.thumb} alt={video.alt} loading="lazy" />
                <button
                  className="play-btn"
                  aria-label={video.ariaLabel}
                  onClick={() => onPlay(video.id)}
                >
                  <svg viewBox="0 0 24 24" width={video.playSize} height={video.playSize}>
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <h3>{video.title}</h3>
              <p>{video.meta}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="videos-cta">
          <a
            href="https://youtube.com"
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
