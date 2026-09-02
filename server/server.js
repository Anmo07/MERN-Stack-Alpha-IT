require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 4000;

// ─── Put your OpenRouter API key here ───────────────────
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
// ────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// Serve the chatbot frontend
app.use(express.static(path.join(__dirname, '..', 'Assignment_9')));

// ─── Streaming chat endpoint ────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !messages.length) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Set SSE headers so chunks stream to the client instantly
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer':  'http://localhost:4000',
        'X-Title':       'ChatBot'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3.5-lightning:free',
        messages,
        max_tokens: 512,
        temperature: 0.7,
        stream: true          // ← stream from OpenRouter
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      res.write(`data: ${JSON.stringify({ error: `API ${response.status}: ${errBody}` })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    // Pipe the SSE stream from OpenRouter straight to the client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }

    res.end();
  } catch (err) {
    console.error('OpenRouter error:', err);
    res.write(`data: ${JSON.stringify({ error: 'Server error' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

app.listen(PORT, () => console.log(`🤖 Server running → http://localhost:${PORT}`));
