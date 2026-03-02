import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DestinationDetails from './pages/DestinationDetails';
import Success from './pages/Success';
import MyBookings from './pages/MyBookings';
import LoginModal from './components/LoginModal';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/checkout-success" element={<Success />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="blob-bg"></div>
        <Navbar />
        <LoginModal />
        <AnimatedRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
