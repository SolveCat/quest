function zapisz() {
  const data = {
    login: document.getElementById("login").value.trim(),
    laptop: document.getElementById("laptop").value,
    skaner: document.getElementById("skaner").value,
    drukarka: document.getElementById("drukarka").value,
    braki: document.getElementById("braki").value.trim(),
  };

  if (!data.login) {
    alert("Wpisz login lub zeskanuj badge!");
    return;
  }

  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(res => res.text())
    .then(() => {
      document.getElementById("msg").innerText = "✅ Zapisano pomyślnie!";
    })
    .catch(() => {
      document.getElementById("msg").innerText = "❌ Błąd zapisu!";
    });
}