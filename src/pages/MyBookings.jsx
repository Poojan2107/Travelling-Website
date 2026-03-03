import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const d = new Date(isoString);
  const day   = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year  = d.getFullYear();
  return `${day}/${month}/${year}`;
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) { navigate('/'); return; }
    const saved = JSON.parse(localStorage.getItem('travelBookings')) || [];
    setBookings([...saved].reverse());
    const savedWishlist = JSON.parse(localStorage.getItem('travelWishlist')) || [];
    setWishlist(savedWishlist);
  }, [user, navigate]);

  const cancelBooking = (bookingId) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem('travelBookings', JSON.stringify([...updated].reverse()));
    setBookings(updated);
    toast.success('Booking cancelled successfully.', { position: 'bottom-right' });
  };

  const removeFromWishlist = (destId) => {
    const updated = wishlist.filter(w => w.id !== destId);
    localStorage.setItem('travelWishlist', JSON.stringify(updated));
    setWishlist(updated);
    toast.info('Removed from wishlist.', { position: 'bottom-right' });
  };

  const clearBookings = () => {
    if (window.confirm('Are you sure you want to clear your entire booking history?')) {
      localStorage.removeItem('travelBookings');
      setBookings([]);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  if (!user) return null;

  const sidebarButtons = [
    { id: 'bookings', icon: 'fa-suitcase-rolling', label: 'My Trips' },
    { id: 'wishlist', icon: 'fa-heart', label: 'Wishlist' },
    { id: 'profile', icon: 'fa-user-cog', label: 'Account Settings' },
  ];

  return (
    <motion.section
      className="dashboard-section section-padding"
      style={{ paddingTop: '120px', minHeight: '80vh' }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

        {/* Sidebar */}
        <div className="glass-card text-center" style={{ flex: '1', minWidth: '240px', alignSelf: 'flex-start' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', marginBottom: '1rem' }}
          />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{user.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>{user.email}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarButtons.map(btn => (
              <button
                key={btn.id}
                className={`btn ${activeTab === btn.id ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab(btn.id)}
              >
                <i className={`fas ${btn.icon}`} style={{ marginRight: '8px' }} />
                {btn.label}
                {btn.id === 'wishlist' && wishlist.length > 0 && (
                  <span style={{ marginLeft: '8px', background: 'var(--accent)', color: '#fff', borderRadius: '12px', padding: '1px 8px', fontSize: '0.75rem' }}>
                    {wishlist.length}
                  </span>
                )}
              </button>
            ))}
            <button
              className="btn btn-outline"
              onClick={handleLogout}
              style={{ borderColor: '#ef4444', color: '#ef4444', marginTop: '1rem' }}
            >
              <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }} /> Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: '3', minWidth: '300px' }}>
          <AnimatePresence mode="wait">

            {/* MY TRIPS */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem' }}>My Trips <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>({bookings.length})</span></h2>
                  {bookings.length > 0 && (
                    <button onClick={clearBookings} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem' }}>
                      <i className="fas fa-trash-alt" style={{ marginRight: '6px' }} />Clear All
                    </button>
                  )}
                </div>

                {bookings.length === 0 ? (
                  <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
                    <i className="fas fa-compass" style={{ fontSize: '4rem', color: 'var(--text-muted)', opacity: 0.4, marginBottom: '1rem' }} />
                    <h3>No trips planned yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Adventure awaits! Book your first destination.</p>
                    <Link to="/#portfolio" className="btn btn-primary mt-4">Start Exploring</Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="glass-card"
                        style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}
                      >
                        <div style={{ width: '180px', height: '130px', flexShrink: 0 }}>
                          <img src={booking.destinationImg} alt="destination" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                        </div>
                        <div style={{ flex: '1', minWidth: '220px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>{booking.destinationTitle}</h3>
                            <span style={{ background: 'rgba(45,212,191,0.2)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Confirmed</span>
                          </div>
                          <div style={{ display: 'flex', gap: '1.2rem', color: 'var(--text-muted)', margin: '0.6rem 0', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                            <span><i className="far fa-calendar-alt" style={{ marginRight: '5px' }} />{formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}</span>
                            <span><i className="fas fa-users" style={{ marginRight: '5px' }} />{booking.guests} Guest(s)</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Booked: {formatDate(booking.bookingDate)}</span>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>ID: {booking.id}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                              <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>₹{booking.totalPrice?.toLocaleString('en-IN')}</strong>
                              <button
                                onClick={() => cancelBooking(booking.id)}
                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', padding: '5px 14px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                              >
                                <i className="fas fa-times" style={{ marginRight: '5px' }} />Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* WISHLIST */}
            {activeTab === 'wishlist' && (
              <motion.div key="wishlist" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                  Wishlist <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>({wishlist.length})</span>
                </h2>
                {wishlist.length === 0 ? (
                  <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
                    <i className="fas fa-heart" style={{ fontSize: '4rem', color: 'var(--text-muted)', opacity: 0.4, marginBottom: '1rem' }} />
                    <h3>Your wishlist is empty</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Click the ♡ heart on any destination to save it here.</p>
                    <Link to="/#portfolio" className="btn btn-primary mt-4">Browse Destinations</Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
                    {wishlist.map((dest) => (
                      <motion.div
                        key={dest.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-card"
                        style={{ overflow: 'hidden', padding: 0 }}
                      >
                        <div style={{ position: 'relative', height: '160px' }}>
                          <img src={dest.img} alt={dest.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            onClick={() => removeFromWishlist(dest.id)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#ef4444', fontSize: '0.9rem' }}
                          >
                            <i className="fas fa-heart" />
                          </button>
                          <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem', color: '#fff' }}>
                            ₹{dest.price?.toLocaleString('en-IN')}/night
                          </span>
                        </div>
                        <div style={{ padding: '1rem' }}>
                          <h4 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>{dest.title}</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>{dest.desc?.substring(0, 70)}...</p>
                          <Link to={`/destination/${dest.id}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '0.85rem', padding: '8px' }}>
                            Book Now
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Account Settings</h2>
                {[
                  { label: 'Full Name', value: user.name, type: 'text' },
                  { label: 'Email Address', value: user.email, type: 'email' },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{field.label}</label>
                    <input type={field.type} value={field.value || ''} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', cursor: 'not-allowed', opacity: 0.7, boxSizing: 'border-box' }} />
                  </div>
                ))}
                <p style={{ fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  <i className="fas fa-shield-alt" style={{ marginRight: '6px' }} />Secured via Firebase Authentication
                </p>
                <div style={{ padding: '1rem', background: 'rgba(14,165,233,0.08)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                    <i className="fas fa-info-circle" style={{ marginRight: '6px', color: 'var(--primary)' }} />
                    Profile editing will be available in a future update. Account details are managed securely through Firebase.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default MyBookings;
