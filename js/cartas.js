function cargarCartas(container) {
  container.innerHTML = `
    <h2>🃏 Cartas Locas</h2>
    <p>Ingresa los nombres de los jugadores:</p>
    <div id="formJugadoresCartas">
      <input type="text" placeholder="Jugador 1" class="jugadorInput" />
      <input type="text" placeholder="Jugador 2" class="jugadorInput" />
      <button onclick="agregarInputCartas()">➕ Agregar jugador</button>
      <button onclick="iniciarCartas()">✅ Iniciar Juego</button>
    </div>

    <div id="juegoCartas" style="display: none;">
      <div id="jugadorActualCarta">Turno de: <strong></strong></div>
      <p id="carta">Haz clic para sacar una carta loca</p>
      <button onclick="mostrarCarta()">🃏 Sacar carta</button>
      <button onclick="siguienteJugadorCarta()">➡️ Siguiente jugador</button>
    </div>
  `;

  window.jugadoresCartas = [];
  window.turnoCarta = 0;
  window.cartas = [];

  window.agregarInputCartas = () => {
    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.placeholder = `Jugador ${document.querySelectorAll(".jugadorInput").length + 1}`;
    nuevoInput.className = "jugadorInput";
    document.getElementById("formJugadoresCartas").insertBefore(nuevoInput, document.querySelector("#formJugadoresCartas button"));
  };

  window.iniciarCartas = () => {
    console.log("🟢 Botón Iniciar presionado");
    const inputs = document.querySelectorAll(".jugadorInput");
    jugadoresCartas = Array.from(inputs).map(input => {
      const nombre = input.value.trim();
      return nombre || null;
    }).filter(Boolean);

    if (jugadoresCartas.length < 2) {
      alert("Agrega al menos dos jugadores.");
      return;
    }

    cartas = cargarJSONDesdeArchivo("data/cartasLocas.json").cartas;
    document.getElementById("formJugadoresCartas").style.display = "none";
    document.getElementById("juegoCartas").style.display = "block";
    actualizarTurnoCarta();
  };

  window.mostrarCarta = () => {
    const carta = cartas[Math.floor(Math.random() * cartas.length)];
    document.getElementById("carta").textContent = carta;
  };

  window.siguienteJugadorCarta = () => {
    turnoCarta = (turnoCarta + 1) % jugadoresCartas.length;
    document.getElementById("carta").textContent = "Haz clic para sacar una carta loca";
    actualizarTurnoCarta();
  };

  function actualizarTurnoCarta() {
    document.querySelector("#jugadorActualCarta strong").textContent = jugadoresCartas[turnoCarta];
  }

  function cargarJSONDesdeArchivo(ruta) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", ruta, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
  }
}
