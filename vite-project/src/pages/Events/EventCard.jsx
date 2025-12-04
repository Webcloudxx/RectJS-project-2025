import { Link } from 'react-router-dom';

export function EventCard({ event }) {
  return (
    <article className="event-card">
      {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
      <h3>{event.title}</h3>
      <p>
        {event.location} – {event.date} {event.time}
      </p>
      <Link to={`/events/${event._id}`} className="btn">
        Details
      </Link>
    </article>
  );
}