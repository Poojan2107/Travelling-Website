import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../components/Services';

const servicePackages = {
  'tents': [
    { name: 'Basic Dome', price: 500, desc: 'Compact 2-person tent.' },
    { name: 'Family Cabin', price: 1500, desc: 'Large 6-person tent with partition.' },
    { name: 'Glamping Yurt', price: 4000, desc: 'Premium canvas yurt with real bed.' }
  ],
  'sleeping-bags': [
    { name: 'Summer Bag', price: 200, desc: 'Lightweight for warm weather.' },
    { name: 'Alpine Thermal', price: 800, desc: 'Rated for -15°C extremes.' }
  ],
  'stoves': [
    { name: 'Single Burner', price: 300, desc: 'Lightweight backpacking stove.' },
    { name: 'Camp Master Grill', price: 1200, desc: 'Dual-burner setup with grill plate.' }
  ],
  'backpacks': [
    { name: 'Daypack 30L', price: 250, desc: 'Small pack for hiking.' },
    { name: 'Expedition 75L', price: 900, desc: 'Heavy-duty trekking pack.' }
  ],
  'chairs': [
    { name: 'Folding Stool', price: 100, desc: 'Basic tripod seating.' },
    { name: 'Reclining Lounger', price: 600, desc: 'Padded chair with cup holders.' }
  ],
  'lights': [
    { name: 'Headlamp', price: 150, desc: 'Hands-free trail lighting.' },
    { name: 'Solar Lantern', price: 400, desc: '360° campsite illumination.' }
  ]
};

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);
  const packages = servicePackages[id] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="details-page section-padding text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Service not found.</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary" style={{ marginTop: '20px' }}>Go Back</button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="details-page section-padding"
    >
      <Link to="/" className="back-link" style={{ marginBottom: '2rem' }}>
        <i className="fas fa-arrow-left"></i> Back to Services
      </Link>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>
          <i className={`fas ${service.icon}`}></i>
        </div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)' }}>{service.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          {service.desc}
        </p>
      </div>

      <div className="section-header">
        <span className="subtitle">Available Rentals</span>
        <h2>Choose Your Package</h2>
      </div>

      <div className="cards-grid">
        {packages.map((pkg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{pkg.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{pkg.desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '15px' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                ₹{pkg.price}/day
              </span>
              <button className="btn btn-outline" style={{ padding: '8px 16px' }} onClick={() => { alert('Added to rental cart!'); navigate(-1); }}>
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ServiceDetails;
