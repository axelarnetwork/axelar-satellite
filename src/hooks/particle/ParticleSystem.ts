import Particle from "./Particle";

export default class ParticleSystem {
  public particles: Particle[];
  public updateHandler: any;

  constructor() {
    this.particles = [];
    this.updateHandler = null;
  }

  addParticle(particle: Particle) {
    this.particles.push(particle);
  }

  update(deltaTime = 0) {
    this.particles.forEach((particle) => {
      particle.update();
      this.updateHandler?.(particle);
    });
  }

  onUpdate(fn: any) {
    this.updateHandler = fn;
  }
}
