function cargarYoNunca(container) {
  container.innerHTML = `
    <h2>🙊 Yo Nunca Nunca</h2>
    <p id="frase">Presiona el botón para ver una frase</p>
    <button onclick="mostrarFrase()">🍻 Nueva Frase</button>
  `;

  let frases = [];

  fetch("data/yoNunca.json")
    .then(response => response.json())
    .then(data => {
      frases = data;
    })
    .catch(error => {
      document.getElementById("frase").textContent = "⚠️ Error cargando frases.";
      console.error("Error al cargar yoNunca.json:", error);
    });

  window.mostrarFrase = function () {
    if (frases.length === 0) {
      document.getElementById("frase").textContent = "Cargando frases...";
      return;
    }
    const randomIndex = Math.floor(Math.random() * frases.length);
    document.getElementById("frase").textContent = "🙊 " + frases[randomIndex];
  };
}


