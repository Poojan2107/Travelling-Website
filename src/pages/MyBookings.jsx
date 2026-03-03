import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate('/');
      return;
    }
    const savedBookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
    setBookings(savedBookings.reverse());
  }, [user, navigate]);

  const clearBookings = () => {
    if(window.confirm("Are you sure you want to clear your booking history?")) {
      localStorage.removeItem('travelBookings');
      setBookings([]);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  if (!user) return null;

  return (
    <motion.section 
      className="dashboard-section section-padding" 
      style={{ paddingTop: '120px', minHeight: '80vh' }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar Profile */}
        <div className="glass-card text-center" style={{ flex: '1', minWidth: '250px', alignSelf: 'flex-start' }}>
          <img 
            src={user.avatar} 
            alt={user.name} 
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', marginBottom: '1rem' }} 
          />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{user.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{user.email}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('bookings')}
            >
              <i className="fas fa-suitcase-rolling" style={{ marginRight: '8px' }}></i> My Trips
            </button>
            <button 
              className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user-cog" style={{ marginRight: '8px' }}></i> Account Settings
            </button>
            <button 
              className="btn btn-outline" 
              onClick={handleLogout}
              style={{ borderColor: '#ef4444', color: '#ef4444', marginTop: '1rem' }}
            >
              <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i> Log Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: '3', minWidth: '300px' }}>
          
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Trip Itineraries</h2>
                {bookings.length > 0 && (
                  <button 
                    onClick={clearBookings} 
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}
                  >
                    <i className="fas fa-trash-alt"></i> Clear History
                  </button>
                )}
              </div>

              {bookings.length === 0 ? (
                <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
                  <i className="fas fa-compass" style={{ fontSize: '4rem', color: 'var(--text-muted)', opacity: 0.5, marginBottom: '1rem' }}></i>
                  <h3>No trips planned yet</h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Adventure awaits. Let's find your next destination.</p>
                  <Link to="/#portfolio" className="btn btn-primary mt-4">Start Exploring</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {bookings.map((booking) => (
                    <div key={booking.id} className="glass-card fade-up" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ width: '200px', height: '140px', flexShrink: 0 }}>
                        <img src={booking.destinationImg} alt="destination" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                      </div>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{booking.destinationTitle}</h3>
                          <span style={{ background: 'rgba(45, 212, 191, 0.2)', color: 'var(--accent)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Confirmed</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', margin: '0.8rem 0' }}>
                          <span><i className="far fa-calendar-alt"></i> {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
                          <span><i className="fas fa-users"></i> {booking.guests} Guest(s)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '1rem', mt: '1rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                          <strong style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>₹{booking.totalPrice.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Account Settings</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
                <input type="text" value={user.name} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', cursor: 'not-allowed', opacity: 0.7 }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
                <input type="email" value={user.email} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', cursor: 'not-allowed', opacity: 0.7 }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem' }}><i className="fas fa-shield-alt"></i> Verified via Google Firebase</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Preferred Currency</label>
                <select style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)' }}>
                  <option>INR (₹) - Indian Rupee</option>
                  <option disabled>USD ($) - US Dollar</option>
                  <option disabled>EUR (€) - Euro</option>
                </select>
              </div>

              <button className="btn btn-primary mt-3" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>Save Changes</button>
            </motion.div>
          )}

        </div>
      </div>
    </motion.section>
  );
}

export default MyBookings;
