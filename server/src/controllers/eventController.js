import { Event } from '../models/Event.js';

export async function getAllEvents(_req, res) {
  const events = await Event.find().populate('creator', 'username');
  res.json(events);
}

export async function getEventById(req, res) {
  const event = await Event.findById(req.params.eventId)
    .populate('creator', 'username')
    .populate('attendees', 'username');

  if (!event) return res.status(404).json({ message: 'Event not found.' });

  res.json(event);
}

export async function createEvent(req, res) {
  try {
    const data = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const created = await Event.create({
      ...data,
      creator: req.user._id
    });

    res.status(201).json(created);
  } catch (err) {
    console.error('Create event error:', err.message);
    res.status(400).json({ message: 'Invalid event data.' });
  }
}

export async function updateEvent(req, res) {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  if (event.creator.toString() !== req.user._id) {
    return res.status(403).json({ message: 'Not authorized.' });
  }

  Object.assign(event, req.body);
  await event.save();

  res.json(event);
}

export async function deleteEvent(req, res) {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  if (event.creator.toString() !== req.user._id) {
    return res.status(403).json({ message: 'Not authorized.' });
  }

  await Event.findByIdAndDelete(eventId);
  res.json({ message: 'Event deleted.' });
}

export async function joinEvent(req, res) {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  const userId = req.user._id;
  if (!event.attendees.map((a) => a.toString()).includes(userId)) {
    event.attendees.push(userId);
    await event.save();
  }

  const populated = await Event.findById(eventId)
    .populate('creator', 'username')
    .populate('attendees', 'username');

  res.json(populated);
}