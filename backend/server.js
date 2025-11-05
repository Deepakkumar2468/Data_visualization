const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Simple CORS - Allow all origins in development
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.json({ success: true, message: 'Server is working!' });
});


// Routes
app.use('/api', dataRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blackcoffer API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// const PORT = process.env.PORT || 5000;
const PORT = 5050;

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});





