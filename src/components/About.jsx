import React from 'react';

function About() {
  return (
    <section className="about section-padding" id="about">
      <div className="about-container glass-card">
        <div className="about-content">
          <span className="subtitle">Discover</span>
          <h2>Our Story</h2>
          <p>
            Started in 2026, Traveling Tent was born from a passion for the great outdoors. What began as a small group of enthusiasts has grown into the country's premier camping organization. We believe that nature is the ultimate reset button, and our mission is to make those wild experiences accessible, comfortable, and absolutely unforgettable.
          </p>
          <div className="stats" style={{ display: 'flex', gap: '2rem', marginTop: '2rem', justifyContent: 'flex-start' }}>
            <div className="stat-item" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>5k+</h3>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Campers</p>
            </div>
            <div className="stat-item" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>50+</h3>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Locations</p>
            </div>
            <div className="stat-item" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>4.9</h3>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rating</p>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800&auto=format&fit=crop&q=80" alt="Campfire" />
        </div>
      </div>
    </section>
  );
}

export default About;
