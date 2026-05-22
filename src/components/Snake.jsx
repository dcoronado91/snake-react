import { CELL_SIZE } from '../constants';

function Snake({ snake }) {
  return (
    <>
      {snake.map((segment, i) => (
        <div
          key={i}
          className={`snake-segment${i === 0 ? ' snake-head' : ''}`}
          style={{
            left: segment.x * CELL_SIZE + 1,
            top: segment.y * CELL_SIZE + 1,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />
      ))}
    </>
  );
}

export default Snake;
