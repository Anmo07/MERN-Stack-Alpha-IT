const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Serve the frontend
app.use(express.static(path.join(__dirname, '..', 'chatbot')));

// Simple chat endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  const lower = message.toLowerCase();
  let reply;

  if (lower.includes('hello') || lower.includes('hi'))  reply = 'Hey! 😊 What can I do for you?';
  else if (lower.includes('help'))  reply = 'Sure — just describe what you need and I\'ll do my best!';
  else if (lower.includes('bye'))   reply = 'Goodbye! Have a great day! 👋';
  else reply = `You said: "${message}"`;

  res.json({ reply });
});

app.listen(PORT, () => console.log(`🤖 Server running → http://localhost:${PORT}`));
