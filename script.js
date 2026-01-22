// ===== Elemente =====
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// ===== Funktionen =====

// Nachricht erstellen und animiert hinzufügen
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble", sender);
  bubble.textContent = text;
  chatMessages.appendChild(bubble);

  // Scroll automatisch nach unten
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulierte KIM-Antwort
function kimReply(userText) {
  // Hier kannst du später echte KI einfügen
  const replies = [
    "Cool, erzähl mir mehr!",
    "Interessant 😎",
    "Das klingt spannend!",
    "Haha, sehr witzig!",
    "Klar, das verstehe ich!"
  ];

  // Zufällige Antwort wählen
  const reply = replies[Math.floor(Math.random() * replies.length)];

  // Animation leicht verzögern für realistisches Tippen
  setTimeout(() => addMessage(reply, "kim"), 500);
}

// Nachricht senden
function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";

  // KIM antwortet
  kimReply(text);
}

// ===== Events =====
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

