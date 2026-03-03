import React from 'react';

function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Image placeholder */}
      <div style={{ height: '220px', background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />

      {/* Content placeholder */}
      <div style={{ padding: '1.5rem' }}>
        {/* Title */}
        <div style={{ height: '20px', width: '70%', borderRadius: '8px', marginBottom: '12px', background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.1s' }} />
        {/* Desc line 1 */}
        <div style={{ height: '14px', width: '100%', borderRadius: '6px', marginBottom: '8px', background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.2s' }} />
        {/* Desc line 2 */}
        <div style={{ height: '14px', width: '80%', borderRadius: '6px', marginBottom: '16px', background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.3s' }} />
        {/* Button */}
        <div style={{ height: '36px', width: '110px', borderRadius: '8px', background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite 0.4s' }} />
      </div>
    </div>
  );
}

export default SkeletonCard;
