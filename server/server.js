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

// ─── Chat endpoint ──────────────────────────────────────
// Collects the full streamed response from OpenRouter,
// separates reasoning from content, then sends clean
// SSE events to the browser.
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !messages.length) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // SSE headers
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
        stream: true,
        reasoning: { enable: true }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      res.write(`data: ${JSON.stringify({ type: 'error', text: `API ${response.status}` })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    const reader  = response.body.getReader();
    const decoder = new TextDecoder();
    let isThinking  = true;   // start in thinking phase
    let thinkingSent = false;
    let buf = '';             // leftover buffer for partial SSE lines

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();      // keep incomplete last line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;

        let json;
        try { json = JSON.parse(payload); } catch { continue; }

        const delta   = json.choices?.[0]?.delta;
        if (!delta) continue;

        const hasReasoning = delta.reasoning != null && delta.reasoning !== '';
        const content      = delta.content || '';

        // ── Thinking phase: model is reasoning ──────────
        if (hasReasoning && !content) {
          if (!thinkingSent) {
            res.write(`data: ${JSON.stringify({ type: 'thinking' })}\n\n`);
            thinkingSent = true;
          }
          continue;   // skip reasoning tokens
        }

        // ── Content phase: real answer tokens ───────────
        if (content) {
          if (isThinking) {
            res.write(`data: ${JSON.stringify({ type: 'thinking_done' })}\n\n`);
            isThinking = false;
          }
          res.write(`data: ${JSON.stringify({ type: 'token', text: content })}\n\n`);
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('OpenRouter error:', err);
    res.write(`data: ${JSON.stringify({ type: 'error', text: 'Server error' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

app.listen(PORT, () => console.log(`🤖 Server running → http://localhost:${PORT}`));
