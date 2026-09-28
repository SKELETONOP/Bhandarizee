import { eventDateParts, eventTitle } from "../data/events";

export default function EventCard({ event, past = false, next = false }) {
  const { day, month, weekday } = eventDateParts(event.date);
  return (
    <article
      className={`event-card${past ? " is-past" : ""}${
        event.featured ? " is-featured" : ""
      }${next ? " is-next" : ""}`}
    >
      <time className="event-date" dateTime={event.date}>
        <strong>{day}</strong>
        <span>{month}</span>
      </time>
      <div className="event-body">
        <h3>{event.city}</h3>
        <p>{eventTitle(event)}</p>
      </div>
      <span className="event-tag">
        {past ? "Completed" : next ? "Next Stop" : weekday}
      </span>
    </article>
  );
}
