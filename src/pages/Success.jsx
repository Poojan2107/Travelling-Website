import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Success() {
  const location = useLocation();
  const bookingData = location.state?.booking;

  return (
    <motion.section 
      className="section-padding text-center" 
      style={{ paddingTop: '150px', minHeight: '80vh' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <i className="fas fa-check-circle" style={{ fontSize: '5rem', color: 'var(--accent)', marginBottom: '1.5rem' }}></i>
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Pack your bags! Your adventure is officially reserved. 
          A confirmation email has been sent to your registered address.
        </p>
        
        {bookingData && (
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Trip Summary</h3>
            <p><strong>Destination:</strong> {bookingData.destinationTitle}</p>
            <p className="mt-2"><strong>Dates:</strong> {bookingData.checkIn} to {bookingData.checkOut}</p>
            <p className="mt-2"><strong>Guests:</strong> {bookingData.guests}</p>
            <p className="mt-2" style={{ color: 'var(--primary)', fontWeight: 'bold' }}><strong>Total Paid:</strong> ₹{bookingData.totalPrice.toLocaleString('en-IN')}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
          <Link to="/" className="btn btn-outline" style={{ marginTop: '0' }}>Home</Link>
        </div>
      </div>
    </motion.section>
  );
}

export default Success;
