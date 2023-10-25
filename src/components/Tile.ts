import { Direction } from "./Directions";

class Tile {
  public entropy: number;
  private neighbours: Record<Direction, Tile>;

  constructor() {
    this.neighbours = {} as Record<Direction, Tile>;
    this.entropy = 0;
  }

  public setNeighbour(direction: Direction, tile: Tile) {
    this.neighbours[direction] = tile;
  }

  public getNeighbour(direction: Direction) {
    return this.neighbours[direction];
  }
}

export { Tile };
