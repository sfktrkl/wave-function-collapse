import { Direction } from "./Directions";
import { TILE_RULES } from "./Config";
import { Tile } from "./Tile";

class World {
  tileRows: Tile[][];

  constructor(public sizeX: number, public sizeY: number) {
    this.tileRows = [];
    for (let y = 0; y < sizeY; y++) {
      const tiles: Tile[] = [];
      for (let x = 0; x < sizeX; x++) {
        const tile = new Tile();
        tiles.push(tile);
      }
      this.tileRows.push(tiles);
    }

    for (const { tile, x, y } of this.forEachTile()) {
      if (y > 0) tile.setNeighbour(Direction.NORTH, this.tileRows[y - 1][x]);
      if (x > 0) tile.setNeighbour(Direction.WEST, this.tileRows[y][x - 1]);
      if (x < sizeX - 1)
        tile.setNeighbour(Direction.EAST, this.tileRows[y][x + 1]);
      if (y < sizeY - 1)
        tile.setNeighbour(Direction.SOUTH, this.tileRows[y + 1][x]);
    }
  }

  public *forEachTile() {
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        const tile = this.tileRows[y][x];
        yield { tile, x, y };
      }
    }
  }

  getEntropy(x: number, y: number): number {
    return this.tileRows[y][x].entropy;
  }

  getTilesWithMinimumEntropy(): Tile[] {
    const tileList: Tile[] = [];
    let minimum = Object.keys(TILE_RULES).length;
    for (const { tile } of this.forEachTile()) {
      if (tile.entropy > 0) {
        if (tile.entropy < minimum) {
          tileList.length = 0;
          minimum = tile.entropy;
        }
        if (tile.entropy == minimum) tileList.push(tile);
      }
    }

    return tileList;
  }

  waveFunctionCollapse(): boolean {
    const tiles = this.getTilesWithMinimumEntropy();
    if (tiles.length == 0) return false;

    const tile = tiles[Math.floor(Math.random() * tiles.length)];
    const stack: Tile[] = [tile];
    tile.collapse();

    while (stack.length > 0) {
      const tile = stack.pop();
      if (!tile) break;

      for (const direction of tile.getDirections()) {
        const neighbour = tile.getNeighbour(direction);
        if (neighbour.entropy != 0) {
          const reduced = neighbour.constrain(
            tile.getPossibilities(),
            direction
          );
          if (reduced) stack.push(neighbour);
        }
      }
    }

    return true;
  }
}

export { World };
