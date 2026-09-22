import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import AllVideos from "./pages/AllVideos";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <>
      <Header />
      <ScrollManager />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<AllVideos />} />
      </Routes>

      <Footer />
      <BackToTop />
    </>
  );
}
