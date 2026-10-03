import React, { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse movement tracking for soft ambient light
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particles: stars, glowing dust, and floating romantic micro-hearts
    const particleCount = prefersReducedMotion
      ? 25
      : Math.min(65, Math.floor((width * height) / 22000));

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const isHeart = Math.random() < 0.15; // 15% are subtle hearts
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isHeart ? Math.random() * 4 + 3 : Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * (isHeart ? 0.2 : 0.35),
        vy: isHeart ? -(Math.random() * 0.4 + 0.2) : (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: isHeart
          ? "rgba(244, 114, 182, "
          : Math.random() > 0.4
          ? "rgba(253, 226, 235, "
          : "rgba(244, 63, 94, ",
        isHeart,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    // Helper to draw tiny graceful heart
    const drawHeart = (c, x, y, size, alpha) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      // top right curve
      c.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      c.fillStyle = `rgba(244, 114, 182, ${alpha * 0.6})`;
      c.shadowColor = "rgba(244, 63, 94, 0.4)";
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    };

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Render subtle interactive cursor spotlight glow
      const mouse = mousePosRef.current;
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          320
        );
        mouseGlow.addColorStop(0, "rgba(244, 63, 94, 0.07)");
        mouseGlow.addColorStop(0.5, "rgba(168, 85, 247, 0.03)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        const currentAlpha =
          p.alpha * (0.6 + 0.4 * Math.sin(tick * p.twinkleSpeed + p.twinkleOffset));

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.radius, currentAlpha);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.shadowColor = p.color + "0.6)";
          ctx.shadowBlur = p.radius * 3;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Deep Obsidian Background Layer with Soft Rose/Violet Radial Vignettes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft static lighting orbs */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-rose-900/12 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-purple-950/15 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[700px] h-[700px] rounded-full bg-rose-950/15 blur-[160px] pointer-events-none" />
      </div>

      {/* Dynamic Starlight & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
        aria-hidden="true"
      />
    </>
  );
}
