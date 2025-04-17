import express from 'express';
import {
  createTicket,
  getAllTickets,
  getUserTickets,
  getTicketById,
  updateTicketStatus
} from '../controllers/ticketController.js';

import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

// Customer: Create ticket
router.post('/', protect, authorizeRoles('customer'), createTicket);

// Customer: Get own tickets
router.get('/my-tickets', protect, authorizeRoles('customer'), getUserTickets);

// Agent/Admin: View all tickets
router.get('/', protect, authorizeRoles('admin', 'agent'), getAllTickets);

// All roles: View one ticket
router.get('/:id', protect, getTicketById);

// Agent/Admin: Update ticket status
router.put('/:id/status', protect, authorizeRoles('admin', 'agent'), updateTicketStatus);

export default router;
