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
