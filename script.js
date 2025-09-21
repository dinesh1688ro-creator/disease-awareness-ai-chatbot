// script.js
const BACKEND_URL = "https://backend-chatbot-z07k.onrender.com/";

async function askQuestion() {
    const inputBox = document.getElementById("user-question");
    const chatHistory = document.getElementById("chat-history");
    const question = inputBox.value.trim();

    if (!question) return;

    // Show user message
    const userDiv = document.createElement("div");
    userDiv.className = "chat-message user-msg";
    userDiv.innerText = question;
    chatHistory.appendChild(userDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    inputBox.value = "";

    // Show bot thinking
    const botDiv = document.createElement("div");
    botDiv.className = "chat-message bot-msg";
    botDiv.innerText = "Thinking...";
    chatHistory.appendChild(botDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    try {
        const response = await fetch(`${BACKEND_URL}/getAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });
        const data = await response.json();

        botDiv.innerText = data.answer || "No answer returned";
    } catch (error) {
        console.error(error);
        botDiv.innerText = "Error connecting to backend.";
    }
}

// Attach to button and Enter key
document.getElementById("ask-btn").addEventListener("click", askQuestion);
document.getElementById("user-question").addEventListener("keypress", function(e) {
    if (e.key === "Enter") askQuestion();
});

