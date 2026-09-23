// Placeholder collection groupings built from the existing gallery images.
// Swap each `src` for the real photos once they're available — group
// structure (title/description) can stay as-is or be renamed.
const STOCK = [
  "/images/gallery-1.png",
  "/images/gallery-2.svg",
  "/images/gallery-3.svg",
  "/images/gallery-4.svg",
  "/images/gallery-5.svg",
  "/images/gallery-6.svg",
];

export const COLLECTIONS = [
  {
    slug: "vijay-rath",
    title: "Vijay Rath Yatra",
    desc: "On the road across cities, meeting teams and leaders along the way.",
    images: [
      { src: STOCK[0], alt: "Vijay Rath Yatra — stage arrival" },
      { src: STOCK[1], alt: "Vijay Rath Yatra — crowd address" },
      { src: STOCK[2], alt: "Vijay Rath Yatra — city stop" },
      { src: STOCK[3], alt: "Vijay Rath Yatra — team welcome" },
    ],
  },
  {
    slug: "sos-training",
    title: "SOS Training Sessions",
    desc: "Hands-on training moments from SOS workshops and leadership drills.",
    images: [
      { src: STOCK[4], alt: "SOS Training — workshop session" },
      { src: STOCK[5], alt: "SOS Training — group exercise" },
      { src: STOCK[0], alt: "SOS Training — mentoring circle" },
      { src: STOCK[1], alt: "SOS Training — Q&A session" },
    ],
  },
  {
    slug: "bhandari-sir-moments",
    title: "Bhandari Sir Moments",
    desc: "Candid and on-stage moments from events across the years.",
    images: [
      { src: STOCK[2], alt: "Bhandari Sir — candid moment" },
      { src: STOCK[3], alt: "Bhandari Sir — on stage" },
      { src: STOCK[4], alt: "Bhandari Sir — with attendees" },
      { src: STOCK[5], alt: "Bhandari Sir — closing address" },
    ],
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    desc: "Keynotes and leadership sessions for corporate teams and summits.",
    images: [
      { src: STOCK[0], alt: "Corporate event — keynote" },
      { src: STOCK[1], alt: "Corporate event — panel session" },
      { src: STOCK[2], alt: "Corporate event — networking" },
    ],
  },
  {
    slug: "award-ceremonies",
    title: "Award Ceremonies",
    desc: "Recognitions and award nights celebrating milestone achievements.",
    images: [
      { src: STOCK[3], alt: "Award ceremony — trophy moment" },
      { src: STOCK[4], alt: "Award ceremony — felicitation" },
      { src: STOCK[5], alt: "Award ceremony — group photo" },
    ],
  },
];
