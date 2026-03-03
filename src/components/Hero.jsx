import React from 'react';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="fade-up">Find Your Next <br/><span className="gradient-text">Wild Adventure</span></h1>
        <p className="fade-up delay-1">
          Escape the ordinary. Brace yourselves for unforgettable traveling experiences and camping memories that will last a lifetime.
        </p>
        <div className="hero-btns fade-up delay-2">
          <a href="#portfolio" className="btn btn-primary" style={{ transition: 'all 0.3s ease-in-out', transform: 'scale(1)' }}>Explore Destinations <i className="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
