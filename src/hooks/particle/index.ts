import Particle from "./Particle";
import ParticleSystem from "./ParticleSystem";

/* credit to https://codepen.io/vladwulf/pen/mdxKNoR */
export const drawBackground = () => {
  if (typeof window !== "undefined") {
    const canvas = document.getElementById("canvas") as
      | HTMLCanvasElement
      | undefined;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    const system = new ParticleSystem();

    for (let i = 0; i < 200; i++) {
      const particle = new Particle();

      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.life = Math.random() * 1000 + 10000;
      particle.size = Math.random() * 1.5;
      particle.maxLife = particle.life;
      system.addParticle(particle);
    }

    system.onUpdate((particle: Particle) => {
      if (!particle.isAlive()) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.vx = 0;
        particle.vy = 0;
        particle.life = Math.random() * 1000 + 10000;
        particle.maxLife = particle.life;
      }

      particle.life -= 10;
      particle.accelX = (Math.random() - 0.5) * 0.002;
      particle.accelY = (Math.random() - 0.5) * 0.002;

      if (particle.life >= particle.maxLife / 2) {
        particle.alpha = 1 - particle.life / particle.maxLife;
      } else {
        particle.alpha = particle.life / particle.maxLife;
      }

      particle.update();
    });

    const update = () => {
      system.update();
    };

    const draw = () => {
      if (!ctx) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#000";

      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width
      );
      grad.addColorStop(0, "#000");
      grad.addColorStop(1, "#000");

      ctx.fillStyle = grad;
      ctx.clearRect(0, 0, width, height);
      // ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";
      // ctx.fillStyle = "#22a2ee";
      ctx.fillStyle = "#fff";

      system.particles.forEach((particle) => particle.draw(ctx));
    };

    const render = () => {
      update();
      draw();
      requestAnimationFrame(render);
    };

    const setup = () => {
      canvas.width = width;
      canvas.height = height;
    };

    const init = () => {
      setup();
      render();
    };

    init();
  }
};
