import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { destinationsData } from '../components/Destinations';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CATEGORY_COLORS = {
  mountain: '#60a5fa',
  lake: '#34d399',
  beach: '#fbbf24',
  forest: '#4ade80',
  desert: '#fb923c',
  rv: '#c084fc',
};

function MapView() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredDest, setHoveredDest] = useState(null);

  const filtered = activeCategory === 'all'
    ? destinationsData
    : destinationsData.filter(d => d.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'mountain', label: '🏔️ Mountains' },
    { id: 'lake', label: '🏞️ Lakes' },
    { id: 'beach', label: '🏖️ Beaches' },
    { id: 'forest', label: '🌲 Forests' },
    { id: 'desert', label: '🏜️ Deserts' },
    { id: 'rv', label: '🚐 RV Spots' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>
            <i className="fas fa-map-marked-alt" style={{ color: 'var(--primary)', marginRight: '12px' }} />
            Destinations Map
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.9rem' }}>
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''} across India
          </p>
        </div>
        <Link to="/" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }} />Back
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div style={{ padding: '0 2rem 1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--card-border)',
              background: activeCategory === cat.id ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
              color: activeCategory === cat.id ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s', fontWeight: activeCategory === cat.id ? '600' : '400'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Map + Sidebar layout */}
      <div style={{ display: 'flex', flex: 1, gap: '1rem', padding: '0 2rem 2rem', minHeight: '70vh' }}>
        {/* Map */}
        <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', minHeight: '500px' }}>
          <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{ height: '100%', width: '100%', minHeight: '500px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map(dest => (
              <Marker
                key={dest.id}
                position={[dest.lat, dest.lng]}
                eventHandlers={{ click: () => setHoveredDest(dest) }}
              >
                <Popup>
                  <div style={{ minWidth: '180px' }}>
                    <img src={dest.img} alt={dest.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
                    <strong style={{ display: 'block', marginBottom: '4px' }}>{dest.title}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#555', display: 'block', marginBottom: '6px' }}>₹{dest.price.toLocaleString('en-IN')}/night</span>
                    <a href={`/destination/${dest.id}`} style={{ background: '#0ea5e9', color: '#fff', padding: '4px 12px', borderRadius: '20px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>
                      View Details →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar – destination list */}
        <div style={{ width: '280px', flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.7rem', maxHeight: '70vh' }}>
          {filtered.map(dest => (
            <Link
              key={dest.id}
              to={`/destination/${dest.id}`}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: `1px solid ${CATEGORY_COLORS[dest.category] || 'var(--card-border)'}22`,
                  borderLeft: `3px solid ${CATEGORY_COLORS[dest.category] || 'var(--primary)'}`,
                  borderRadius: '10px', padding: '0.8rem', display: 'flex', gap: '10px', cursor: 'pointer'
                }}
              >
                <img src={dest.img} alt={dest.title} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dest.title}</p>
                  <p style={{ margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '0.78rem' }}>₹{dest.price.toLocaleString('en-IN')}/night</p>
                  <span style={{ background: `${CATEGORY_COLORS[dest.category]}22`, color: CATEGORY_COLORS[dest.category], borderRadius: '10px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: '600' }}>
                    {dest.category}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default MapView;
