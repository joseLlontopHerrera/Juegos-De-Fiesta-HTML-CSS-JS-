function loadGame(game) {
  const gameArea = document.getElementById('gameArea');
    
  switch (game) {
    case 'ruleta':
        cargarRuleta(gameArea);
        break;
    case 'yoNunca':
        cargarYoNunca(gameArea);
        break;
    case 'verdadReto':
        cargarVerdadReto(gameArea);
        break;
    case 'cartas':
        cargarCartas(gameArea);
        break;
    case 'trivia':
        cargarTrivia(gameArea);
        break;
    case 'botella':
        window.location.href = 'botella.html';
        break;
    default:
      gameArea.innerHTML = `<p>❌ Juego no encontrado.</p>`;
  }
}
