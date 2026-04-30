'use client';
import { useEffect, useRef } from 'react';

const BANDS = [
  { yBase: 0.28, amp: 0.13, freq: 0.55, phase: 0.0, thick: 0.38, rgb: [61,122,106],  alpha: 0.18 },
  { yBase: 0.52, amp: 0.11, freq: 0.70, phase: 1.8, thick: 0.32, rgb: [44,66,87],    alpha: 0.22 },
  { yBase: 0.72, amp: 0.14, freq: 0.45, phase: 3.2, thick: 0.42, rgb: [61,122,106],  alpha: 0.14 },
  { yBase: 0.15, amp: 0.09, freq: 0.90, phase: 0.9, thick: 0.26, rgb: [91,124,138],  alpha: 0.16 },
  { yBase: 0.88, amp: 0.10, freq: 0.60, phase: 2.5, thick: 0.30, rgb: [44,66,87],    alpha: 0.18 },
  { yBase: 0.42, amp: 0.08, freq: 1.10, phase: 4.1, thick: 0.20, rgb: [91,124,138],  alpha: 0.12 },
];

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let scrollPhase = 0;
    let targetPhase = 0;
    let lastScrollY = window.scrollY;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('scroll', () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      targetPhase += dy * 0.012;
    }, { passive: true });

    function drawBand(band) {
      const W = canvas.width;
      const H = canvas.height;
      const halfThick = (band.thick * H) / 2;
      const steps = Math.ceil(W / 2);

      const topPts = [];
      const botPts = [];

      for (let i = 0; i <= steps; i++) {
        const nx = i / steps;
        const x  = nx * W;
        const cy = (band.yBase + Math.sin(nx * Math.PI * 2 * band.freq + scrollPhase + band.phase) * band.amp) * H;
        topPts.push([x, cy - halfThick]);
        botPts.push([x, cy + halfThick]);
      }

      ctx.beginPath();
      ctx.moveTo(topPts[0][0], topPts[0][1]);
      for (let i = 1; i < topPts.length; i++) ctx.lineTo(topPts[i][0], topPts[i][1]);
      for (let i = botPts.length - 1; i >= 0; i--) ctx.lineTo(botPts[i][0], botPts[i][1]);
      ctx.closePath();

      const midY = band.yBase * H;
      const grad = ctx.createLinearGradient(0, midY - halfThick, 0, midY + halfThick);
      const [r, g, b] = band.rgb;
      grad.addColorStop(0,   `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${band.alpha})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = grad;
      ctx.fill();
    }

    function drawVignette() {
      const W = canvas.width;
      const H = canvas.height;
      const vig = ctx.createRadialGradient(W*0.5, H*0.42, H*0.05, W*0.5, H*0.5, H*0.9);
      vig.addColorStop(0,   'rgba(25,43,56,0)');
      vig.addColorStop(0.6, 'rgba(20,36,48,0.2)');
      vig.addColorStop(1,   'rgba(12,22,30,0.72)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    }

    function frame() {
      scrollPhase += (targetPhase - scrollPhase) * 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#192b38';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      BANDS.forEach(drawBand);
      drawVignette();
      animId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, display: 'block',
      }}
    />
  );
}
