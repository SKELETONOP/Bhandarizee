import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const GALLERY = [
  {
    src: "/images/gallery-1.png",
    alt: "Bhandari speaking at a corporate event",
  },
  {
    src: "/images/gallery-2.svg",
    alt: "Bhandari engaging with the audience",
    delay: "0.05s",
  },
  {
    src: "/images/gallery-3.svg",
    alt: "Bhandari at a college seminar",
    delay: "0.1s",
  },
  {
    src: "/images/gallery-4.svg",
    alt: "Bhandari on a large auditorium stage",
    delay: "0.15s",
  },
  {
    src: "/images/gallery-5.svg",
    alt: "Bhandari during a workshop session",
    delay: "0.2s",
  },
  {
    src: "/images/gallery-6.svg",
    alt: "Bhandari meeting attendees after a talk",
    delay: "0.25s",
  },
];

export default function Gallery({ onOpen }) {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center">
            <span className="eyebrow-line"></span> Gallery
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center">
            Moments That <span className="accent">Inspire</span>
          </h2>
          <p className="section-sub">
            Highlights from stages, workshops and conversations around the
            world.
          </p>
        </Reveal>

        <div className="gallery-grid" id="galleryGrid">
          {GALLERY.map((item) => (
            <Reveal
              as="button"
              className="gallery-item"
              delay={item.delay}
              key={item.src}
              onClick={() => onOpen(item.src, item.alt)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </Reveal>
          ))}
        </div>

        <Reveal className="gallery-cta">
          <Link to="/gallery" className="btn btn-primary">
            View All Photos
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
