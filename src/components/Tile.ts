import { Direction, getOppositeDirection } from "./Directions";
import { TILE_RULES, TILE_WEIGHTS } from "./Config";

class Tile {
  public entropy: number;
  private possibilities: number[];
  private neighbours: Record<Direction, Tile>;

  constructor() {
    this.possibilities = Object.keys(TILE_RULES).map(Number);
    this.neighbours = {} as Record<Direction, Tile>;
    this.entropy = this.possibilities.length;
  }

  public setNeighbour(direction: Direction, tile: Tile) {
    this.neighbours[direction] = tile;
  }

  public getNeighbour(direction: Direction) {
    return this.neighbours[direction];
  }

  public getDirections() {
    return Object.keys(this.neighbours).map((key) => Number(key) as Direction);
  }

  public getPossibilities() {
    return this.possibilities;
  }

  public collapse() {
    const index = this.getWeightedIndex(
      this.possibilities.map((possibility) => TILE_WEIGHTS[possibility])
    );
    this.possibilities = [this.possibilities[index]];
    this.entropy = 0;
  }

  public constrain(neighbourPossibilities: number[], direction: Direction) {
    if (this.entropy == 0) return false;

    const oppositeDirection: Direction = getOppositeDirection(direction);
    const connectors = neighbourPossibilities.map(
      (neighbour) => TILE_RULES[neighbour][direction]
    );

    for (let i = this.possibilities.length - 1; i >= 0; i--) {
      const currentPossibility = this.possibilities[i];
      const oppositeConnector =
        TILE_RULES[currentPossibility][oppositeDirection];
      if (!connectors.includes(oppositeConnector))
        this.possibilities.splice(i, 1);
    }

    this.entropy = this.possibilities.length;
    return this.entropy < neighbourPossibilities.length;
  }

  private getWeightedIndex(weights: number[]) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue <= cumulativeWeight) {
        return i;
      }
    }

    return weights.length - 1;
  }
}

export { Tile };
