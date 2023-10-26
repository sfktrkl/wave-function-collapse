import { FONT_SIZE, TILE_SIZE } from "./Constants";
import { TILE_SPRITES } from "./Config";
import { World } from "./World";

class Drawer {
  private tilesetImage = new Image();
  private ctx: CanvasRenderingContext2D | null;

  constructor(private world: World, private canvas: HTMLCanvasElement) {
    this.world = world;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = world.sizeX * TILE_SIZE;
    this.canvas.height = world.sizeY * TILE_SIZE;
    this.tilesetImage.src = "./tileset.png";
  }

  private drawEntropy() {
    if (!this.ctx) return;
    this.ctx.font = `${FONT_SIZE}px Arial`;
    const minimum = this.world.getMinimumEntropy();
    for (const { x, y } of this.world.forEachTile()) {
      const entropy = this.world.getEntropy(x, y);
      const type = this.world.getType(x, y);
      const sourceX = TILE_SPRITES[type][0];
      const sourceY = TILE_SPRITES[type][1];
      const destX = x * TILE_SIZE;
      const destY = y * TILE_SIZE;
      this.ctx.clearRect(destX, destY, TILE_SIZE, TILE_SIZE);
      this.ctx.drawImage(
        this.tilesetImage,
        sourceX,
        sourceY,
        TILE_SIZE,
        TILE_SIZE,
        destX,
        destY,
        TILE_SIZE,
        TILE_SIZE
      );

      if (entropy !== 0) {
        this.ctx.fillStyle = entropy == minimum ? "yellow" : "black";
        this.ctx.fillText(
          entropy.toString(),
          x * TILE_SIZE,
          y * TILE_SIZE + FONT_SIZE
        );
      }
    }
  }

  public update() {
    this.drawEntropy();
  }
}

export { Drawer };
