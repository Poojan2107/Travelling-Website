import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedBookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
    // sort by newest
    setBookings(savedBookings.reverse());
  }, []);

  const clearBookings = () => {
    if(window.confirm("Are you sure you want to clear your booking history?")) {
      localStorage.removeItem('travelBookings');
      setBookings([]);
    }
  }

  return (
    <motion.section 
      className="section-padding" 
      style={{ paddingTop: '150px', minHeight: '80vh' }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="section-header">
        <span className="subtitle">Dashboard</span>
        <h2>My Bookings</h2>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {bookings.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
            <i className="fas fa-suitcase-rolling" style={{ fontSize: '4rem', color: 'var(--text-muted)', opacity: 0.5, marginBottom: '1rem' }}></i>
            <h3>No trips booked yet</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Time to plan your next wild adventure.</p>
            <Link to="/#portfolio" className="btn btn-primary mt-4">Explore Destinations</Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button 
                onClick={clearBookings} 
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}
              >
                <i className="fas fa-trash-alt"></i> Clear History
              </button>
            </div>
            {bookings.map((booking) => (
              <div key={booking.id} className="glass-card fade-up" style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <img src={booking.destinationImg} alt="destination" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
                <div style={{ flex: '2', minWidth: '250px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{booking.destinationTitle}</h3>
                    <span style={{ background: 'rgba(45, 212, 191, 0.2)', color: 'var(--accent)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>Confirmed</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <i className="far fa-calendar-alt" style={{ marginRight: '8px' }}></i>
                    {new Date(booking.checkIn).toLocaleDateString()} &rarr; {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <i className="fas fa-users" style={{ marginRight: '8px' }}></i>
                    {booking.guests} Guest(s)
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</span>
                    <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>₹{booking.totalPrice.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </motion.section>
  );
}

export default MyBookings;
