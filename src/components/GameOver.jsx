function GameOver({ score, isNew, onRestart, onHome }) {
  const fmt = (n) => String(n).padStart(6, '0');

  return (
    <div className="overlay">
      <div className="overlay-box">
        <p className="gameover-label">GAME OVER</p>
        {isNew && <p className="new-record">★ NUEVO RECORD ★</p>}
        <p className="gameover-score">
          PUNTAJE<br /><strong>{fmt(score)}</strong>
        </p>
        <div className="game-buttons">
          <button className="btn-restart" onClick={onRestart}>
            ► JUGAR DE NUEVO
          </button>
          <button className="btn-home" onClick={onHome}>
            ← INICIO
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
