import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import EventCard from "../components/EventCard";
import { EVENT_PORTRAITS, EVENT_TOUR, EVENTS, splitEvents } from "../data/events";

export default function EventsPage() {
  const { upcoming, past } = splitEvents();
  const cities = new Set(EVENTS.map((e) => e.city)).size;

  return (
    <main>
      <section className="events-page">
        <div className="container">
          <Reveal className="section-head center">
            <p className="eyebrow center light">
              <span className="eyebrow-line"></span> Upcoming Events
              <span className="eyebrow-line"></span>
            </p>
            <h1 className="section-title center light">
              Mission <span className="accent">Ajay Rath</span>
            </h1>
            <p className="section-sub light">
              <span className="events-hindi">{EVENT_TOUR.taglineHindi}</span>{" "}
              {EVENT_TOUR.tagline} {EVENTS.length} stops across {cities}{" "}
              cities with Team B S Bhandari, Ambassador AWPL.
            </p>
          </Reveal>

          <div className="events-layout">
            <Reveal className="events-portrait is-sticky">
              <img src={EVENT_PORTRAITS.page.src} alt={EVENT_PORTRAITS.page.alt} />
            </Reveal>

            <div>
              <h2 className="events-group-title">
                Upcoming <span>{upcoming.length}</span>
              </h2>
              <div className="events-list">
                {upcoming.length ? (
                  upcoming.map((event, i) => (
                    <Reveal key={event.date + event.city}>
                      <EventCard event={event} next={i === 0} />
                    </Reveal>
                  ))
                ) : (
                  <p className="events-empty">
                    New dates are on the way — check back soon.
                  </p>
                )}
              </div>

              {past.length > 0 && (
                <>
                  <h2 className="events-group-title">
                    Completed <span>{past.length}</span>
                  </h2>
                  <div className="events-list">
                    {past.map((event) => (
                      <Reveal key={event.date + event.city}>
                        <EventCard event={event} past />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}

              <Reveal className="events-closing">
                <p className="events-hindi">{EVENT_TOUR.closingHindi}</p>
                <Link to="/#contact" className="btn btn-primary">
                  Invite Us to Your City
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
