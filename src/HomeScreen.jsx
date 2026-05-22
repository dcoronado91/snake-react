import { getHighScores } from './useHighScores';
import './HomeScreen.css';

function HomeScreen({ onPlay }) {
  const scores = getHighScores();

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <div className="home-top">
          <p className="home-pixel-deco">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</p>
          <h1 className="home-title">SNAKE</h1>
          <p className="home-subtitle">◄ RETRO EDITION ►</p>
          <p className="home-pixel-deco">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</p>
        </div>

        <button className="btn-play" onClick={onPlay}>
          ► JUGAR
        </button>

        <div className="home-scores">
          <p className="scores-title">══ TOP 10 ══</p>
          {scores.length === 0 ? (
            <p className="scores-empty">- AÚN SIN PUNTAJES -</p>
          ) : (
            <div className="scores-list">
              {scores.map((s, i) => (
                <div key={i} className={`score-row${i === 0 ? ' score-gold' : i === 1 ? ' score-silver' : i === 2 ? ' score-bronze' : ''}`}>
                  <span className="score-rank">
                    {i === 0 ? '★' : i === 1 ? '▲' : i === 2 ? '▼' : '#' + String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="score-val">{String(s).padStart(6, '0')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="home-hint">FLECHAS PARA MOVER</p>
      </div>
    </div>
  );
}

export default HomeScreen;
