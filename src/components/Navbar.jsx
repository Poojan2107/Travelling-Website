import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, openLoginModal, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuActive(false);
    
    if (location.pathname !== '/') {
      navigate('/' + targetId);
      setTimeout(() => {
        if(targetId === '#') {
          window.scrollTo(0, 0);
        } else {
          const target = document.querySelector(targetId);
          if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProtectedRouting = (e) => {
    if (!user) {
      e.preventDefault();
      setMenuActive(false);
      openLoginModal();
    } else {
      setMenuActive(false);
    }
  };

  return (
    <header id="header" className={scrolled || location.pathname !== '/' ? 'scrolled' : ''}>
      <nav className="navbar" style={{ position: 'relative' }}>
        <h2 className="logo">
          <Link to="/" onClick={(e) => handleNavClick(e, '#')} style={{color: 'inherit'}}>
            Traveling<span>Tent</span>
          </Link>
        </h2>
        
        <div 
          className="menu-btn" 
          id="menu-btn" 
          onClick={() => setMenuActive(!menuActive)}
        >
          <i className={menuActive ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        
        <ul className={`all-links ${menuActive ? 'active' : ''}`} id="nav-links" style={{ alignItems: 'center' }}>
          <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
          <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
          <li><a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>Destinations</a></li>
          <li>
            <Link to="/my-bookings" onClick={handleProtectedRouting} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
              Dashboard
            </Link>
          </li>
          
          <li style={{ marginLeft: '1rem' }}>
            {!user ? (
              <button 
                onClick={() => { setMenuActive(false); openLoginModal(); }}
                className="btn btn-primary"
                style={{ cursor: 'pointer', padding: '8px 20px', fontSize: '0.9rem' }}
              >
                Sign In <i className="fas fa-sign-in-alt"></i>
              </button>
            ) : (
              <div style={{ position: 'relative' }}>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: '2px solid var(--primary)', objectFit: 'cover' }}
                />
                
                {/* User Dropdown */}
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ 
                      position: 'absolute', top: '50px', right: '0', 
                      minWidth: '200px', padding: '1rem', zIndex: 1000 
                    }}
                  >
                    <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{user.name}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    <Link to="/my-bookings" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '8px 0', color: 'var(--text-main)', textDecoration: 'none' }}>
                      <i className="fas fa-suitcase-rolling" style={{ width: '20px', color: 'var(--accent)' }}></i> My Trips
                    </Link>
                    <button 
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      style={{ background: 'transparent', border: 'none', color: '#ff4b4b', cursor: 'pointer', padding: '8px 0', textAlign: 'left', width: '100%', fontSize: '1rem', marginTop: '5px' }}
                    >
                      <i className="fas fa-sign-out-alt" style={{ width: '20px' }}></i> Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
