import { forwardRef, useEffect, useRef, useState } from "react";

/* Wraps content that should fade/slide in on scroll, matching the
   original .reveal-up / .in-view CSS classes and --delay custom property. */
const Reveal = forwardRef(function Reveal(
  { as: Tag = "div", delay, className = "", style, children, ...rest },
  forwardedRef
) {
  const innerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function setRefs(node) {
    innerRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  const mergedStyle = delay ? { "--delay": delay, ...style } : style;

  return (
    <Tag
      ref={setRefs}
      className={`reveal-up${inView ? " in-view" : ""}${
        className ? " " + className : ""
      }`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
