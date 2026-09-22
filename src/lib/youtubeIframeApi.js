// Lazily loads the YouTube IFrame Player API script (once, shared by every
// caller) and resolves with the `window.YT` namespace once it's ready. Used
// wherever a video needs JS-driven control (mute/unmute without restarting
// playback) rather than a plain <iframe src="...embed...">.
let apiPromise = null;

export function loadYouTubeIframeApi() {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });

  return apiPromise;
}
