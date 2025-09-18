const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const presetButtons = document.querySelectorAll('.preset-btn');

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'user-message' : 'bot-message';
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulated AI reply for now
function getBotReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('cold') || lower.includes('flu')) return "Common cold symptoms include cough, sneezing, and mild fever.";
  if (lower.includes('fever')) return "To prevent fever, maintain hygiene, drink fluids, and rest.";
  if (lower.includes('vaccine')) return "Follow the recommended vaccination schedule for children.";
  return "I can answer about symptoms, prevention, or vaccines.";
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  appendMessage('user', message);
  userInput.value = '';

  setTimeout(() => {
    const reply = getBotReply(message);
    appendMessage('bot', reply);
  }, 500);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

presetButtons.forEach(btn => btn.addEventListener('click', () => {
  userInput.value = btn.textContent;
  sendMessage();
}));
