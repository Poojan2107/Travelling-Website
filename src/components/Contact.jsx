import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    /* 
     * INTENDED EMAILJS INTEGRATION:
     * emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
     *   .then((result) => setSuccessStatus(true));
     */

    // Simulate API Call for portfolio
    setTimeout(() => {
      setSuccessStatus(true);
      setName('');
      setEmail('');
      setMessage('');
      setLoading(false);
      
      setTimeout(() => setSuccessStatus(false), 5000); // hide success msg after 5s
    }, 1500);
  };

  return (
    <section className="contact section-padding" id="contact">
      <div className="section-header">
        <span className="subtitle">Get in touch</span>
        <h2>Plan Your Trip</h2>
      </div>
      <div className="contact-wrapper">
        <div className="contact-info glass-card">
          <h3>Contact Information</h3>
          <p>Our team will help you plan a thrilling adventure.</p>
        </div>
        <div className="contact-form glass-card">
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                id="name" 
                required 
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="input-group">
              <input 
                type="email" 
                id="email" 
                required 
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-group">
              <textarea 
                id="message" 
                required 
                placeholder=" " 
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>
            <AnimatePresence mode="wait">
              {successStatus ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  style={{ background: 'rgba(45, 212, 191, 0.2)', color: 'var(--accent)', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}
                >
                  <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> Message sent! We'll be in touch soon.
                </motion.div>
              ) : (
                <motion.button 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  type="submit" 
                  className="btn btn-primary btn-block"
                  style={{ opacity: loading ? 0.7 : 1 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>Sending... <i className="fas fa-spinner fa-spin"></i></>
                  ) : (
                    <>Send Message <i className="fas fa-paper-plane"></i></>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
