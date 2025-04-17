import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  text: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachment: String,
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
