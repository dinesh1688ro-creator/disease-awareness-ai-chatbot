const BACKEND_URL = "https://backend-chatbot-z07k.onrender.com"; // your Render backend

const chatHistory = document.getElementById("chat-history");
const inputBox = document.getElementById("user-question");
const askBtn = document.getElementById("ask-btn");
const categoriesContainer = document.getElementById("categories");
const preloadedContainer = document.getElementById("preloaded-questions");

// Preloaded questions
const preloadedQA = [
    { q: "What is diabetes?", a: "Diabetes is a condition where blood sugar levels are too high.", category: "Endocrine" },
    { q: "What are symptoms of hypertension?", a: "Common symptoms include headaches, dizziness, and shortness of breath.", category: "Heart" },
    { q: "How to prevent heart disease?", a: "Maintain a healthy diet, exercise regularly, and avoid smoking.", category: "Heart" },
    { q: "What is COVID-19?", a: "COVID-19 is a contagious disease caused by the SARS-CoV-2 virus.", category: "Infectious" },
    { q: "How can I boost immunity?", a: "Eat nutritious food, sleep well, exercise, and manage stress.", category: "General" },
    { q: "What is asthma?", a: "Asthma is a respiratory condition causing difficulty in breathing.", category: "Respiratory" },
    { q: "Symptoms of flu?", a: "Fever, cough, sore throat, fatigue, and body aches are common.", category: "Infectious" },
    { q: "How to prevent malaria?", a: "Use mosquito nets, repellents, and remove standing water.", category: "Infectious" },
    { q: "What is obesity?", a: "Obesity is excessive body fat that increases health risks.", category: "General" },
    { q: "How to maintain mental health?", a: "Practice mindfulness, social support, and seek help when needed.", category: "Mental" }
];

const categories = [...new Set(preloadedQA.map(item => item.category))];

// Add category buttons
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("category-btn");
    btn.textContent = cat;
    btn.addEventListener("click", () => loadQuestionsByCategory(cat));
    categoriesContainer.appendChild(btn);
});

// Load questions for selected category
function loadQuestionsByCategory(category) {
    preloadedContainer.innerHTML = "";
    preloadedQA.filter(item => item.category === category).forEach(item => {
        const btn = document.createElement("button");
        btn.classList.add("preloaded-btn");
        btn.textContent = item.q;
        btn.addEventListener("click", () => {
            addMessage(item.q, "user");
            showTypingMessage(item.a);
        });
        preloadedContainer.appendChild(btn);
    });
}

// Add message to chat
function addMessage(text, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", type);
    msgDiv.textContent = text;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return msgDiv;
}

// Show typing animation and then display answer
function showTypingMessage(answer) {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("chat-message", "bot-msg");
    typingDiv.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    chatHistory.appendChild(typingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    setTimeout(() => {
        typingDiv.innerHTML = answer;
    }, Math.min(1500 + answer.length * 20, 3000));
}

// Ask question to backend
async function askQuestion() {
    const question = inputBox.value.trim();
    if (!question) return;

    addMessage(question, "user");
    inputBox.value = "";

    const typingDiv = document.createElement("div");
    typingDiv.classList.add("chat-message", "bot-msg");
    typingDiv.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    chatHistory.appendChild(typingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    try {
        const response = await fetch(`${BACKEND_URL}/getAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        typingDiv.innerHTML = data.answer || "No answer returned";
    } catch (err) {
        typingDiv.innerHTML = "Error connecting to backend.";
        console.error(err);
    }
}

// Event listeners
askBtn.addEventListener("click", askQuestion);
inputBox.addEventListener("keypress", e => { if (e.key === "Enter") askQuestion(); });

// Load first category by default
window.onload = () => { loadQuestionsByCategory(categories[0]); };

