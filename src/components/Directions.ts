export enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

const oppositeDirections: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.SOUTH,
  [Direction.EAST]: Direction.WEST,
  [Direction.SOUTH]: Direction.NORTH,
  [Direction.WEST]: Direction.EAST,
};
export function getOppositeDirection(direction: Direction) {
  return oppositeDirections[direction];
}
