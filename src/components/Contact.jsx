import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

// ─── EmailJS credentials (set these in your .env file) ─────────────────────
// VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
// VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
// VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
// ───────────────────────────────────────────────────────────────────────────

function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      // ── Real EmailJS send ──
      try {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        setSuccessStatus(true);
        formRef.current.reset();
        toast.success("Message sent! We'll be in touch soon 🙌", { position: 'bottom-right' });
        setTimeout(() => setSuccessStatus(false), 6000);
      } catch (err) {
        toast.error('Failed to send message. Please try again.', { position: 'top-center' });
      }
    } else {
      // ── Demo mode (no keys configured yet) ──
      await new Promise(r => setTimeout(r, 1200));
      setSuccessStatus(true);
      formRef.current.reset();
      toast.info('Demo mode: EmailJS keys not configured yet. Configure VITE_EMAILJS_* in .env to send real emails.', { position: 'bottom-right', autoClose: 6000 });
      setTimeout(() => setSuccessStatus(false), 6000);
    }

    setLoading(false);
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
          <p>Our team is ready to help you plan a thrilling adventure. Reach out and we'll respond within 24 hours.</p>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {[
              { icon: 'fa-map-marker-alt', label: 'Office', value: 'Bengaluru, Karnataka, India' },
              { icon: 'fa-envelope', label: 'Email', value: 'hello@travelingtent.in' },
              { icon: 'fa-phone', label: 'Phone', value: '+91 98765 43210' },
              { icon: 'fa-clock', label: 'Hours', value: 'Mon–Sat: 9AM–7PM IST' },
            ].map(item => (
              <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`fas ${item.icon}`} style={{ color: 'var(--primary)', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                  <p style={{ margin: 0, fontWeight: '500', fontSize: '0.93rem' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form glass-card">
          <form id="contactForm" ref={formRef} onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" id="name" name="from_name" required placeholder=" " />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="input-group">
              <input type="email" id="email" name="from_email" required placeholder=" " />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-group">
              <input type="text" id="subject" name="subject" placeholder=" " />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="input-group">
              <textarea id="message" name="message" required placeholder=" " rows="4" />
              <label htmlFor="message">Your Message</label>
            </div>
            <AnimatePresence mode="wait">
              {successStatus ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ background: 'rgba(45,212,191,0.2)', color: 'var(--accent)', padding: '1rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}
                >
                  <i className="fas fa-check-circle" style={{ marginRight: '8px' }} />Message sent! We'll be in touch soon.
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ opacity: loading ? 0.7 : 1 }}
                  disabled={loading}
                >
                  {loading ? <><i className="fas fa-spinner fa-spin" /> &nbsp;Sending...</> : <><i className="fas fa-paper-plane" style={{ marginRight: '8px' }} />Send Message</>}
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
