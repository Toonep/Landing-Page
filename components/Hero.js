'use client';
import { useState } from 'react';

function HeroBurgee() {
  return (
    <svg width="72" height="86" viewBox="0 0 72 86" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0, animation: 'fadeUp 1.0s ease 0.2s forwards' }}>
      <line x1="13" y1="4" x2="13" y2="80" stroke="rgba(240,235,224,0.3)" strokeWidth="1.5"/>
      <circle cx="13" cy="80" r="4" fill="rgba(240,235,224,0.3)"/>
      <polygon points="16,6 64,6 40,43 64,80 16,80" fill="#3d7a6a"/>
    </svg>
  );
}

function ScrollIndicator() {
  const handleClick = () => {
    document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div onClick={handleClick} style={{
      position: 'absolute', bottom: 64,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      cursor: 'pointer', opacity: 0,
      animation: 'fadeUp 1.0s ease 2s forwards',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 9,
        letterSpacing: '0.32em', color: 'rgba(240,235,224,0.55)',
      }}>SCROLL FOR MORE</span>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(61,122,106,0.15)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        animation: 'glowPulse 2s ease-in-out infinite',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(61,122,106,0.5)',
          animation: 'ringPulse 2s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: '1px solid rgba(61,122,106,0.2)',
          animation: 'ringPulse 2s ease-in-out 0.3s infinite',
        }}/>
        <div style={{
          width: 10, height: 10,
          borderRight: '1.5px solid rgba(240,235,224,0.8)',
          borderBottom: '1.5px solid rgba(240,235,224,0.8)',
          animation: 'chevronBob 2s ease-in-out infinite',
          marginTop: -3,
        }}/>
      </div>
    </div>
  );
}

export default function Hero() {
  const [email, setEmail]       = useState('');
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh', position: 'relative', zIndex: 1,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '96px 48px',
      textAlign: 'center',
    }}>
      {/* Glow blob */}
      <div style={{
        position: 'absolute', zIndex: 5,
        width: 820, height: 480, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(61,122,106,0.42) 0%, rgba(61,122,106,0.18) 35%, rgba(44,66,87,0.10) 60%, transparent 80%)',
        filter: 'blur(52px)',
        animation: 'blobDrift 8s ease-in-out infinite, blobSwell 5s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <HeroBurgee />

        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.35em',
          color: 'var(--verdigris)', textTransform: 'uppercase',
          opacity: 0, animation: 'fadeUp 1.0s ease 0.5s forwards',
        }}>LAUNCHING SOON</p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 7vw, 88px)',
          fontWeight: 400,
          color: 'var(--chart-vellum)',
          letterSpacing: '0.14em',
          textShadow: '0 0 120px rgba(61,122,106,0.7), 0 0 48px rgba(61,122,106,0.35), 0 2px 24px rgba(25,43,56,0.9)',
          opacity: 0, animation: 'fadeUp 1.0s ease 0.65s forwards',
          lineHeight: 1,
        }}>BRISTOL</h1>

        <p style={{
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(19px, 2.6vw, 28px)',
          color: '#c8c1b0',
          textShadow: '0 0 60px rgba(61,122,106,0.45), 0 1px 16px rgba(25,43,56,0.7)',
          maxWidth: 600,
          opacity: 0, animation: 'fadeUp 1.0s ease 0.8s forwards',
        }}>Making your business Ship Shape and Bristol Fashion.</p>

        {/* Email form */}
        <div style={{ opacity: 0, animation: 'fadeUp 1.0s ease 1.0s forwards', width: '100%', maxWidth: 480 }}>
          {status === 'success' ? (
            <p style={{
              fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 16,
              color: 'var(--verdigris)',
            }}>You&apos;re on the list — fair winds ahead.</p>
          ) : (
            <form onSubmit={handleSubmit} className="hero-form" style={{ display: 'flex' }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, padding: '15px 22px',
                  background: 'rgba(240,235,224,0.07)',
                  border: '1px solid rgba(240,235,224,0.18)',
                  borderRight: 'none',
                  borderRadius: '3px 0 0 3px',
                  color: 'var(--chart-vellum)',
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '15px 28px',
                  background: 'var(--verdigris)',
                  border: 'none',
                  borderRadius: '0 3px 3px 0',
                  color: 'var(--chart-vellum)',
                  fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.22em',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#4a8f7c'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--verdigris)'}
              >
                {status === 'loading' ? '...' : 'NOTIFY ME'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p style={{ marginTop: 8, fontSize: 12, color: '#e07a5f' }}>
              Something went wrong — please try again.
            </p>
          )}
        </div>

        {status !== 'success' && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 12,
            color: 'rgba(240,235,224,0.3)',
            opacity: 0, animation: 'fadeUp 1.0s ease 1.15s forwards',
          }}>Be the first aboard when we launch.</p>
        )}
      </div>

      <ScrollIndicator />
    </section>
  );
}
