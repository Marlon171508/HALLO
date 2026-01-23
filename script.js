const questions = [
    "Notrufzentrale, wo ist der Notfall?",
    "Was ist passiert?",
    "Wie viele verletzte Personen gibt es?",
    "Welche Verletzungen liegen vor?",
    "Bleiben Sie bitte am Telefon. Können Sie noch etwas ergänzen?"
];

let currentQuestion = 0;

const startBtn = document.getElementById("startBtn");
const simulationDiv = document.getElementById("simulation");
const questionText = document.getElementById("question");
const nextBtn = document.getElementById("nextBtn");
const answerInput = document.getElementById("answer");

startBtn.addEventListener("click", () => {
    simulationDiv.classList.remove("hidden");
    startBtn.style.display = "none";
    showQuestion();
});

nextBtn.addEventListener("click", () => {
    answerInput.value = "";
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionText.innerText = "✅ Simulation beendet. Hilfe ist unterwegs!";
        answerInput.style.display = "none";
        nextBtn.style.display = "none";
    }
});

function showQuestion() {
    questionText.innerText = questions[currentQuestion];
}
