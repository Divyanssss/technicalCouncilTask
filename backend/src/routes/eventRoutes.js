import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getEvents);
router.get('/:id', getEventById);

router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router; 