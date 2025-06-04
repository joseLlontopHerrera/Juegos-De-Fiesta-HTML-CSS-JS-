function cargarVerdadReto(container) {
  container.innerHTML = `
    <h2>🤔 Verdad o Reto</h2>
    <p>Ingresa los nombres de los jugadores:</p>
    <div id="formJugadores">
      <input type="text" placeholder="Jugador 1" class="jugadorInput" />
      <input type="text" placeholder="Jugador 2" class="jugadorInput" />
      <button onclick="agregarInput()">➕ Agregar jugador</button>
      <button onclick="iniciarJuego()">✅ Iniciar Juego</button>
    </div>

    <div id="juegoVR" style="display: none;">
      <div id="jugadorActual">Turno de: <strong></strong></div>
      <div id="eleccion">
        <button onclick="elegir('verdad')">🟢 Verdad</button>
        <button onclick="elegir('reto')">🔴 Reto</button>
      </div>
      <p id="fraseVR">Esperando elección...</p>
      <div>
        <button onclick="castigar()">⚠️ Castigo</button>
        <button onclick="siguienteJugador()">➡️ Siguiente jugador</button>
      </div>
    </div>

    <h3>📋 Puntos / Castigos</h3>
    <table id="tablaPuntajes" border="1">
      <thead>
        <tr><th>Jugador</th><th>Castigos</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  window.jugadores = [];
  window.turnoActual = 0;

  window.agregarInput = () => {
    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.placeholder = `Jugador ${document.querySelectorAll(".jugadorInput").length + 1}`;
    nuevoInput.className = "jugadorInput";
    document.getElementById("formJugadores").insertBefore(nuevoInput, document.querySelector("#formJugadores button"));
  };

  window.iniciarJuego = () => {
    const inputs = document.querySelectorAll(".jugadorInput");
    jugadores = Array.from(inputs).map(input => {
      const nombre = input.value.trim();
      return nombre ? { nombre, castigos: 0 } : null;
    }).filter(Boolean);

    if (jugadores.length < 2) {
      alert("Debes ingresar al menos 2 jugadores.");
      return;
    }

    document.getElementById("formJugadores").style.display = "none";
    document.getElementById("juegoVR").style.display = "block";
    actualizarTurno();
    renderTabla();
  };

  window.elegir = (opcion) => {
    const verdad = cargarJSONDesdeArchivo("data/verdadReto.json");
    const lista = opcion === "verdad" ? verdad.verdades : verdad.retos;
    const frase = lista[Math.floor(Math.random() * lista.length)];
    document.getElementById("fraseVR").textContent = frase;
  };

  window.siguienteJugador = () => {
    turnoActual = (turnoActual + 1) % jugadores.length;
    document.getElementById("fraseVR").textContent = "Esperando elección...";
    actualizarTurno();
  };

  window.castigar = () => {
    jugadores[turnoActual].castigos += 1;
    renderTabla();
    alert(`${jugadores[turnoActual].nombre} ha recibido un castigo.`);
  };

  function actualizarTurno() {
    document.querySelector("#jugadorActual strong").textContent = jugadores[turnoActual].nombre;
  }

  function renderTabla() {
    const tbody = document.querySelector("#tablaPuntajes tbody");
    tbody.innerHTML = "";
    jugadores.forEach(j => {
      const fila = `<tr><td>${j.nombre}</td><td>${j.castigos}</td></tr>`;
      tbody.innerHTML += fila;
    });
  }

  function cargarJSONDesdeArchivo(ruta) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", ruta, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
  }
}
