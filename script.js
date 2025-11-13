const questions = [
  "Zeskanuj badge lub wpisz login",
  "Czy laptop działa?",
  "Czy skaner działa?",
  "Czy drukarka działa?",
  "Czy czegoś brakuje?"
];

let currentQuestion = 0;
const container = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  container.classList.remove("show");
  setTimeout(() => {
    container.innerHTML = `<p>${questions[currentQuestion]}</p>`;
    container.classList.add("show");
  }, 300);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    container.innerHTML = "<p>Dziękujemy za wypełnienie kontroli!</p>";
    nextBtn.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
  nextBtn.classList.remove("hidden");
});