import { useEffect } from "react";

const SPEAKER_PHOTO = "/images/about-photo.png";

export default function TopicModal({ topic, onClose }) {
  const open = Boolean(topic);

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
      className={`topic-modal${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Topic quote"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="topic-modal-inner">
          <button
            className="topic-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
          <img
            className="topic-modal-photo"
            src={SPEAKER_PHOTO}
            alt="BS Bhandari"
          />
          <div className="topic-modal-body">
            <p className="topic-modal-title">{topic.title}</p>
            <p className="topic-modal-quote-sa">{topic.quoteSanskrit}</p>
            <p className="topic-modal-quote-hi">{topic.quoteHindi}</p>
            <p className="topic-modal-quote-en">{topic.quoteEnglish}</p>
          </div>
        </div>
      )}
    </div>
  );
}
