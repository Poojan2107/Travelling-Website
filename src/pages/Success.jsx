import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};

const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  return Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
};

/* Confetti particle animation */
const Confetti = () => {
  const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ec4899', '#a855f7'];
  const pieces = Array.from({ length: 40 });
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
          animate={{ y: window.innerHeight + 20, opacity: [1, 1, 0], rotate: Math.random() * 720 - 360 }}
          transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 1.5, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            background: colors[Math.floor(Math.random() * colors.length)],
          }}
        />
      ))}
    </div>
  );
};

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [countdown, setCountdown] = useState(15);

  // Auto-redirect to home after countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const nights = getNights(booking?.checkIn, booking?.checkOut);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      className="section-padding"
      style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Confetti />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* Success Icon */}
        <motion.div
          variants={itemVariants}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.6, times: [0, 0.6, 1] }}
            style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)'
            }}
          >
            <i className="fas fa-check" style={{ fontSize: '2.5rem', color: '#fff' }}></i>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{ fontSize: '2.8rem', fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}
          >
            You're All Set! 🎉
          </motion.h1>
          <motion.p
            variants={itemVariants}
            style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '480px', margin: '0 auto' }}
          >
            Your adventure is officially booked. Pack your bags — an unforgettable experience awaits!
          </motion.p>
        </motion.div>

        {/* Booking Receipt Card */}
        {booking && (
          <motion.div variants={itemVariants} className="glass-card" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
            {/* Card Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              padding: '1.25rem 1.75rem',
              margin: '-1.5rem -1.5rem 1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Booking Receipt</p>
                <p style={{ fontWeight: 'bold', fontSize: '0.95rem', margin: '3px 0 0', fontFamily: 'monospace', letterSpacing: '1px' }}>
                  #{booking.id}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.2)', padding: '4px 12px',
                  borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                  ✓ Confirmed
                </span>
              </div>
            </div>

            {/* Destination Info */}
            {booking.destinationImg && (
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img
                  src={booking.destinationImg}
                  alt={booking.destinationTitle}
                  style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Destination</p>
                  <h2 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--font-display)' }}>{booking.destinationTitle}</h2>
                </div>
              </div>
            )}

            {/* Divider */}
            <div style={{ borderTop: '1px dashed var(--card-border)', marginBottom: '1.5rem' }}></div>

            {/* Trip Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>
                  <i className="fas fa-calendar-check" style={{ marginRight: '6px', color: 'var(--primary)' }}></i>Check-in
                </p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{formatDate(booking.checkIn)}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>
                  <i className="fas fa-calendar-times" style={{ marginRight: '6px', color: 'var(--accent)' }}></i>Check-out
                </p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{formatDate(booking.checkOut)}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>
                  <i className="fas fa-moon" style={{ marginRight: '6px', color: '#a855f7' }}></i>Duration
                </p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{nights} Night{nights !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>
                  <i className="fas fa-users" style={{ marginRight: '6px', color: '#f59e0b' }}></i>Guests
                </p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px dashed var(--card-border)', marginBottom: '1.25rem' }}></div>

            {/* Total Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 4px' }}>Total Amount</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Incl. taxes & cleaning fee</p>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                ₹{booking.totalPrice.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Booked On */}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'right', marginTop: '1rem', marginBottom: 0 }}>
              Booked on {formatDate(booking.bookingDate)}
            </p>
          </motion.div>
        )}

        {/* What's next section */}
        <motion.div variants={itemVariants} className="glass-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            <i className="fas fa-map-signs" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
            What's Next?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: 'fa-suitcase', color: '#22c55e', text: 'Start packing based on the gear recommendations in your booking.' },
              { icon: 'fa-map-marked-alt', color: '#0ea5e9', text: 'Explore your destination's itinerary from the destination page.' },
              { icon: 'fa-ticket-alt', color: '#f59e0b', text: 'Check your full trip details anytime in My Dashboard.' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  background: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <i className={`fas ${item.icon}`} style={{ color: item.color, fontSize: '0.9rem' }}></i>
                </div>
                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.5', paddingTop: '6px' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/my-bookings" className="btn btn-primary" style={{ minWidth: '180px' }}>
            <i className="fas fa-suitcase-rolling" style={{ marginRight: '8px' }}></i>
            View My Trips
          </Link>
          <Link to="/" className="btn btn-outline" style={{ marginTop: 0, minWidth: '180px' }}>
            <i className="fas fa-compass" style={{ marginRight: '8px' }}></i>
            Explore More
          </Link>
        </motion.div>

        {/* Auto redirect countdown */}
        <motion.p
          variants={itemVariants}
          style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2rem' }}
        >
          Redirecting to home in <strong style={{ color: 'var(--primary)' }}>{countdown}s</strong>
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

export default Success;
