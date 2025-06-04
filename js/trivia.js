function cargarTrivia(container) {
  container.innerHTML = `
    <h2>🧠 Trivia con Castigo</h2>
    <div id="configTrivia">
      <label for="categoria">Selecciona categoría:</label>
      <select id="categoria">
        <option value="Cine">🎬 Cine</option>
        <option value="Historia">📜 Historia</option>
        <option value="Arte">🎨 Arte</option>
        <option value="Fútbol">⚽ Fútbol</option>
      </select><br><br>

      <label for="numParticipantes">¿Cuántos participantes?</label>
      <input type="number" id="numParticipantes" min="1" max="20" value="2" />
      <button onclick="generarCamposNombres()">➕ Ingresar nombres</button>

      <div id="nombresContainer" style="margin-top: 10px;"></div>
      <br>
      <button onclick="iniciarTrivia()">🎲 Iniciar Trivia</button>
    </div>

    <div id="zonaTrivia" style="display:none;">
      <div id="turnoTrivia">Turno de: <strong><span id="jugadorActualNombre"></span></strong></div>
      <div id="preguntaTrivia"></div>
      <div id="opcionesTrivia"></div>
      <div id="resultadoTrivia" style="margin-top: 10px;"></div>
      <button onclick="siguienteTurnoTrivia()">➡️ Siguiente</button>
    </div>
  `;
}


function generarCamposNombres() {
  const num = parseInt(document.getElementById('numParticipantes').value);
  const container = document.getElementById('nombresContainer');
  container.innerHTML = '';

  for (let i = 1; i <= num; i++) {
    container.innerHTML += `
      <label>Nombre del jugador ${i}: </label>
      <input type="text" id="jugador${i}" placeholder="Ej. Jugador ${i}" /><br>
    `;
  }
}
function cargarJSONDesdeArchivo(ruta, callback) {
  fetch(ruta)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
      }
      return response.json();
    })
    .then(data => callback(data))
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
      alert("❌ No se pudo cargar la trivia. Revisa la consola.");
    });
}


function iniciarTrivia() {
  const categoria = document.getElementById('categoria').value;
  const numParticipantes = parseInt(document.getElementById('numParticipantes').value);

  // Obtener nombres
  jugadoresTrivia = [];
  for (let i = 1; i <= numParticipantes; i++) {
    const nombre = document.getElementById(`jugador${i}`).value.trim();
    jugadoresTrivia.push(nombre || `Jugador ${i}`);
  }

  cargarJSONDesdeArchivo('data/trivias.json', data => {
    preguntasTrivia = data.categorias[categoria] || [];

    if (preguntasTrivia.length < numParticipantes) {
      alert("⚠️ No hay suficientes preguntas en esta categoría.");
      return;
    }

    preguntasSeleccionadas = mezclarArray(preguntasTrivia).slice(0, numParticipantes);
    totalTurnos = numParticipantes;
    turnoActual = 0;

    document.getElementById('configTrivia').style.display = 'none';
    document.getElementById('zonaTrivia').style.display = 'block';
    mostrarPreguntaTrivia();
  });
}


function mostrarPreguntaTrivia() {
  const pregunta = preguntasSeleccionadas[turnoActual];
  const jugador = jugadoresTrivia[turnoActual];

  document.getElementById('jugadorActualNombre').textContent = jugador;
  document.getElementById('preguntaTrivia').innerHTML = `<p>${pregunta.pregunta}</p>`;

  const opcionesDiv = document.getElementById('opcionesTrivia');
  opcionesDiv.innerHTML = '';

  pregunta.opciones.forEach((opcion, index) => {
    const btn = document.createElement('button');
    btn.textContent = opcion;
    btn.onclick = () => verificarRespuestaTrivia(index, pregunta);
    opcionesDiv.appendChild(btn);
  });

  document.getElementById('resultadoTrivia').innerHTML = '';
}


function verificarRespuestaTrivia(indexSeleccionado, pregunta) {
  
  const opcionSeleccionadaTexto = pregunta.opciones[indexSeleccionado];
  const correcto = opcionSeleccionadaTexto === pregunta.respuesta;
  let resultadoHTML = ''; 

  if (correcto) {
    resultadoHTML = "✅ ¡Correcto!";
  } else {
    resultadoHTML = `❌ Incorrecto. La respuesta correcta era: <strong>${pregunta.respuesta}</strong>. <br>Castigo: ${pregunta.castigo || 'Toma un shot'}`;
  }
  document.getElementById('resultadoTrivia').innerHTML = resultadoHTML;

  const opcionesDiv = document.getElementById('opcionesTrivia');
  const botonesOpcion = opcionesDiv.getElementsByTagName('button');
  for (let i = 0; i < botonesOpcion.length; i++) {
    botonesOpcion[i].disabled = true;
  }
}

function siguienteTurnoTrivia() {
  turnoActual++;
  if (turnoActual >= totalTurnos) {
    document.getElementById('zonaTrivia').innerHTML = `<p>🎉 ¡Trivia finalizada!</p>`;
  } else {
    mostrarPreguntaTrivia();
  }
}


function mezclarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
