'use client';

import React, { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
    }> = [];

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const numStars = 150;
    const connectionDistance = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        10,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      bgGrad.addColorStop(0, '#0c0b1e');
      bgGrad.addColorStop(0.5, '#05050f');
      bgGrad.addColorStop(1, '#020205');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula glow effect (soft purple/blue)
      ctx.globalCompositeOperation = 'screen';
      const nebulaGrad = ctx.createRadialGradient(
        canvas.width * 0.3 + mouse.x * 0.05,
        canvas.height * 0.4 + mouse.y * 0.05,
        50,
        canvas.width * 0.3 + mouse.x * 0.05,
        canvas.height * 0.4 + mouse.y * 0.05,
        Math.max(canvas.width, canvas.height) * 0.5
      );
      nebulaGrad.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
      nebulaGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      // Interpolate mouse movements smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const w = canvas.width;
      const h = canvas.height;

      // Update and draw stars
      stars.forEach((star) => {
        // Apply drifting
        star.baseX += star.speedX;
        star.baseY += star.speedY;

        // Wrap around screen
        if (star.baseX < 0) star.baseX = w;
        if (star.baseX > w) star.baseX = 0;
        if (star.baseY < 0) star.baseY = h;
        if (star.baseY > h) star.baseY = 0;

        // Apply mouse parallax
        star.x = star.baseX + mouse.x * (star.size * 0.015);
        star.y = star.baseY + mouse.y * (star.size * 0.015);

        // Twinkle opacity
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 213, 255, ${Math.max(0.1, star.opacity)})`;
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = '#8b5cf6';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw constellation lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouse.targetX = e.clientX - centerX;
      mouse.targetY = e.clientY - centerY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
