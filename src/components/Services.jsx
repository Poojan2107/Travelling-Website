import React from 'react';

const services = [
  { icon: 'fa-campground', title: 'Luxury Tents', desc: 'Spacious, weather-resistant tents designed for ultimate comfort in the wilderness.' },
  { icon: 'fa-sleeping-bag', title: 'Sleeping Bags', desc: 'Thermal insulated sleeping bags ensuring a cozy night\'s sleep under the stars.' },
  { icon: 'fa-fire-burner', title: 'Camp Stoves', desc: 'Portable, high-efficiency stoves for cooking delicious meals anywhere.' },
  { icon: 'fa-backpack', title: 'Backpacks', desc: 'Ergonomic, high-capacity backpacks to carry all your essential life resources.' },
  { icon: 'fa-chair', title: 'Camp Chairs', desc: 'Lightweight and durable seating for relaxing around the campfire.' },
  { icon: 'fa-lightbulb', title: 'Camp Lights', desc: 'Powerful LED lanterns to brighten up your campsite safely.' }
];

function Services() {
  return (
    <section className="services section-padding" id="services">
      <div className="section-header">
        <span className="subtitle">What We Offer</span>
        <h2>Premium Camping Gear</h2>
      </div>
      <div className="cards-grid">
        {services.map((service, index) => (
          <div className="glass-card service-card" key={index}>
            <div className="card-icon"><i className={`fas ${service.icon}`}></i></div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
