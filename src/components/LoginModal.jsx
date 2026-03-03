import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const FIREBASE_ERRORS = {
  'auth/email-already-in-use': 'This email is already registered. Try signing in.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
};

const InputField = ({ icon, type, placeholder, value, onChange }) => (
  <div style={{ position: 'relative', marginBottom: '1rem' }}>
    <i className={`fas ${icon}`} style={{
      position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
      color: 'var(--text-muted)', fontSize: '0.9rem'
    }} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      style={{
        width: '100%', padding: '11px 14px 11px 40px',
        background: 'rgba(255,255,255,0.06)', border: '1px solid var(--card-border)',
        borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.95rem',
        outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
      onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
    />
  </div>
);

const LoginModal = () => {
  const { isModalOpen, closeLoginModal, loginWithGoogle, loginWithEmail, signUpWithEmail } = useAuth();
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [loading, setLoading] = useState(false);

  // Sign In fields
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');

  // Sign Up fields
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirm, setSuConfirm] = useState('');

  const reset = () => {
    setSiEmail(''); setSiPassword('');
    setSuName(''); setSuEmail(''); setSuPassword(''); setSuConfirm('');
    setLoading(false);
  };

  const handleClose = () => { reset(); closeLoginModal(); };

  const handleGoogle = async () => {
    setLoading(true);
    try { await loginWithGoogle(); reset(); }
    catch { toast.error('Google sign-in failed. Please try again.', { position: 'top-center' }); }
    finally { setLoading(false); }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(siEmail, siPassword);
      toast.success('Welcome back! 👋', { position: 'bottom-right' });
      reset();
    } catch (err) {
      toast.error(FIREBASE_ERRORS[err.code] || 'Sign-in failed. Please try again.', { position: 'top-center' });
    } finally { setLoading(false); }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (suPassword !== suConfirm) {
      toast.error("Passwords don't match.", { position: 'top-center' });
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(suName.trim(), suEmail, suPassword);
      toast.success(`Welcome to Traveling Tent, ${suName.split(' ')[0]}! 🎉`, { position: 'bottom-right' });
      reset();
    } catch (err) {
      toast.error(FIREBASE_ERRORS[err.code] || 'Sign-up failed. Please try again.', { position: 'top-center' });
    } finally { setLoading(false); }
  };

  const tabStyle = (active) => ({
    flex: 1, padding: '10px', border: 'none', cursor: 'pointer', fontSize: '0.95rem',
    fontWeight: active ? 'bold' : 'normal', borderRadius: '8px',
    background: active ? 'var(--primary)' : 'transparent',
    color: active ? '#fff' : 'var(--text-muted)',
    transition: 'all 0.25s ease',
  });

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 9999
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-44%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-44%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'fixed', top: '50%', left: '50%', width: '90%', maxWidth: '420px', zIndex: 10000 }}
            className="glass-card"
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem' }}>
                  {tab === 'signin' ? 'Welcome Back 👋' : 'Create Account ✨'}
                </h3>
                <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {tab === 'signin' ? 'Sign in to manage your adventures.' : 'Join Traveling Tent today — it\'s free!'}
                </p>
              </div>
              <i className="fas fa-times" onClick={handleClose}
                style={{ cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-muted)', padding: '4px' }} />
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.2)', padding: '5px', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <button style={tabStyle(tab === 'signin')} onClick={() => setTab('signin')}>Sign In</button>
              <button style={tabStyle(tab === 'signup')} onClick={() => setTab('signup')}>Create Account</button>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'signin' ? (
                <motion.form key="signin" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} onSubmit={handleSignIn}>
                  <InputField icon="fa-envelope" type="email" placeholder="Email address" value={siEmail} onChange={e => setSiEmail(e.target.value)} />
                  <InputField icon="fa-lock" type="password" placeholder="Password" value={siPassword} onChange={e => setSiPassword(e.target.value)} />
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', opacity: loading ? 0.7 : 1 }}>
                    {loading ? <><i className="fas fa-spinner fa-spin" /> &nbsp;Signing In...</> : 'Sign In'}
                  </button>
                </motion.form>
              ) : (
                <motion.form key="signup" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} onSubmit={handleSignUp}>
                  <InputField icon="fa-user" type="text" placeholder="Full name" value={suName} onChange={e => setSuName(e.target.value)} />
                  <InputField icon="fa-envelope" type="email" placeholder="Email address" value={suEmail} onChange={e => setSuEmail(e.target.value)} />
                  <InputField icon="fa-lock" type="password" placeholder="Password (min. 6 chars)" value={suPassword} onChange={e => setSuPassword(e.target.value)} />
                  <InputField icon="fa-check-circle" type="password" placeholder="Confirm password" value={suConfirm} onChange={e => setSuConfirm(e.target.value)} />
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', opacity: loading ? 0.7 : 1 }}>
                    {loading ? <><i className="fas fa-spinner fa-spin" /> &nbsp;Creating Account...</> : 'Create Account'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 1rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="google-btn"
              style={{
                width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '10px', transition: 'all 0.3s ease',
              }}
            >
              <i className="fab fa-google" style={{ color: '#ea4335' }} />
              <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
            </button>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem', textAlign: 'center' }}>
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
