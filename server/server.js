import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// TODO: Add other route imports and middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
