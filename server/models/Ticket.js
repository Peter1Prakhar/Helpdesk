import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: String,
  status: { type: String, enum: ['Active', 'Pending', 'Closed'], default: 'Active' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
