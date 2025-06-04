function cargarRuleta(container) {
  const retos = [
    "Toma 2 tragos 🍻",
    "Elige a alguien para beber 🫴",
    "Cuenta un secreto 🤫",
    "Haz un reto ridículo 🕺",
    "Cambia de lugar con otro jugador 🔁",
    "Haz un brindis con rima 🗣️",
    "Todos beben menos tú 😎"
  ];

  container.innerHTML = `
    <h2 style="font-size: 2em; margin-bottom: 20px;">🎯 Ruleta de Retos</h2>
    <div id="ruletaBox" style="position: relative; display: flex; flex-direction: column; align-items: center;">
      <div style="position: relative; width: 400px; height: 400px;">
        <img id="ruletaImg" src="assets/ruletaa.png" alt="Ruleta" style="width: 100%; height: 100%; transition: transform 3s ease-out;" />
        <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 80px solid #FFBF00; border-bottom: 1;"></div>
      </div>
      <p id="resultado" style="margin-top: 30px; font-size: 1.8em; font-weight: bold; transition: transform 0.5s ease;">Haz clic para girar la ruleta</p>
      <button onclick="girarRuleta()" style="margin-top: 20px; font-size: 1.2em; padding: 10px 20px;">🎡 Girar Ruleta</button>
    </div>
  `;

  let rotacionTotal = 0;

  window.girarRuleta = function () {
    const numSegmentos = retos.length;
    const gradosPorSegmento = 360 / numSegmentos;
    const index = Math.floor(Math.random() * numSegmentos);

    // Rotación con precisión para caer en el sector seleccionado
    const gradosObjetivo = 360 - (index * gradosPorSegmento) + (Math.random() * (gradosPorSegmento - 10));
    const vueltas = 5;
    const gradosExtra = vueltas * 360 + gradosObjetivo;

    rotacionTotal += gradosExtra;

    const ruletaImg = document.getElementById('ruletaImg');
    ruletaImg.style.transform = `rotate(${rotacionTotal}deg)`;

    const resultado = document.getElementById('resultado');
    resultado.style.transform = "scale(1)"; // reset

    setTimeout(() => {
      resultado.textContent = "🎲 Resultado: " + retos[index];
      resultado.style.transform = "scale(1.2)";
      setTimeout(() => resultado.style.transform = "scale(1)", 500); // animación rebote
    }, 3000); // espera tras la animación
  };
}
