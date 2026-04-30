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

const NAV_LINKS = [
  ['Overview', '#overview'],
  ['About',    '#about'],
  ['Get Updates', '#hero'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgba(25,43,56,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled && !menuOpen ? '1px solid rgba(240,235,224,0.07)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 101 }}>
          <BurgeeIcon />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.18em', color: 'var(--chart-vellum)' }}>
            BRISTOL
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {NAV_LINKS.map(([label, href]) => (
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

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, zIndex: 101,
            flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: 'var(--chart-vellum)',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.25s ease',
          }}/>
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: 'var(--chart-vellum)',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.25s ease',
          }}/>
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: 'var(--chart-vellum)',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.25s ease',
          }}/>
        </button>
      </nav>

      {/* Mobile full-screen menu overlay */}
      <div className="mobile-menu" style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(25,43,56,0.97)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 48,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {NAV_LINKS.map(([label, href], i) => (
          <a
            key={label}
            href={href}
            onClick={handleLinkClick}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.22em',
              color: menuOpen ? 'var(--chart-vellum)' : 'transparent',
              textTransform: 'uppercase',
              transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
              transition: `color 0.3s ease, transform 0.3s ease ${i * 0.06}s`,
            }}
          >
            {label}
          </a>
        ))}

        {/* Accent rule */}
        <div style={{ width: 32, height: 1, background: 'var(--verdigris)', opacity: 0.5 }}/>

        <p style={{
          fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 15,
          color: 'rgba(240,235,224,0.35)', letterSpacing: '0.04em',
        }}>Ship Shape and Bristol Fashion</p>
      </div>
    </>
  );
}
