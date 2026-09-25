import { forwardRef, useEffect, useRef, useState } from "react";

/* Wraps content that should fade/slide in on scroll, matching the
   original .reveal-up / .in-view CSS classes and --delay custom property.
   With `repeat`, the element also reverses when scrolled back up: it stays
   in view once it has passed above the viewport, and drops out again when
   it falls back below the trigger line. `rootMargin` moves that line. */
const Reveal = forwardRef(function Reveal(
  {
    as: Tag = "div",
    delay,
    repeat = false,
    rootMargin,
    className = "",
    style,
    children,
    ...rest
  },
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
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setInView(entry.boundingClientRect.top < 0);
          }
        });
      },
      { threshold: 0.15, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat, rootMargin]);

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
