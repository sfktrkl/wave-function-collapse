import { FONT_SIZE, TILE_SIZE } from "./Constants";
import { World } from "./World";

class Drawer {
  private ctx: CanvasRenderingContext2D | null;

  constructor(private world: World, private canvas: HTMLCanvasElement) {
    this.world = world;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = world.sizeX * TILE_SIZE;
    this.canvas.height = world.sizeY * TILE_SIZE;
  }

  private drawEntropy() {
    if (!this.ctx) return;
    this.ctx.font = `${FONT_SIZE}px Arial`;
    for (const { x, y } of this.world.forEachTile()) {
      const destY = y * TILE_SIZE;
      const destX = x * TILE_SIZE;
      this.ctx.clearRect(destX, destY, TILE_SIZE, TILE_SIZE);
      this.ctx.fillText(
        this.world.getEntropy(x, y).toString(),
        x * TILE_SIZE,
        y * TILE_SIZE + FONT_SIZE
      );
    }
  }

  public update() {
    this.drawEntropy();
  }
}

export { Drawer };
