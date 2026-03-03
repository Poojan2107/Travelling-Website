import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '2rem', paddingTop: '120px'
      }}
    >
      {/* Animated 404 */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{ marginBottom: '2rem' }}
      >
        <div style={{
          fontSize: '9rem', fontWeight: '900', lineHeight: 1,
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          404
        </div>
      </motion.div>

      <i className="fas fa-map-marked-alt" style={{
        fontSize: '3.5rem', color: 'var(--primary)', opacity: 0.7, marginBottom: '1.5rem'
      }} />

      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        You're Off the Map!
      </h1>
      <p style={{
        color: 'var(--text-muted)', maxWidth: '460px',
        lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.05rem'
      }}>
        Looks like this trail doesn't exist. The page you're looking for
        has moved, been deleted, or never existed in the first place.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-home" style={{ marginRight: '8px' }} />
          Back to Home
        </Link>
        <Link to="/#portfolio" className="btn btn-outline">
          <i className="fas fa-compass" style={{ marginRight: '8px' }} />
          Browse Destinations
        </Link>
      </div>

      {/* Decorative stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.3 }}
          style={{
            position: 'fixed',
            top: `${10 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
            width: '4px', height: '4px', borderRadius: '50%',
            background: 'var(--primary)', pointerEvents: 'none', zIndex: 0
          }}
        />
      ))}
    </motion.div>
  );
}

export default NotFound;
