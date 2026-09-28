// Background-removed portraits shown beside the schedule.
export const EVENT_PORTRAITS = {
  section: {
    src: "/images/events/bs-bhandari-mission-ajay-rath-portrait.webp",
    alt: "B. S. Bhandari, Ambassador AWPL — Mission Ajay Rath",
  },
  page: {
    src: "/images/events/bs-bhandari-namaste-invite-portrait.webp",
    alt: "B. S. Bhandari greeting with a namaste — Mission Ajay Rath tour",
  },
};

export const EVENT_TOUR = {
  title: "Mission Ajay Rath",
  taglineHindi: "बड़ा सोचो… बड़ा करो…",
  tagline: "New Cities. New People. New Dreams.",
  closingHindi: "मंज़िल दूर नहीं… मिशन जारी है…",
};

// Mission Ajay Rath tour schedule (from the official poster). Add new stops
// here — `date` is YYYY-MM-DD; anything before today is shown as completed.
export const EVENTS = [
  { date: "2026-09-26", city: "Agra", type: "Core Meeting", host: "Raja Sikarwar" },
  { date: "2026-09-27", city: "Manesar", type: "BDT" },
  { date: "2026-10-02", city: "Jaora", type: "BDT" },
  { date: "2026-10-03", city: "Jhabua", type: "BDT" },
  { date: "2026-10-04", city: "Ujjain", type: "BDT" },
  { date: "2026-10-05", city: "Indore", type: "BDT" },
  { date: "2026-10-06", city: "Jhansi", type: "Core Meeting", host: "Mahesh Raikwar" },
  { date: "2026-10-08", city: "Shivpuri", type: "BDT" },
  { date: "2026-10-09", city: "Jhansi", type: "BDT" },
  { date: "2026-10-10", city: "Chhatarpur", type: "BDT" },
  { date: "2026-10-11", city: "Banda", type: "BDT" },
  { date: "2026-10-12", city: "Fatehpur", type: "BDT" },
  { date: "2026-10-13", city: "Bharuwa", type: "BDT" },
  { date: "2026-10-23", city: "Jaipur", type: "Royal Diamond Celebration", featured: true },
  { date: "2026-10-25", city: "Indore", type: "Ajay Rath", featured: true },
  { date: "2026-11-01", city: "Agra", type: "Ajay Rath", featured: true },
];

function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function splitEvents() {
  const today = todayISO();
  return {
    upcoming: EVENTS.filter((e) => e.date >= today),
    past: EVENTS.filter((e) => e.date < today),
  };
}

export function eventDateParts(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    weekday: d.toLocaleString("en-US", { weekday: "short" }),
  };
}

export function eventTitle(event) {
  return event.host ? `${event.type} — ${event.host}` : event.type;
}
