import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingCount, setBookingCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, openLoginModal, logout } = useAuth();
  const { cartCount, toggleCart } = useCart();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update booking count whenever user navigates
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
    setBookingCount(bookings.length);
  }, [location]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuActive(false);
    if (location.pathname !== '/') {
      navigate('/' + targetId);
      setTimeout(() => {
        if (targetId === '#') window.scrollTo(0, 0);
        else { const t = document.querySelector(targetId); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }, 100);
      return;
    }
    if (targetId === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const t = document.querySelector(targetId);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleProtectedRouting = (e) => {
    if (!user) { e.preventDefault(); setMenuActive(false); openLoginModal(); }
    else setMenuActive(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      // Dispatch a custom event that Destinations.jsx can listen for
      window.dispatchEvent(new CustomEvent('navbar-search', { detail: searchQuery.trim() }));
    }, 100);
    setSearchQuery('');
  };

  return (
    <>
      <header id="header" className={scrolled || location.pathname !== '/' ? 'scrolled' : ''}>
        <nav className="navbar" style={{ position: 'relative' }}>
          <h2 className="logo">
            <Link to="/" onClick={(e) => handleNavClick(e, '#')} style={{ color: 'inherit' }}>
              Traveling<span>Tent</span>
            </Link>
          </h2>

          <div className="menu-btn" id="menu-btn" onClick={() => setMenuActive(!menuActive)}>
            <i className={menuActive ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={`all-links ${menuActive ? 'active' : ''}`} id="nav-links" style={{ alignItems: 'center' }}>
            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
            <li><a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>Destinations</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
            <li>
              <Link to="/map" onClick={() => setMenuActive(false)} style={{ color: 'var(--text-main)' }}>
                <i className="fas fa-map" style={{ marginRight: '5px', color: 'var(--accent)' }} />Map
              </Link>
            </li>
            <li style={{ position: 'relative' }}>
              <Link to="/my-bookings" onClick={handleProtectedRouting} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                Dashboard
              </Link>
              {bookingCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-12px',
                  background: '#ef4444', color: '#fff', fontSize: '0.65rem',
                  fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'
                }}>{bookingCount > 9 ? '9+' : bookingCount}</span>
              )}
            </li>

            {/* Search icon */}
            <li style={{ marginLeft: '0.5rem' }}>
              <button onClick={() => setSearchOpen(true)} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.1rem', cursor: 'pointer', padding: '8px' }} title="Search destinations">
                <i className="fas fa-search" />
              </button>
            </li>

            {/* Cart */}
            <li style={{ position: 'relative' }}>
              <button onClick={toggleCart} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', cursor: 'pointer', padding: '8px' }}>
                <i className="fas fa-shopping-cart" />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent)', color: 'var(--bg-color)', fontSize: '0.7rem', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </li>

            {/* Auth */}
            <li style={{ marginLeft: '0.5rem' }}>
              {!user ? (
                <button onClick={() => { setMenuActive(false); openLoginModal(); }} className="btn btn-primary" style={{ cursor: 'pointer', padding: '8px 20px', fontSize: '0.9rem' }}>
                  Sign In <i className="fas fa-sign-in-alt" />
                </button>
              ) : (
                <div style={{ position: 'relative' }}>
                  <img src={user.avatar} alt={user.name} onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: '2px solid var(--primary)', objectFit: 'cover' }} />
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card"
                      style={{ position: 'absolute', top: '50px', right: '0', minWidth: '200px', padding: '1rem', zIndex: 1000 }}>
                      <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{user.name}</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</p>
                      </div>
                      <Link to="/my-bookings" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', color: 'var(--text-main)', textDecoration: 'none' }}>
                        <i className="fas fa-suitcase-rolling" style={{ width: '20px', color: 'var(--accent)' }} /> My Trips
                        {bookingCount > 0 && <span style={{ background: '#ef4444', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '0.72rem', fontWeight: 'bold' }}>{bookingCount}</span>}
                      </Link>
                      <Link to="/map" onClick={() => setDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', color: 'var(--text-main)', textDecoration: 'none' }}>
                        <i className="fas fa-map" style={{ width: '20px', color: 'var(--accent)' }} /> Destinations Map
                      </Link>
                      <button onClick={() => { logout(); setDropdownOpen(false); }}
                        style={{ background: 'transparent', border: 'none', color: '#ff4b4b', cursor: 'pointer', padding: '8px 0', textAlign: 'left', width: '100%', fontSize: '1rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-sign-out-alt" style={{ width: '20px' }} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 9998 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '580px', zIndex: 9999 }}
            >
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-bg)', border: '2px solid var(--primary)', borderRadius: '12px', padding: '14px 20px' }}>
                  <i className="fas fa-search" style={{ color: 'var(--primary)', fontSize: '1.1rem' }} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search destinations, categories..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-main)', fontSize: '1.1rem' }}
                  />
                  {searchQuery && <i className="fas fa-times" onClick={() => setSearchQuery('')} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />}
                </div>
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '12px', padding: '0 20px', whiteSpace: 'nowrap' }}>
                  Search
                </button>
              </form>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '12px' }}>
                Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>Esc</kbd> to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
