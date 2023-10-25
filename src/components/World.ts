import { Direction } from "./Directions";
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
}

export { World };
