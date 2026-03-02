import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export const destinationsData = [
  { 
    id: 1,
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80', 
    title: 'Manali Hiking Expedition', 
    desc: 'Experience the thrill of scaling majestic peaks and breathtaking Himalayan vistas.',
    category: 'mountain',
    price: 3500,
    lat: 32.2396,
    lng: 77.1887
  },
  { 
    id: 2,
    img: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&auto=format&fit=crop&q=80', 
    title: 'Pangong Lake Camping', 
    desc: 'Wake up to serene waters and tranquil mornings by the spectacular high-altitude lake.',
    category: 'lake',
    price: 5500,
    lat: 33.7595,
    lng: 78.6674
  },
  { 
    id: 3,
    img: 'https://plus.unsplash.com/premium_photo-1676140621026-5c10ec3a875f?w=800&auto=format&fit=crop&q=80', 
    title: 'Gokarna Beach Camp', 
    desc: 'Fall asleep to the sound of ocean waves and soft sandy shores of the Arabian Sea.',
    category: 'beach',
    price: 2500,
    lat: 14.5501,
    lng: 74.3180
  },
  { 
    id: 4,
    img: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=800&auto=format&fit=crop&q=80', 
    title: 'Jim Corbett Wildlife', 
    desc: 'Immerse yourself in deep woods and diverse wildlife ecosystems of the national park.',
    category: 'forest',
    price: 4000,
    lat: 29.5300,
    lng: 78.7747
  },
  { 
    id: 5,
    img: 'https://images.unsplash.com/photo-1601134917279-ef70a0a90f18?w=800&auto=format&fit=crop&q=80', 
    title: 'Rishikesh RV Spot', 
    desc: 'Take the comfort of home on the road with premium RV spots near the Ganges.',
    category: 'rv',
    price: 6000,
    lat: 30.0869,
    lng: 78.2676
  },
  { 
    id: 6,
    img: 'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?w=800&auto=format&fit=crop&q=80', 
    title: 'Jaisalmer Desert Safari', 
    desc: 'Stargaze under the clearest skies in vast, beautiful Thar desert landscapes.',
    category: 'desert',
    price: 3000,
    lat: 26.9157,
    lng: 70.9083
  }
];

const categories = [
  { id: 'all', label: 'All Destinations' },
  { id: 'mountain', label: 'Mountains' },
  { id: 'lake', label: 'Lakes' },
  { id: 'beach', label: 'Beaches' },
  { id: 'forest', label: 'Forests' },
  { id: 'desert', label: 'Deserts' },
  { id: 'rv', label: 'RV Spots' }
];

function Destinations() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((dest) => {
      const matchesCategory = activeCategory === 'all' || dest.category === activeCategory;
      const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dest.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="portfolio section-padding" id="portfolio">
      <div className="section-header">
        <span className="subtitle">Explore</span>
        <h2>Popular Destinations</h2>
      </div>

      <div className="filter-container">
        <div className="search-bar glass-card">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search destinations (e.g., Manali, Beach)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredDestinations.length === 0 ? (
        <div className="no-results glass-card">
          <i className="fas fa-map-signs"></i>
          <h3>No destinations found</h3>
          <p>Try adjusting your search or category filter.</p>
          <button className="btn btn-outline mt-3" onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="portfolio-grid">
          {filteredDestinations.map((dest) => (
            <div className="portfolio-card fade-up" key={dest.id}>
              <div className="img-wrapper">
                <img src={dest.img} alt={dest.title} loading="lazy" />
                <div className="price-tag">₹{dest.price.toLocaleString('en-IN')}/night</div>
              </div>
              <div className="portfolio-info">
                <div className="info-header">
                  <h3>{dest.title}</h3>
                  <span className="rating"><i className="fas fa-star"></i> 4.9</span>
                </div>
                <p>{dest.desc}</p>
                <Link to={`/destination/${dest.id}`} className="explore-btn" style={{ textDecoration: 'none' }}>
                  Book Now <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Destinations;
