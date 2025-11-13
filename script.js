const questions = [
  { id: "login", type: "text", label: "Zeskanuj badge lub wpisz login" },
  { id: "laptop", type: "select", label: "Czy laptop działa?", options: ["tak","nie"] },
  { id: "skaner", type: "select", label: "Czy skaner działa?", options: ["tak","nie"] },
  { id: "drukarka", type: "select", label: "Czy drukarka działa?", options: ["tak","nie"] },
  { id: "braki", type: "text", label: "Czy czegoś brakuje?" }
];

let current = 0;
const container = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const statusLink = document.getElementById("status-link");
let answers = {};

function showQuestion() {
  container.classList.remove("show");
  setTimeout(() => {
    const q = questions[current];
    let html = `<p>${q.label}</p>`;
    if(q.type === "text") html += `<input id="${q.id}" type="text">`;
    if(q.type === "select"){
      html += `<select id="${q.id}"><option value="">Wybierz</option>`;
      q.options.forEach(o=>html+=`<option value="${o}">${o}</option>`);
      html += `</select>`;
    }
    container.innerHTML = html;
    container.classList.add("fade","show");
    nextBtn.classList.remove("hidden");
  }, 300);
}

nextBtn.addEventListener("click", () => {
  const q = questions[current];
  const el = document.getElementById(q.id);
  if(!el.value.trim()){ alert("Wypełnij pole!"); return; }
  answers[q.id] = el.value.trim();
  current++;
  if(current < questions.length) showQuestion();
  else finishForm();
});

function finishForm() {
  container.innerHTML = "<p>Zapisywanie...</p>";
  nextBtn.classList.add("hidden");

  fetch("https://script.google.com/macros/s/AKfycbyW_gVscnVLd4MnXaXAoXWTi0Jmg7eqdMd8AqUyWUZBByxMVc1yU9bsLizede98VFgyCw/exec", {
    method: "POST",
    body: JSON.stringify(answers)
  })
  .then(()=> {
    container.innerHTML = "<p>✅ Zapisano pomyślnie!</p>";
    statusLink.classList.remove("hidden");
  })
  .catch(()=> container.innerHTML = "<p>❌ Błąd zapisu!</p>");
}

// start
document.addEventListener("DOMContentLoaded", showQuestion);
