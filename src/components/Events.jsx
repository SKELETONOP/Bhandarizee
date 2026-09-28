import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import EventCard from "./EventCard";
import { EVENT_PORTRAITS, EVENT_TOUR, splitEvents } from "../data/events";

const PREVIEW_COUNT = 5;

export default function Events() {
  const { upcoming } = splitEvents();
  const preview = upcoming.slice(0, PREVIEW_COUNT);

  return (
    <section className="events" id="events">
      <div className="container">
        <Reveal className="section-head center">
          <p className="eyebrow center light">
            <span className="eyebrow-line"></span> Upcoming Events
            <span className="eyebrow-line"></span>
          </p>
          <h2 className="section-title center light">
            Mission <span className="accent">Ajay Rath</span>
          </h2>
          <p className="section-sub light">
            <span className="events-hindi">{EVENT_TOUR.taglineHindi}</span>{" "}
            {EVENT_TOUR.tagline}
          </p>
        </Reveal>

        <div className="events-layout">
          <Reveal className="events-portrait">
            <img
              src={EVENT_PORTRAITS.section.src}
              alt={EVENT_PORTRAITS.section.alt}
              loading="lazy"
            />
          </Reveal>

          <div className="events-list">
            {preview.length ? (
              preview.map((event, i) => (
                <Reveal
                  delay={i ? `${Math.min(i * 0.06, 0.3)}s` : undefined}
                  key={event.date + event.city}
                >
                  <EventCard event={event} next={i === 0} />
                </Reveal>
              ))
            ) : (
              <p className="events-empty">
                New dates are on the way — check back soon.
              </p>
            )}

            <Reveal className="events-cta">
              <Link to="/events" className="btn btn-primary">
                View Full Schedule
              </Link>
              <Link to="/#contact" className="btn btn-outline light">
                Invite to Your City
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
