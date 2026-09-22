import { useEffect } from "react";

export default function VideoModal({ youtubeId, onClose }) {
  const open = Boolean(youtubeId);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`video-modal${open ? " open" : ""}`}
      id="videoModal"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div
        className="video-modal-backdrop"
        id="videoModalBackdrop"
        onClick={onClose}
      ></div>
      <div className="video-modal-inner">
        <button
          className="video-modal-close"
          id="videoModalClose"
          aria-label="Close video"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="video-modal-frame" id="videoModalFrame">
          {open && (
            <iframe
              src={`https://www.youtube.com/embed/${encodeURIComponent(
                youtubeId
              )}?autoplay=1&rel=0`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
