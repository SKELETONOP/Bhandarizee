import { useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Stats from "../components/Stats";
import Topics from "../components/Topics";
import Videos from "../components/Videos";
import Reels from "../components/Reels";
import VideoModal from "../components/VideoModal";
import Gallery from "../components/Gallery";
import Lightbox from "../components/Lightbox";
import Journey from "../components/Journey";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Home() {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <Topics />
      <Videos onPlay={setPlayingVideoId} />
      <Reels />
      <VideoModal youtubeId={playingVideoId} onClose={() => setPlayingVideoId(null)} />
      <Gallery onOpen={(src, alt) => setLightboxImage({ src, alt })} />
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <Journey />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
