'use client';
import { useEffect, useRef } from 'react';
import { content } from '@/content';

export default function Overview() {
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const delays = [0, 0.1, 0.22, 0.34];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    refs.forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="overview" style={{
      background: 'transparent', padding: '80px 48px', zIndex: 1, position: 'relative',
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{
        maxWidth: 920, width: '100%',
        background: 'rgba(240,235,224,0.88)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        borderRadius: 14, padding: '64px 72px',
        boxShadow: '0 8px 48px rgba(25,43,56,0.18), 0 1px 0 rgba(255,255,255,0.4) inset',
        border: '1px solid rgba(240,235,224,0.5)',
        display: 'grid',
        gridTemplateColumns: '1fr 1.8fr',
        gap: 64,
      }} className="overview-card">
        {/* Left column */}
        <div>
          <p ref={refs[0]} className="reveal" style={{
            transitionDelay: `${delays[0]}s`,
            fontFamily: 'var(--font-display)', fontSize: 13,
            color: 'var(--verdigris)', letterSpacing: '0.32em',
            textTransform: 'uppercase', marginBottom: 18,
          }}>OVERVIEW</p>
          <h2 ref={refs[1]} className="reveal" style={{
            transitionDelay: `${delays[1]}s`,
            fontFamily: 'var(--font-display)', fontSize: 28,
            color: 'var(--deep-keel)', letterSpacing: '0.1em', lineHeight: 1.3,
          }}>{content.overview.heading}</h2>
          <div ref={refs[2]} className="reveal" style={{
            transitionDelay: `${delays[2]}s`,
            width: 40, height: 2, background: 'var(--nautical-brass)', marginTop: 22,
          }}/>
        </div>

        {/* Right column */}
        <div ref={refs[3]} className="reveal" style={{
          transitionDelay: `${delays[3]}s`,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {content.overview.paragraphs.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75,
              color: '#3a4f5c', fontWeight: 300,
            }} dangerouslySetInnerHTML={{ __html: para }}/>
          ))}
        </div>
      </div>
    </section>
  );
}
