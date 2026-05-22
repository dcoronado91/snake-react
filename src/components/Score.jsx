function Score({ score, highScore }) {
  const fmt = (n) => String(n).padStart(4, '0');

  return (
    <div className="score-panel">
      <div className="score-item">
        <span className="score-label">SCORE</span>
        <span className="score-value">{fmt(score)}</span>
      </div>
      <div className="score-item">
        <span className="score-label">BEST</span>
        <span className="score-value">{fmt(highScore)}</span>
      </div>
    </div>
  );
}

export default Score;
