import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

// Create a new ticket
export const createTicket = async (req, res) => {
  const { title } = req.body;

  const ticket = await Ticket.create({
    title,
    customer: req.user._id,
  });

  res.status(201).json(ticket);
};

// Get all tickets (for agents/admins)
export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find()
    .populate('customer', 'name email')
    .sort({ updatedAt: -1 });
  res.json(tickets);
};

// Get tickets of logged-in customer
export const getUserTickets = async (req, res) => {
  const tickets = await Ticket.find({ customer: req.user._id }).sort({ updatedAt: -1 });
  res.json(tickets);
};

// Get single ticket by ID
export const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate('customer', 'name email')
    .populate({ path: 'notes', populate: { path: 'createdBy', select: 'name' } });

  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json(ticket);
};

// Update ticket status (admin/agent only)
export const updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.status = status;
  await ticket.save();

  res.json(ticket);
};
