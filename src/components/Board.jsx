import { GRID_SIZE } from '../constants';
import Snake from './Snake';
import Food from './Food';

function Board({ snake, food, children }) {
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div className="board">
      {cells.map((_, i) => (
        <div key={i} className="cell" />
      ))}
      <Snake snake={snake} />
      <Food food={food} />
      {children}
    </div>
  );
}

export default Board;
