import React from 'react';
import { Link } from 'react-router-dom';

export const servicesData = [
  { id: 'tents', icon: 'fa-campground', title: 'Luxury Tents', desc: 'Spacious, weather-resistant tents designed for ultimate comfort in the wilderness.' },
  { id: 'sleeping-bags', icon: 'fa-bed', title: 'Sleeping Bags', desc: 'Thermal insulated sleeping bags ensuring a cozy night\'s sleep under the stars.' },
  { id: 'stoves', icon: 'fa-fire', title: 'Camp Stoves', desc: 'Portable, high-efficiency stoves for cooking delicious meals anywhere.' },
  { id: 'backpacks', icon: 'fa-suitcase-rolling', title: 'Backpacks', desc: 'Ergonomic, high-capacity backpacks to carry all your essential life resources.' },
  { id: 'chairs', icon: 'fa-chair', title: 'Camp Chairs', desc: 'Lightweight and durable seating for relaxing around the campfire.' },
  { id: 'lights', icon: 'fa-lightbulb', title: 'Camp Lights', desc: 'Powerful LED lanterns to brighten up your campsite safely.' }
];

function Services() {
  return (
    <section className="services section-padding" id="services">
      <div className="section-header">
        <span className="subtitle">What We Offer</span>
        <h2>Premium Camping Gear</h2>
      </div>
      <div className="cards-grid">
        {servicesData.map((service, index) => (
          <Link to={`/service/${service.id}`} key={service.id} style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
            <div className="glass-card service-card">
              <div className="card-icon"><i className={`fas ${service.icon}`}></i></div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Services;
