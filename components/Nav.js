'use client';
import { useEffect, useState } from 'react';

function BurgeeIcon() {
  return (
    <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="2" x2="6" y2="36" stroke="rgba(240,235,224,0.35)" strokeWidth="1.2"/>
      <circle cx="6" cy="36" r="2.5" fill="rgba(240,235,224,0.35)"/>
      <polygon points="8,4 30,4 18,19 30,34 8,34" fill="#3d7a6a"/>
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '18px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(25,43,56,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(240,235,224,0.07)' : '1px solid transparent',
      transition: 'background 0.4s ease, border-color 0.4s ease',
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <BurgeeIcon />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.18em', color: 'var(--chart-vellum)' }}>
          BRISTOL
        </span>
      </a>
      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {[['Overview', '#overview'], ['About', '#about'], ['Get Updates', '#hero']].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.2em',
            color: 'rgba(240,235,224,0.7)', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--chart-vellum)'}
            onMouseLeave={e => e.target.style.color = 'rgba(240,235,224,0.7)'}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
