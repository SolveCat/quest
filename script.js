const questions = [
  { id: "login", type: "text", label: "Zeskanuj badge lub wpisz login:" },
  { id: "laptop", type: "select", label: "Czy laptop działa?", options: ["tak", "nie"] },
  { id: "skaner", type: "select", label: "Czy skaner działa?", options: ["tak", "nie"] },
  { id: "drukarka", type: "select", label: "Czy drukarka działa?", options: ["tak", "nie"] },
  { id: "braki", type: "text", label: "Czy czegoś brakuje? (np. papier, kabel...)" },
];

let answers = {};
let current = 0;

const form = document.getElementById("formContainer");
const msg = document.getElementById("msg");

function showQuestion(index) {
  form.innerHTML = "";

  const q = questions[index];
  if (!q) {
    finishForm();
    return;
  }

  const div = document.createElement("div");
  div.className = "question active";

  const label = document.createElement("label");
  label.textContent = q.label;

  let input;
  if (q.type === "text") {
    input = document.createElement("input");
    input.id = q.id;
    input.placeholder = q.placeholder || "";
  } else if (q.type === "select") {
    input = document.createElement("select");
    input.id = q.id;
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Wybierz";
    input.appendChild(empty);
    q.options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
      input.appendChild(o);
    });
  }

  const btn = document.createElement("button");
  btn.textContent = "Dalej";
  btn.onclick = () => nextQuestion(q.id, input.value);

  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(btn);

  form.appendChild(div);
}

function nextQuestion(id, value) {
  if (!value.trim()) {
    alert("Wypełnij to pole!");
    return;
  }

  answers[id] = value.trim();
  const currentDiv = document.querySelector(".question");
  currentDiv.classList.add("fadeOut");

  setTimeout(() => {
    current++;
    showQuestion(current);
  }, 400);
}

function finishForm() {
  form.innerHTML = `<div class="question active"><h2>Zapisywanie...</h2></div>`;

  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify(answers),
  })
    .then(res => res.text())
    .then(() => {
      form.innerHTML = `
        <div class="question active">
          <h2>✅ Zapisano pomyślnie!</h2>
          <button onclick="window.location='status.html'">Zobacz STATUS</button>
        </div>`;
    })
    .catch(() => {
      msg.innerText = "❌ Błąd zapisu!";
    });
}

// Start
showQuestion(current);