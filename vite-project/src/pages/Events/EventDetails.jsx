import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getOne, remove, join } from '../../services/eventService.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import '../../styles/events.css';

export function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { _id: userId, accessToken, isAuthenticated } = useAuthContext();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    getOne(eventId)
      .then(setEvent)
      .catch((err) => alert(err.message));
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  const isOwner = isAuthenticated && event.creator?._id === userId;
  const hasJoined = isAuthenticated && event.attendees?.some((a) => a._id === userId);

  const deleteHandler = async () => {
    if (!confirm('Delete this event?')) return;

    try {
      await remove(eventId, accessToken);
      navigate('/events');
    } catch (err) {
      alert(err.message);
    }
  };

  const joinHandler = async () => {
    try {
      const updated = await join(eventId, accessToken);
      setEvent(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="details-section">
      <h2>{event.title}</h2>
      {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Date:</strong> {event.date} {event.time}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <p>
        <strong>Created by:</strong> {event.creator?.username}
      </p>
      <p>
        <strong>Attendees:</strong> {event.attendees?.length || 0}
      </p>

      {isAuthenticated && !isOwner && !hasJoined && (
        <button className="btn" onClick={joinHandler}>
          Join Event
        </button>
      )}

      {isOwner && (
        <div className="owner-actions">
          <Link to={`/events/${event._id}/edit`} className="btn">
            Edit
          </Link>
          <button className="btn danger" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      )}
    </section>
  );
}