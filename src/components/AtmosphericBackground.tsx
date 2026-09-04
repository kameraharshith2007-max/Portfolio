import { useEffect, useRef } from 'react';

type Props = {
  reducedMotion: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
};

export default function AtmosphericBackground({ reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 25 : reducedMotion ? 0 : 60;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          size: Math.random() * 1.2 + 0.3,
          baseAlpha: Math.random() * 0.25 + 0.05,
          alpha: 0,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    initParticles();

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouse);

    let time = 0;

    const render = () => {
      time += 0.004;

      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.03;

      ctx.clearRect(0, 0, w, h);

      // Layered volumetric gradient — dark grey, not black
      const cx = w * 0.5 + mouseRef.current.x * 50;
      const cy = h * 0.35 + mouseRef.current.y * 35;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
      grad.addColorStop(0, 'rgba(42, 42, 47, 0.4)');
      grad.addColorStop(0.35, 'rgba(21, 21, 23, 0.2)');
      grad.addColorStop(1, 'rgba(10, 10, 11, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle accent glow that drifts
      const ax = w * 0.75 + Math.sin(time * 0.3) * 70;
      const ay = h * 0.6 + Math.cos(time * 0.2) * 45;
      const aGrad = ctx.createRadialGradient(ax, ay, 0, ax, ay, 280);
      aGrad.addColorStop(0, 'rgba(201, 169, 97, 0.035)');
      aGrad.addColorStop(1, 'rgba(201, 169, 97, 0)');
      ctx.fillStyle = aGrad;
      ctx.fillRect(0, 0, w, h);

      // Particles — subtle, mouse-repelling
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        const mx = (mouseRef.current.x * 0.5 + 0.5) * w;
        const my = (mouseRef.current.y * 0.5 + 0.5) * h;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const force = (1 - dist / 140) * 0.4;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        p.alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(time * 1.5 + p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 244, ${p.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    if (!reducedMotion) {
      rafRef.current = requestAnimationFrame(render);
    } else {
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, Math.max(w, h) * 0.75);
      grad.addColorStop(0, 'rgba(42, 42, 47, 0.4)');
      grad.addColorStop(1, 'rgba(10, 10, 11, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
