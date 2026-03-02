import React, { useState, useEffect } from 'react';

function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer>
        <div className="footer-content">
          <div className="footer-logo">Traveling<span>Tent</span></div>
          <p>Crafting unforgettable outdoor experiences since 2019.</p>
          <div className="socials">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Traveling Tent. All Rights Reserved.</p>
        </div>
      </footer>

      <button 
        id="scrollToTopBtn" 
        className={showScroll ? 'visible' : ''} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}

export default Footer;
