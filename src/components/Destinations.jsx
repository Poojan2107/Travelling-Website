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
    lng: 77.1887,
    activities: ["Avalanche Safety Training","Rock Climbing Intro","Alpine Photography Walk"],
    itinerary: ["Day 1: Basecamp Acclimatization","Day 2: Peak Ascent & Ridge Walk","Day 3: Valley Descent & Hot Springs"]
  },
  { 
    id: 2,
    img: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&auto=format&fit=crop&q=80', 
    title: 'Pangong Lake Camping', 
    desc: 'Wake up to serene waters and tranquil mornings by the spectacular high-altitude lake.',
    category: 'lake',
    price: 5500,
    lat: 33.7595,
    lng: 78.6674,
    activities: ["Kayaking & Paddleboarding","Sunset Fishing Session","Lakeside Yoga"],
    itinerary: ["Day 1: Lakeside Setup & Kayak","Day 2: Island Exploration & Picnic","Day 3: Sunrise Photography"]
  },
  { 
    id: 3,
    img: 'https://plus.unsplash.com/premium_photo-1676140621026-5c10ec3a875f?w=800&auto=format&fit=crop&q=80', 
    title: 'Gokarna Beach Camp', 
    desc: 'Fall asleep to the sound of ocean waves and soft sandy shores of the Arabian Sea.',
    category: 'beach',
    price: 2500,
    lat: 14.5501,
    lng: 74.3180,
    activities: ["Surfing Lessons","Coral Reef Snorkeling","Beach Volleyball & Bonfire"],
    itinerary: ["Day 1: Arrival & Coastal Walk","Day 2: Scuba/Snorkeling Session","Day 3: Local Seafood & Relaxation"]
  },
  { 
    id: 4,
    img: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=800&auto=format&fit=crop&q=80', 
    title: 'Jim Corbett Wildlife', 
    desc: 'Immerse yourself in deep woods and diverse wildlife ecosystems of the national park.',
    category: 'forest',
    price: 4000,
    lat: 29.5300,
    lng: 78.7747,
    activities: ["Guided Canopy Walk","Wildlife Tracking Safari","Botanical Foraging"],
    itinerary: ["Day 1: Deep Forest Trek","Day 2: Flora & Fauna Safari","Day 3: Waterfall Hike & Swim"]
  },
  { 
    id: 5,
    img: 'https://images.unsplash.com/photo-1601134917279-ef70a0a90f18?w=800&auto=format&fit=crop&q=80', 
    title: 'Rishikesh RV Spot', 
    desc: 'Take the comfort of home on the road with premium RV spots near the Ganges.',
    category: 'rv',
    price: 6000,
    lat: 30.0869,
    lng: 78.2676,
    activities: ["Outdoor BBQ & Grilling","Campfire Storytelling","Local Area Cycling"],
    itinerary: ["Day 1: RV Hookup & Local Market","Day 2: Scenic Drive & Picnic","Day 3: Community Bonfire"]
  },
  { 
    id: 6,
    img: 'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?w=800&auto=format&fit=crop&q=80', 
    title: 'Jaisalmer Desert Safari', 
    desc: 'Stargaze under the clearest skies in vast, beautiful Thar desert landscapes.',
    category: 'desert',
    price: 3000,
    lat: 26.9157,
    lng: 70.9083,
    activities: ["Camel & Jeep Dune Bashing","Stargazing & Astronomy","Sandboarding"],
    itinerary: ["Day 1: Desert Entry & Sunset Safari","Day 2: Oasis Visit & Sandboarding","Day 3: Cultural Village Tour"]
  },
  { 
    id: 7,
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&auto=format&fit=crop&q=80', 
    title: 'Auli Snow Expedition', 
    desc: 'Brave the winter cold and enjoy world-class skiing on pristine Himalayan snow slopes.',
    category: 'mountain',
    price: 8500,
    lat: 30.5332,
    lng: 79.5663,
    activities: ["Avalanche Safety Training","Rock Climbing Intro","Alpine Photography Walk"],
    itinerary: ["Day 1: Basecamp Acclimatization","Day 2: Peak Ascent & Ridge Walk","Day 3: Valley Descent & Hot Springs"]
  },
  { 
    id: 8,
    img: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&auto=format&fit=crop&q=80', 
    title: 'Spiti Valley Motor Camp', 
    desc: 'A rugged high-altitude desert adventure designed for off-road overlanding vehicles.',
    category: 'desert',
    price: 6500,
    lat: 32.2215,
    lng: 78.0336,
    activities: ["Camel & Jeep Dune Bashing","Stargazing & Astronomy","Sandboarding"],
    itinerary: ["Day 1: Desert Entry & Sunset Safari","Day 2: Oasis Visit & Sandboarding","Day 3: Cultural Village Tour"]
  },
  { 
    id: 9,
    img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&auto=format&fit=crop&q=80', 
    title: 'Andaman Scuba Retreat', 
    desc: 'Explore vibrant coral reefs and camp on secluded white-sand island beaches.',
    category: 'beach',
    price: 12000,
    lat: 11.7587,
    lng: 92.6560,
    activities: ["Surfing Lessons","Coral Reef Snorkeling","Beach Volleyball & Bonfire"],
    itinerary: ["Day 1: Arrival & Coastal Walk","Day 2: Scuba/Snorkeling Session","Day 3: Local Seafood & Relaxation"]
  },
  { 
    id: 10,
    img: 'https://images.unsplash.com/photo-1506501139174-099022df5260?w=800&auto=format&fit=crop&q=80', 
    title: 'Munnar Tea Estate', 
    desc: 'Set up camp inside lush green spice and tea plantations in the misty hills of Kerala.',
    category: 'forest',
    price: 4500,
    lat: 10.0889,
    lng: 77.0595,
    activities: ["Guided Canopy Walk","Wildlife Tracking Safari","Botanical Foraging"],
    itinerary: ["Day 1: Deep Forest Trek","Day 2: Flora & Fauna Safari","Day 3: Waterfall Hike & Swim"]
  },
  { 
    id: 11,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', 
    title: 'Gulmarg Ski Resort', 
    desc: 'Stay warm in alpine huts overlooking the pristine snow-covered valleys of Kashmir.',
    category: 'mountain',
    price: 8000,
    lat: 34.0484,
    lng: 74.3805,
    activities: ["Avalanche Safety Training","Rock Climbing Intro","Alpine Photography Walk"],
    itinerary: ["Day 1: Basecamp Acclimatization","Day 2: Peak Ascent & Ridge Walk","Day 3: Valley Descent & Hot Springs"]
  },
  { 
    id: 12,
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80', 
    title: 'Tawang Monastery Trek', 
    desc: 'Wander through spiritual trails and experience raw mountain culture in Arunachal Pradesh.',
    category: 'mountain',
    price: 4500,
    lat: 27.5861,
    lng: 91.8596,
    activities: ["Avalanche Safety Training","Rock Climbing Intro","Alpine Photography Walk"],
    itinerary: ["Day 1: Basecamp Acclimatization","Day 2: Peak Ascent & Ridge Walk","Day 3: Valley Descent & Hot Springs"]
  },
  { 
    id: 13,
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80', 
    title: 'Dal Lake Houseboats', 
    desc: 'Float peacefully in luxury wooden shikaras over the mirrored waters of Srinagar.',
    category: 'lake',
    price: 7000,
    lat: 34.1086,
    lng: 74.8672,
    activities: ["Kayaking & Paddleboarding","Sunset Fishing Session","Lakeside Yoga"],
    itinerary: ["Day 1: Lakeside Setup & Kayak","Day 2: Island Exploration & Picnic","Day 3: Sunrise Photography"]
  },
  { 
    id: 14,
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80', 
    title: 'Nainital Lakeside Camp', 
    desc: 'Enjoy a cool evening breeze sitting right at the edge of the emerald green Naini Lake.',
    category: 'lake',
    price: 3500,
    lat: 29.3803,
    lng: 79.4636,
    activities: ["Kayaking & Paddleboarding","Sunset Fishing Session","Lakeside Yoga"],
    itinerary: ["Day 1: Lakeside Setup & Kayak","Day 2: Island Exploration & Picnic","Day 3: Sunrise Photography"]
  },
  { 
    id: 15,
    img: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=800&auto=format&fit=crop&q=80', 
    title: 'Tsomgo Lake Sikkim', 
    desc: 'Witness a majestic glowing glacial lake surrounded by steep, rugged Himalayan cliffs.',
    category: 'lake',
    price: 6000,
    lat: 27.3742,
    lng: 88.7618,
    activities: ["Kayaking & Paddleboarding","Sunset Fishing Session","Lakeside Yoga"],
    itinerary: ["Day 1: Lakeside Setup & Kayak","Day 2: Island Exploration & Picnic","Day 3: Sunrise Photography"]
  },
  { 
    id: 16,
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 
    title: 'Varkala Cliffs Beach', 
    desc: 'Camp safely high above the Arabian sea on gorgeous red laterite cliff-sides in Kerala.',
    category: 'beach',
    price: 3500,
    lat: 8.7378,
    lng: 76.7163,
    activities: ["Surfing Lessons","Coral Reef Snorkeling","Beach Volleyball & Bonfire"],
    itinerary: ["Day 1: Arrival & Coastal Walk","Day 2: Scuba/Snorkeling Session","Day 3: Local Seafood & Relaxation"]
  },
  { 
    id: 17,
    img: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800&auto=format&fit=crop&q=80', 
    title: 'Palolem Beach Goa', 
    desc: 'Kick back in colorful beach huts under gently swaying palms away from the city noise.',
    category: 'beach',
    price: 4000,
    lat: 15.0100,
    lng: 74.0233,
    activities: ["Surfing Lessons","Coral Reef Snorkeling","Beach Volleyball & Bonfire"],
    itinerary: ["Day 1: Arrival & Coastal Walk","Day 2: Scuba/Snorkeling Session","Day 3: Local Seafood & Relaxation"]
  },
  { 
    id: 18,
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 
    title: 'Kaziranga Safari Park', 
    desc: 'Wake up to the roars of the wild and spot the majestic one-horned rhinoceros in Assam.',
    category: 'forest',
    price: 5500,
    lat: 26.5775,
    lng: 93.1711,
    activities: ["Guided Canopy Walk","Wildlife Tracking Safari","Botanical Foraging"],
    itinerary: ["Day 1: Deep Forest Trek","Day 2: Flora & Fauna Safari","Day 3: Waterfall Hike & Swim"]
  },
  { 
    id: 19,
    img: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&auto=format&fit=crop&q=80', 
    title: 'Wayanad Treehouse', 
    desc: 'Sleep high in the canopy among singing birds in eco-friendly luxury treehouses.',
    category: 'forest',
    price: 6500,
    lat: 11.6854,
    lng: 76.1320,
    activities: ["Guided Canopy Walk","Wildlife Tracking Safari","Botanical Foraging"],
    itinerary: ["Day 1: Deep Forest Trek","Day 2: Flora & Fauna Safari","Day 3: Waterfall Hike & Swim"]
  },
  { 
    id: 20,
    img: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&auto=format&fit=crop&q=80', 
    title: 'Rann of Kutch Salt Flats', 
    desc: 'Camp under massive starlit skies on seemingly endless horizons of pure white salt.',
    category: 'desert',
    price: 5000,
    lat: 23.8315,
    lng: 69.8322,
    activities: ["Camel & Jeep Dune Bashing","Stargazing & Astronomy","Sandboarding"],
    itinerary: ["Day 1: Desert Entry & Sunset Safari","Day 2: Oasis Visit & Sandboarding","Day 3: Cultural Village Tour"]
  },
  { 
    id: 21,
    img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop&q=80', 
    title: 'Nubra Valley Dunes', 
    desc: 'Explore cold-desert sand dunes riding Bactrian camels amidst high snow-capped peaks.',
    category: 'desert',
    price: 4500,
    lat: 34.6865,
    lng: 77.5583,
    activities: ["Camel & Jeep Dune Bashing","Stargazing & Astronomy","Sandboarding"],
    itinerary: ["Day 1: Desert Entry & Sunset Safari","Day 2: Oasis Visit & Sandboarding","Day 3: Cultural Village Tour"]
  },
  { 
    id: 22,
    img: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&auto=format&fit=crop&q=80', 
    title: 'Hampi Ruins Park RV', 
    desc: 'Park your RV right beside the visually stunning giant boulder formations of Karnataka.',
    category: 'rv',
    price: 2500,
    lat: 15.3350,
    lng: 76.4600,
    activities: ["Outdoor BBQ & Grilling","Campfire Storytelling","Local Area Cycling"],
    itinerary: ["Day 1: RV Hookup & Local Market","Day 2: Scenic Drive & Picnic","Day 3: Community Bonfire"]
  },
  { 
    id: 23,
    img: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=800&auto=format&fit=crop&q=80', 
    title: 'Mahabaleshwar Farm Spot', 
    desc: 'Unplug and relax in highly equipped RV setups nestled right in fresh strawberry fields.',
    category: 'rv',
    price: 4000,
    lat: 17.9307,
    lng: 73.6477,
    activities: ["Outdoor BBQ & Grilling","Campfire Storytelling","Local Area Cycling"],
    itinerary: ["Day 1: RV Hookup & Local Market","Day 2: Scenic Drive & Picnic","Day 3: Community Bonfire"]
  },
  { 
    id: 24,
    img: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop&q=80', 
    title: 'Coorg Coffee Estate Trailer', 
    desc: 'Enjoy an exclusive luxury trailer experience breathing in the rich misty coffee aromas.',
    category: 'rv',
    price: 5500,
    lat: 12.3375,
    lng: 75.8069,
    activities: ["Outdoor BBQ & Grilling","Campfire Storytelling","Local Area Cycling"],
    itinerary: ["Day 1: RV Hookup & Local Market","Day 2: Scenic Drive & Picnic","Day 3: Community Bonfire"]
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
  const [sortOption, setSortOption] = useState('recommended');

  const filteredDestinations = useMemo(() => {
    let result = destinationsData.filter((dest) => {
      const matchesCategory = activeCategory === 'all' || dest.category === activeCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = dest.title.toLowerCase().includes(lowerQuery) || 
                            dest.desc.toLowerCase().includes(lowerQuery) ||
                            dest.category.toLowerCase().includes(lowerQuery);
      return matchesCategory && matchesSearch;
    });

    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortOption]);

  return (
    <section className="portfolio section-padding" id="portfolio">
      <div className="section-header">
        <span className="subtitle">Explore</span>
        <h2>Popular Destinations</h2>
      </div>

      <div className="filter-container">
        <div className="search-bar glass-card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', flex: '1', alignItems: 'center', minWidth: '200px' }}>
            <i className="fas fa-search" style={{ marginRight: '10px' }}></i>
            <input 
              type="text" 
              placeholder="Search destinations (e.g., Manali, Beach)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: '1', background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '5px 15px', borderRadius: '20px' }}>
            <label style={{ marginRight: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sort by:</label>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="recommended" style={{background: '#0f172a', color: '#fff'}}>Recommended</option>
              <option value="price-low" style={{background: '#0f172a', color: '#fff'}}>Price: Low to High</option>
              <option value="price-high" style={{background: '#0f172a', color: '#fff'}}>Price: High to Low</option>
            </select>
          </div>
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
