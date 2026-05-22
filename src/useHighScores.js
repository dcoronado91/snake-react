const KEY = 'snakeHighScores';
const MAX = 10;

export function getHighScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addHighScore(score) {
  if (score <= 0) return;
  const scores = getHighScores();
  scores.push(score);
  scores.sort((a, b) => b - a);
  localStorage.setItem(KEY, JSON.stringify(scores.slice(0, MAX)));
}

export function isTopScore(score) {
  if (score <= 0) return false;
  const scores = getHighScores();
  return scores.length < MAX || score > scores[scores.length - 1];
}
