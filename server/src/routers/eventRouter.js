import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:eventId', getEventById);

router.post('/', isAuth, createEvent);
router.put('/:eventId', isAuth, updateEvent);
router.delete('/:eventId', isAuth, deleteEvent);
router.post('/:eventId/join', isAuth, joinEvent);

export default router;