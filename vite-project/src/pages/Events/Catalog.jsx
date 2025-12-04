import { useEffect, useState } from 'react';
import { getAll } from '../../services/eventService.js';
import { EventCard } from './EventCard.jsx';
import '../../styles/events.css';

export function Catalog() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAll()
      .then(setEvents)
      .catch((err) => alert(err.message));
  }, []);

  return (
    <section className="catalog-section">
      <h2>Car Meet Catalog</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <div className="event-list">
          {events.map((e) => (
            <EventCard key={e._id} event={e} />
          ))}
        </div>
      )}
    </section>
  );
}