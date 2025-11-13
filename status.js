fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=status")
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById("krowy");
    for (let i = 1; i <= 50; i++) {
      const k = document.createElement("div");
      k.className = "krowa";
      k.innerHTML = `<span>🖥</span>Krowa ${i}`;

      if (!data[i]) {
        k.classList.add("szary");
        k.title = "Brak dzisiejszego wpisu";
      } else if (data[i].status === "niedziala") {
        k.classList.add("czerwony");
        k.title = `Ostatni wpis: ${data[i].czas}`;
      } else {
        k.classList.add("zielony");
        k.title = `Ostatni wpis: ${data[i].czas}`;
      }

      div.appendChild(k);
    }
  })
  .catch(err => console.error(err));