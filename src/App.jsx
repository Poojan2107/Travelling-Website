import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DestinationDetails from './pages/DestinationDetails';
import ServiceDetails from './pages/ServiceDetails';
import Success from './pages/Success';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';
import LoginModal from './components/LoginModal';
import CartDrawer from './components/CartDrawer';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/checkout-success" element={<Success />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="blob-bg"></div>
          <ToastContainer position="bottom-right" theme="dark" />
          <Navbar />
          <LoginModal />
          <CartDrawer />
          <AnimatedRoutes />
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
