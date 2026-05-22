import { CELL_SIZE } from '../constants';

function Food({ food }) {
  return (
    <div
      className="food"
      style={{
        left: food.x * CELL_SIZE + 4,
        top: food.y * CELL_SIZE + 4,
        width: CELL_SIZE - 8,
        height: CELL_SIZE - 8,
      }}
    />
  );
}

export default Food;
