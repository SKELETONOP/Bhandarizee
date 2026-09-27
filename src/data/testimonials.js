// Portrait video testimonials, self-hosted so they can autoplay on a muted
// loop. Source clips: https://drive.google.com/drive/folders/1CImdXcGVanOR7-nL98a6MC7yGpU5gp72
// (compressed to 540×960 MP4 in /public/videos/testimonials, with a
// matching .webp poster). Swap `name`/`role` for each speaker's real name
// and title once known.
const clip = (n) => ({
  src: `/videos/testimonials/bs-bhandari-testimonial-${n}.mp4`,
  poster: `/videos/testimonials/bs-bhandari-testimonial-${n}.webp`,
});

export const TESTIMONIALS = [
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("01") },
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("02") },
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("03") },
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("04") },
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("05") },
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("06") },
  { name: "Participant Feedback", role: "Seminar Attendee", ...clip("07") },
];
