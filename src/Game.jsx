import { useState, useEffect, useRef } from 'react';
import Board from './components/Board';
import Score from './components/Score';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';
import { addHighScore, getHighScores, isTopScore } from './useHighScores';
import {
  GRID_SIZE,
  INITIAL_SPEED,
  SPEED_INCREMENT,
  MIN_SPEED,
  POINTS_PER_FOOD,
  INITIAL_SNAKE,
  INITIAL_DIR,
} from './constants';
import './Game.css';

function generateFood(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

function Game({ onHome }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => getHighScores()[0] || 0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Imperative refs so the game loop always reads current values without
  // relying on React functional-updater closures (which can fire twice in
  // Strict Mode and cause desync between snake growth and food position).
  const snakeRef = useRef(INITIAL_SNAKE);
  const dirRef = useRef(INITIAL_DIR);
  const foodRef = useRef({ x: 15, y: 10 });
  const gameOverRef = useRef(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    const handleKey = (e) => {
      const { key } = e;
      const d = dirRef.current;

      if (key === 'ArrowUp' && d.y !== 1) {
        e.preventDefault();
        dirRef.current = { x: 0, y: -1 };
      } else if (key === 'ArrowDown' && d.y !== -1) {
        e.preventDefault();
        dirRef.current = { x: 0, y: 1 };
      } else if (key === 'ArrowLeft' && d.x !== 1) {
        e.preventDefault();
        dirRef.current = { x: -1, y: 0 };
      } else if (key === 'ArrowRight' && d.x !== -1) {
        e.preventDefault();
        dirRef.current = { x: 1, y: 0 };
      }

      const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
      if (isArrow && !gameOverRef.current) {
        setStarted(true);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;

    const tick = () => {
      if (gameOverRef.current) return;

      const currentSnake = snakeRef.current;
      const d = dirRef.current;
      const head = currentSnake[0];
      const newHead = { x: head.x + d.x, y: head.y + d.y };

      const hitWall =
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE;
      const hitSelf = currentSnake.some((s) => s.x === newHead.x && s.y === newHead.y);

      if (hitWall || hitSelf) {
        gameOverRef.current = true;
        setGameOver(true);
        return;
      }

      const ateFood =
        newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;

      const newSnake = ateFood
        ? [newHead, ...currentSnake]
        : [newHead, ...currentSnake.slice(0, -1)];

      snakeRef.current = newSnake;
      setSnake(newSnake);

      if (ateFood) {
        const newFood = generateFood(newSnake);
        foodRef.current = newFood;
        setFood(newFood);

        const newScore = scoreRef.current + POINTS_PER_FOOD;
        scoreRef.current = newScore;
        setScore(newScore);
        setHighScore((h) => Math.max(h, newScore));
        setSpeed((sp) => Math.max(MIN_SPEED, sp - SPEED_INCREMENT));
      }
    };

    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [started, gameOver, speed]);

  useEffect(() => {
    if (!gameOver) return;
    const final = scoreRef.current;
    if (final > 0) {
      const wasNew = isTopScore(final);
      addHighScore(final);
      setIsNewRecord(wasNew);
      setHighScore(getHighScores()[0] || 0);
    }
  }, [gameOver]);

  const restart = () => {
    const newFood = generateFood(INITIAL_SNAKE);
    dirRef.current = INITIAL_DIR;
    foodRef.current = newFood;
    gameOverRef.current = false;
    scoreRef.current = 0;
    snakeRef.current = INITIAL_SNAKE;
    setSnake(INITIAL_SNAKE);
    setFood(newFood);
    setScore(0);
    setGameOver(false);
    setStarted(false);
    setSpeed(INITIAL_SPEED);
    setIsNewRecord(false);
  };

  return (
    <div className="game-wrapper">
      <header className="game-header">
        <h1 className="game-title">SNAKE</h1>
        <Score score={score} highScore={highScore} />
      </header>
      <Board snake={snake} food={food}>
        {!started && !gameOver && <StartScreen />}
        {gameOver && (
          <GameOver
            score={score}
            isNew={isNewRecord}
            onRestart={restart}
            onHome={onHome}
          />
        )}
      </Board>
    </div>
  );
}

export default Game;
