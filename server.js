// server.js
// Express server shared by both staging and production.
// Behavior is controlled entirely by environment variables (APP_ENV, PORT) — no code changes needed.

const express = require('express');
const path = require('path');

const app = express();

const APP_ENV = process.env.APP_ENV || 'development';
const PORT = process.env.PORT || 3000;

// Serve the built static site
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint used by the deploy script / CI pipeline
app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: APP_ENV });
});

// Fallback to the built index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running in [${APP_ENV}] mode on http://localhost:${PORT}`);
});
