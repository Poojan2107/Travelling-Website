import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Destinations', to: '/#portfolio' },
    { label: 'Services', to: '/#services' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/#contact' },
  ];

  const catLinks = [
    '🏔️ Mountains', '🏞️ Lakes', '🏖️ Beaches', '🌲 Forests', '🏜️ Deserts', '🚐 RV Spots'
  ];

  const socials = [
    { icon: 'fa-instagram', href: '#', color: '#e1306c' },
    { icon: 'fa-twitter', href: '#', color: '#1da1f2' },
    { icon: 'fa-youtube', href: '#', color: '#ff0000' },
    { icon: 'fa-linkedin-in', href: '#', color: '#0077b5' },
  ];

  const linkStyle = { color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' };

  return (
    <>
      <footer style={{ background: 'rgba(0,0,0,0.45)', borderTop: '1px solid var(--card-border)', backdropFilter: 'blur(10px)', marginTop: '4rem' }}>
        
        {/* Main Grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1rem' }}>
                Traveling<span style={{ color: 'var(--primary)' }}>Tent</span>
              </h3>
            </Link>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Your gateway to India's most breathtaking camping and adventure destinations. Premium gear. Unforgettable memories.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s) => (
                <a key={s.icon} href={s.href} style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid var(--card-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', transition: 'all 0.3s ease', textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                >
                  <i className={`fab ${s.icon}`} style={{ fontSize: '0.8rem' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.6rem', marginRight: '8px', opacity: 0.5 }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Explore</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {catLinks.map((c) => (
                <li key={c}>
                  <Link to="/#portfolio" style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: 'fa-map-marker-alt', text: 'Bengaluru, Karnataka, India' },
                { icon: 'fa-envelope', text: 'hello@travelingtent.in' },
                { icon: 'fa-phone', text: '+91 98765 43210' },
                { icon: 'fa-clock', text: 'Mon–Sat: 9AM – 7PM IST' },
              ].map((item) => (
                <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <i className={`fas ${item.icon}`} style={{ color: 'var(--primary)', marginTop: '2px', width: '14px', flexShrink: 0, fontSize: '0.85rem' }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--card-border)', padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', margin: 0 }}>
            © {year} TravelingTent. All rights reserved. Made with <span style={{ color: '#ef4444' }}>♥</span> in India.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(t => (
              <a key={t} href="#" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >{t}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        id="scrollToTopBtn"
        className={showScroll ? 'visible' : ''}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}

export default Footer;
