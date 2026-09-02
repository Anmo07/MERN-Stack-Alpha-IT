const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const sendBtn      = document.getElementById('sendBtn');
const imageInput   = document.getElementById('imageInput');

// ── helpers ──────────────────────────────────────────
function addBubble(text, role) {
  const div = document.createElement('div');
  div.className = `chatbot-bubble ${role}`;
  div.innerHTML = `<p>${text}</p>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chatbot-bubble bot typing';
  div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

// ── conversation history (OpenAI-style messages) ────
const history = [
  { role: 'system', content: `You are a friendly, helpful chatbot assistant.
RULES:
- Reply DIRECTLY with your answer. Do NOT show your thinking, reasoning steps, drafts, or internal process.
- Never output phrases like "Analyze", "Identify Intent", "Formulate Response", "Check Constraints", "Draft", or any meta-commentary.
- Keep answers short and conversational (1–3 sentences max unless asked for detail).
- Use a warm, natural tone.` }
];

// ── create a bot bubble and return its <p> for streaming ──
function createBotBubble() {
  const div = document.createElement('div');
  div.className = 'chatbot-bubble bot';
  const p = document.createElement('p');
  div.appendChild(p);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return p;
}

// ── send message (streaming) ────────────────────────
async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addBubble(text, 'user');
  chatInput.value = '';
  history.push({ role: 'user', content: text });

  const loader = showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    });

    loader.remove();
    const target = createBotBubble();      // empty bubble to fill
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullReply = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // Parse SSE lines: "data: {...}"
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') break;
        try {
          const json = JSON.parse(payload);
          const token = json.choices?.[0]?.delta?.content;
          if (token) {
            fullReply += token;
            target.textContent = fullReply;
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }
        } catch { /* skip non-JSON lines */ }
      }
    }

    if (!fullReply) target.textContent = 'No response.';
    history.push({ role: 'assistant', content: fullReply || '' });
  } catch {
    loader.remove();
    addBubble('Could not reach the server.', 'bot');
  }
}

// ── event listeners ─────────────────────────────────
sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

imageInput.addEventListener('change', (e) => {
  if (e.target.files[0]) addBubble(`🖼️ ${e.target.files[0].name}`, 'user');
  e.target.value = '';
});
