import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { connectDB, getDbStatus } from './db.js';
import authRouter from './routes/auth.js';
import registrationsRouter from './routes/registrations.js';
import bookingsRouter from './routes/bookings.js';
import contactRouter from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://abhishekrawat704235.github.io',
    'http://localhost:5173'
  ]
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/registrations', registrationsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/contact', contactRouter);

// Health & Database status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getDbStatus(),
  });
});

const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global 404 for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🥋 High Skill Taekwondo Academy - Backend API Server`);
  console.log(`📍 Listening on port: http://localhost:${PORT}`);
  console.log(`🛡️  Admin Dashboard Auth: Username "${process.env.ADMIN_USERNAME || 'admin'}"`);
  console.log(`======================================================\n`);
  console.log(`📂 Serving static files from: ${distPath}`)
  console.log(`📡 API Endpoints:`
  

  );
});





export default app;
