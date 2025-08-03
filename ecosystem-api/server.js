require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const enrollRoutes = require('./routes/enroll');
const adminRoutes = require('./routes/admin');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://127.0.0.1:5173' // Alternative localhost
  ],
  credentials: true
}));

app.use(bodyParser.json());
app.use('/api/enroll', enrollRoutes);
app.use('/admin', adminRoutes);
app.use('/dashboard', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});