import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const LoginModal = () => {
  const { isModalOpen, closeLoginModal, loginWithGoogle } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoginModal}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
              zIndex: 9999
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            style={{
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '90%', maxWidth: '400px', zIndex: 10000
            }}
            className="glass-card text-center"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Sign In to Continue</h3>
              <i className="fas fa-times" style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }} onClick={closeLoginModal}></i>
            </div>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Access your adventure dashboard, manage bookings, and unlock premium gear rentals securely.
            </p>

            <button 
              onClick={handleGoogleAuth}
              disabled={loading}
              style={{
                width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'all 0.3s ease'
              }}
              className="google-btn"
            >
              <i className="fab fa-google" style={{ color: '#ea4335', display: 'flex', alignItems: 'center', marginTop: '2px' }}></i>
              <span style={{ display: 'flex', alignItems: 'center' }}>{loading ? 'Authenticating securely...' : 'Sign in with Google'}</span>
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
