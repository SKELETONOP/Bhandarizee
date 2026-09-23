import { useState } from "react";
import Reveal from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import { COLLECTIONS } from "../data/gallery";

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <main>
      <section className="gallery-page">
        <div className="container">
          <Reveal className="section-head center">
            <p className="eyebrow center">
              <span className="eyebrow-line"></span> Gallery
              <span className="eyebrow-line"></span>
            </p>
            <h1 className="section-title center">
              Moments That <span className="accent">Inspire</span>
            </h1>
            <p className="section-sub">
              Browse the full collection — stages, workshops, yatras and
              everything in between.
            </p>
          </Reveal>

          {COLLECTIONS.map((collection) => (
            <div className="gallery-collection" key={collection.slug}>
              <Reveal className="gallery-collection-head">
                <h2>{collection.title}</h2>
                <p>{collection.desc}</p>
              </Reveal>
              <div className="gallery-grid">
                {collection.images.map((item, i) => (
                  <Reveal
                    as="button"
                    type="button"
                    className="gallery-item"
                    delay={i ? `${Math.min(i * 0.05, 0.2)}s` : undefined}
                    key={item.src + item.alt}
                    onClick={() => setLightboxImage(item)}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </main>
  );
}
