import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartDrawer() {
  const { 
    isCartOpen, closeCart, cartItems, 
    updateQuantity, removeFromCart, clearCart, cartTotal 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    clearCart();
    navigate('/checkout-success'); // Simulated checkout
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)',
              zIndex: 9999
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer glass-card"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '400px', zIndex: 10000,
              display: 'flex', flexDirection: 'column',
              padding: '1.5rem', borderRadius: '15px 0 0 15px',
              borderRight: 'none', borderTop: 'none', borderBottom: 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Gear Cart</h2>
              <button onClick={closeCart} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.5rem', cursor: 'pointer' }}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
                  <i className="fas fa-shopping-cart" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
                  <p>Your cart is empty.</p>
                  <button onClick={closeCart} className="btn btn-outline" style={{ marginTop: '1rem' }}>Browse Rentals</button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={`${item.name}-${index}`} 
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'rgba(255,255,255,0.05)', padding: '1rem', 
                      borderRadius: '8px', marginBottom: '1rem',
                      border: '1px solid var(--card-border)'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h4>
                      <p style={{ color: 'var(--primary)', fontWeight: 'bold', margin: 0 }}>
                        ₹{item.price.toLocaleString('en-IN')}/day
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <button onClick={() => removeFromCart(item.name)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <i className="fas fa-trash"></i>
                      </button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '15px' }}>
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)} style={{ color: 'var(--text-main)', background: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)} style={{ color: 'var(--text-main)', background: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total Amount:</span>
                  <span className="gradient-text">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }} onClick={handleCheckout}>
                  Checkout Securely <i className="fas fa-lock" style={{ marginLeft: '8px' }}></i>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
