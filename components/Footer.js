function FooterBurgee() {
  return (
    <svg width="22" height="26" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="2" x2="6" y2="36" stroke="rgba(25,43,56,0.35)" strokeWidth="1.2"/>
      <circle cx="6" cy="36" r="2.5" fill="rgba(25,43,56,0.35)"/>
      <polygon points="8,4 30,4 18,19 30,34 8,34" fill="rgba(61,122,106,0.6)"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--chart-vellum)',
      padding: 48,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: '1px solid rgba(25,43,56,0.1)',
      flexWrap: 'wrap', gap: 16,
      zIndex: 1, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FooterBurgee />
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 13,
          color: 'rgba(25,43,56,0.45)', letterSpacing: '0.18em',
        }}>BRISTOL</span>
      </div>

      <p style={{
        fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 13,
        color: 'rgba(25,43,56,0.35)',
      }}>Ship Shape and Bristol Fashion</p>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 12,
        color: 'rgba(25,43,56,0.3)',
      }}>&copy; 2026 Bristol</p>
    </footer>
  );
}
