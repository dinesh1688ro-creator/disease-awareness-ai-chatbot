// script.js

// Your Railway backend URL
const BACKEND_URL = "https://disease-backend-production.up.railway.app";

// Function to send question to backend
async function askQuestion() {
    const inputBox = document.getElementById("user-question");
    const responseBox = document.getElementById("chatbot-response");
    const question = inputBox.value.trim();

    if (!question) return;

    // Show loading message
    responseBox.innerText = "Thinking...";

    try {
        const response = await fetch(`${BACKEND_URL}/getAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });

        const data = await response.json();
        responseBox.innerText = data.answer || "No answer returned";
    } catch (error) {
        console.error(error);
        responseBox.innerText = "Error connecting to backend.";
    }

    // Clear input box
    inputBox.value = "";
}

// Attach function to button click
document.getElementById("ask-btn").addEventListener("click", askQuestion);

// Optional: allow pressing Enter key to send question
document.getElementById("user-question").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        askQuestion();
    }
});
