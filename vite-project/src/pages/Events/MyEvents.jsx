import { useEffect, useState } from 'react';
import { getAll } from '../../services/eventService.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { EventCard } from './EventCard.jsx';

export function MyEvents() {
  const { _id: userId } = useAuthContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAll()
      .then((all) => {
        setEvents(all.filter((e) => e.creator?._id === userId));
      })
      .catch((err) => alert(err.message));
  }, [userId]);

  return (
    <section className="catalog-section">
      <h2>My Events</h2>
      {events.length === 0 ? (
        <p>You have no events yet.</p>
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