// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Destinations from '../components/Destinations';
import About from '../components/About';
import Contact from '../components/Contact';

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Destinations />
      <Services />
      <About />
      <Contact />
    </motion.main>
  );
}

export default Home;
