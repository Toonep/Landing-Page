'use client';
import { useEffect, useRef, useState } from 'react';
import { content } from '@/content';

function PillarCard({ pillar, delay }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transitionDelay: `${delay}s`,
        background: hovered ? 'rgba(44,66,87,0.85)' : '#192b38',
        padding: '40px 36px',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(25,43,56,0.35)' : 'none',
        zIndex: hovered ? 1 : 0,
        position: 'relative',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 10,
        color: 'var(--nautical-brass)', letterSpacing: '0.28em',
      }}>{pillar.num}</span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 19,
        color: 'var(--chart-vellum)', letterSpacing: '0.08em', lineHeight: 1.3,
      }}>{pillar.title}</h3>
      <div style={{ width: 28, height: 1, background: 'var(--verdigris)', opacity: 0.7 }}/>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.8,
        color: 'rgba(240,235,224,0.75)', fontWeight: 300,
      }}>{pillar.body}</p>
    </div>
  );
}

export default function Pillars() {
  return (
    <section id="about" style={{
      background: 'var(--chart-vellum)',
      padding: '80px 48px 96px',
      zIndex: 1, position: 'relative',
    }}>
      <div style={{
        content: '""',
        position: 'absolute', top: 0, left: 0, right: 0, height: 60,
        background: 'linear-gradient(to bottom, transparent, var(--chart-vellum))',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 10,
          color: 'var(--verdigris)', letterSpacing: '0.32em',
          textTransform: 'uppercase', textAlign: 'center', marginBottom: 64,
        }}>WHAT WE&apos;RE BUILDING</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(25,43,56,0.12)',
          border: '1px solid rgba(25,43,56,0.12)',
          borderRadius: 4,
          overflow: 'hidden',
        }} className="pillars-grid">
          {content.pillars.map((p, i) => (
            <PillarCard key={p.num} pillar={p} delay={[0.1, 0.22, 0.34][i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
