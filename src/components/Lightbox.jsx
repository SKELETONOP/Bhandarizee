import { useEffect } from "react";

export default function Lightbox({ image, onClose }) {
  const open = Boolean(image);

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
      className={`lightbox${open ? " open" : ""}`}
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      onClick={(e) => {
        if (e.target.id === "lightbox") onClose();
      }}
    >
      <button
        className="lightbox-close"
        id="lightboxClose"
        aria-label="Close image viewer"
        onClick={onClose}
      >
        &times;
      </button>
      <img id="lightboxImg" src={image?.src} alt={image?.alt || ""} />
    </div>
  );
}
