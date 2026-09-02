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

function showThinking() {
  const div = document.createElement('div');
  div.className = 'chatbot-bubble bot thinking-bubble';
  div.innerHTML = `
    <div class="thinking-status">
      <span class="thinking-icon">🧠</span>
      <span class="thinking-text">Thinking</span>
      <span class="thinking-dots"><span>.</span><span>.</span><span>.</span></span>
    </div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

// ── conversation history ─────────────────────────────
const history = [
  { role: 'system', content: 'You are a friendly chatbot. Answer directly and concisely.' }
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

  let thinkingBubble = null;
  let target = null;
  let fullReply = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    });

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;

        let json;
        try { json = JSON.parse(payload); } catch { continue; }

        // ── Thinking phase ──────────────────────────
        if (json.type === 'thinking') {
          if (!thinkingBubble) {
            thinkingBubble = showThinking();
          }
        }

        // ── Thinking done → show answer bubble ──────
        if (json.type === 'thinking_done') {
          if (thinkingBubble) {
            thinkingBubble.remove();
            thinkingBubble = null;
          }
          target = createBotBubble();
        }

        // ── Stream answer tokens ────────────────────
        if (json.type === 'token' && json.text) {
          if (!target) target = createBotBubble();
          fullReply += json.text;
          target.textContent = fullReply;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // ── Error ───────────────────────────────────
        if (json.type === 'error') {
          if (thinkingBubble) thinkingBubble.remove();
          addBubble(json.text || 'An error occurred.', 'bot');
        }
      }
    }

    if (!fullReply && !target) {
      if (thinkingBubble) thinkingBubble.remove();
      addBubble('No response.', 'bot');
    }
    history.push({ role: 'assistant', content: fullReply || '' });
  } catch {
    if (thinkingBubble) thinkingBubble.remove();
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
