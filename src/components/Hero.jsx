import Reveal from "./Reveal";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <HeroParticles />
      <div className="hero-overlay"></div>

      <div className="container hero-inner">
        <Reveal className="hero-text">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> Motivational Speaker
          </p>
          <h1 className="hero-title">
            BELIEVE.
            <br />
            ACHIEVE.
            <br />
            <span className="accent">TRANSFORM.</span>
          </h1>
          <p className="hero-desc">
            I help individuals and organizations break through limits, build
            unstoppable mindsets, and create a future they are truly proud of.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Book Me To Speak
            </a>
            <a href="#videos" className="btn btn-outline">
              <span className="play-icon">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
              Watch Video
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-quote" delay="0.2s">
          <svg
            className="quote-mark"
            viewBox="0 0 32 24"
            width="34"
            height="26"
            aria-hidden="true"
          >
            <path
              d="M0 24V13.5C0 5.4 5 .6 13.5 0l1 3.6C9 4.7 6.3 8 6.3 12H14V24H0Zm18 0V13.5C18 5.4 23 .6 31.5 0l1 3.6C27 4.7 24.3 8 24.3 12H32V24H18Z"
              fill="currentColor"
            />
          </svg>
          <p>
            "Your only limit is the one
            <br />
            you set for yourself."
          </p>
          <span className="signature">B. S. Bhandari</span>
        </Reveal>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span></span>
      </a>
    </section>
  );
}
