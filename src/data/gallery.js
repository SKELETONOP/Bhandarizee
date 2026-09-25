// Gallery page collections. Every photo lives in /public/images/gallery/
// with a descriptive, SEO-friendly filename — add new ones the same way
// (optimised .webp, named after the event/section) and list them here.
const img = (name) => `/images/gallery/${name}.webp`;

export const COLLECTIONS = [
  {
    slug: "vijay-rath",
    title: "Vijay Rath Yatra",
    desc: "On the road across cities, meeting teams and leaders along the way.",
    images: [
      { src: img("vijay-rath-yatra-jhansi-stage-bs-bhandari"), alt: "Vijay Rath Yatra — B. S. Bhandari on stage at Vijay 2.0 Jhansi" },
      { src: img("vijay-rath-yatra-bs-bhandari-greeting-audience"), alt: "Vijay Rath Yatra — B. S. Bhandari greeting the audience" },
      { src: img("vijay-rath-yatra-bs-bhandari-crowd-address"), alt: "Vijay Rath Yatra — addressing a packed crowd" },
      { src: img("vijay-rath-yatra-night-stage-bs-bhandari"), alt: "Vijay Rath Yatra — night stage session" },
      { src: img("vijay-rath-yatra-open-air-event-bs-bhandari"), alt: "Vijay Rath Yatra — open-air event city stop" },
      { src: img("vijay-rath-yatra-direct-selling-event-speech"), alt: "Vijay Rath Yatra — speech at India's biggest direct selling event" },
    ],
  },
  {
    slug: "sos-training",
    title: "SOS Training Sessions",
    desc: "Hands-on training moments from SOS workshops and leadership drills.",
    images: [
      { src: "/images/gallery-1.png", alt: "SOS Training — Secret of Success keynote at the podium" },
      { src: img("sos-training-secret-of-success-keynote"), alt: "SOS Training — Secret of Success keynote" },
      { src: img("sos-training-presentation-session"), alt: "SOS Training — presentation session" },
      { src: img("sos-training-stage-session"), alt: "SOS Training — workshop session on stage" },
      { src: img("sos-training-audience-interaction"), alt: "SOS Training — audience interaction" },
      { src: img("sos-training-welcome-greeting"), alt: "SOS Training — welcome greeting" },
      { src: img("sos-training-with-team"), alt: "SOS Training — B. S. Bhandari with the team" },
      { src: img("sos-training-mentoring-talk"), alt: "SOS Training — mentoring talk" },
      { src: img("sos-training-qa-session"), alt: "SOS Training — Q&A session" },
      { src: img("sos-training-motivational-talk"), alt: "SOS Training — motivational talk" },
      { src: img("sos-training-leadership-talk"), alt: "SOS Training — leadership talk" },
      { src: img("sos-training-stage-address"), alt: "SOS Training — Secret of Success stage address" },
      { src: img("sos-training-success-mindset-talk"), alt: "SOS Training — success mindset talk" },
      { src: img("sos-training-closing-address"), alt: "SOS Training — closing address" },
    ],
  },
  {
    slug: "bhandari-sir-moments",
    title: "Bhandari Sir Moments",
    desc: "Candid and on-stage moments from events across the years.",
    images: [
      { src: img("bs-bhandari-portrait-blue-suit"), alt: "Bhandari Sir — portrait in a blue suit" },
      { src: img("bs-bhandari-outdoor-portrait"), alt: "Bhandari Sir — outdoor portrait" },
      { src: img("bs-bhandari-garden-portrait-tan-suit"), alt: "Bhandari Sir — garden portrait in a tan suit" },
      { src: img("bs-bhandari-pinstripe-suit-portrait"), alt: "Bhandari Sir — pinstripe suit portrait" },
      { src: img("bs-bhandari-bamboo-lane-portrait-sunglasses"), alt: "Bhandari Sir — candid moment on a bamboo lane" },
      { src: img("bs-bhandari-bamboo-lane-full-length"), alt: "Bhandari Sir — full-length portrait" },
      { src: img("bs-bhandari-portrait-sunglasses"), alt: "Bhandari Sir — portrait in sunglasses" },
      { src: img("bs-bhandari-namaste-greeting-portrait"), alt: "Bhandari Sir — namaste greeting" },
      { src: img("bs-bhandari-confident-full-length-portrait"), alt: "Bhandari Sir — confident full-length pose" },
      { src: img("bs-bhandari-classic-suit-pose"), alt: "Bhandari Sir — classic suit pose" },
      { src: img("bs-bhandari-tree-lined-avenue-portrait"), alt: "Bhandari Sir — on a tree-lined avenue" },
      { src: img("bs-bhandari-lifestyle-portrait-sunglasses"), alt: "Bhandari Sir — lifestyle portrait" },
      { src: img("bs-bhandari-close-up-portrait"), alt: "Bhandari Sir — close-up portrait" },
      { src: img("bs-bhandari-with-bmw-x5"), alt: "Bhandari Sir — with his BMW X5" },
      { src: img("bs-bhandari-leaning-on-car"), alt: "Bhandari Sir — leaning on his car" },
      { src: img("bs-bhandari-lifestyle-car-portrait"), alt: "Bhandari Sir — lifestyle car portrait" },
      { src: img("bs-bhandari-success-lifestyle-portrait"), alt: "Bhandari Sir — success lifestyle portrait" },
    ],
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    desc: "Keynotes and leadership sessions for corporate teams and summits.",
    images: [
      { src: img("corporate-event-train-the-trainer-keynote"), alt: "Corporate event — Train the Trainer keynote" },
      { src: img("corporate-event-personality-development-session"), alt: "Corporate event — personality development session" },
      { src: img("corporate-event-diamond-leadership-training"), alt: "Corporate event — Diamond Leadership Training" },
      { src: img("corporate-event-diamond-leadership-training-stage"), alt: "Corporate event — Diamond Leadership Training stage" },
      { src: img("corporate-event-diamond-leadership-training-portrait"), alt: "Corporate event — at Diamond Leadership Training" },
      { src: img("corporate-event-evening-keynote"), alt: "Corporate event — evening keynote" },
      { src: img("corporate-event-networking-with-guest"), alt: "Corporate event — networking with a guest" },
    ],
  },
  {
    slug: "award-ceremonies",
    title: "Award Ceremonies",
    desc: "Recognitions and award nights celebrating milestone achievements.",
    images: [
      { src: img("award-ceremony-cordelia-cruise-achievers-honour"), alt: "Award ceremony — honour at the Cordelia Cruise achievers' event" },
      { src: img("award-ceremony-cordelia-cruise-felicitation"), alt: "Award ceremony — felicitation on the Cordelia Cruise" },
    ],
  },
];
