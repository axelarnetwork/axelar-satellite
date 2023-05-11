export default class Particle {
  public x;
  public y;
  public vx;
  public vy;
  public accelX;
  public accelY;
  public life;
  public alpha;
  public size;
  public maxLife;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.life = 10000;
    this.alpha = 1;
    this.size = 20;
    this.maxLife = 0;
  }

  update() {
    this.vx += this.accelX;
    this.vy += this.accelY;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "lightgray";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  isAlive() {
    return this.life >= 0;
  }
}
