"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function AntiGravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ✅ Capture as non-nullable constants so inner functions don't complain
    const c: HTMLCanvasElement = canvas;
    const x2d: CanvasRenderingContext2D = ctx;

    const GREEN_SHADES = [
      "rgba(34,197,94,",
      "rgba(22,163,74,",
      "rgba(74,222,128,",
      "rgba(187,247,208,",
      "rgba(20,83,45,",
    ];

    const MOUSE_RADIUS = 130;
    const REPEL_STRENGTH = 8;
    const RETURN_SPEED = 0.05;
    const FRICTION = 0.85;
    const PARTICLE_COUNT = 180;

    function resize() {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      initParticles();
    }

    function initParticles() {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const px = Math.random() * c.width;
        const py = Math.random() * c.height;
        const shade =
          GREEN_SHADES[Math.floor(Math.random() * GREEN_SHADES.length)];
        particlesRef.current.push({
          x: px,
          y: py,
          originX: px,
          originY: py,
          vx: 0,
          vy: 0,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: shade,
        });
      }
    }

    function drawConnections() {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.18;
            x2d.beginPath();
            x2d.moveTo(particles[i].x, particles[i].y);
            x2d.lineTo(particles[j].x, particles[j].y);
            x2d.strokeStyle = `rgba(34,197,94,${alpha})`;
            x2d.lineWidth = 0.6;
            x2d.stroke();
          }
        }
      }
    }

    function animate() {
      x2d.clearRect(0, 0, c.width, c.height);
      drawConnections();

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * REPEL_STRENGTH;
          p.vy += Math.sin(angle) * force * REPEL_STRENGTH;
          p.vy -= force * 2; // antigravity upward lift
        }

        // Spring return to origin
        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        x2d.beginPath();
        x2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        x2d.fillStyle = `${p.color}${p.opacity})`;
        x2d.fill();

        // Glow for larger particles
        if (p.size > 2.5) {
          const grad = x2d.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3,
          );
          grad.addColorStop(0, `rgba(34,197,94,0.2)`);
          grad.addColorStop(1, `rgba(34,197,94,0)`);
          x2d.beginPath();
          x2d.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          x2d.fillStyle = grad;
          x2d.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(c);

    // Attach to window so overlapping elements don't block mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
