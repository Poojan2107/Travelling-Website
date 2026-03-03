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
  },

  // ── 2 extra Mountain ──
  { 
    id: 25,
    img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=80', 
    title: 'Kedarnath Base Trek', 
    desc: 'Follow ancient pilgrimage paths through dramatic gorges and alpine meadows toward the holy shrine.',
    category: 'mountain',
    price: 5500,
    lat: 30.7352,
    lng: 79.0669,
    activities: ["High Altitude River Crossing","Pilgrimage Trail Walk","Mountain Photography"],
    itinerary: ["Day 1: Gaurikund Arrival & Rest","Day 2: Base Camp Ascent","Day 3: Shrine Visit & Descent"]
  },
  { 
    id: 26,
    img: 'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?w=800&auto=format&fit=crop&q=80', 
    title: 'Rohtang Pass Snow Camp', 
    desc: 'Camp at 3,978m above sea level on snow-covered terrain with panoramic views of three major ranges.',
    category: 'mountain',
    price: 7000,
    lat: 32.3712,
    lng: 77.2446,
    activities: ["Snow Trekking","Skiing & Snowboarding","Ice Cave Exploration"],
    itinerary: ["Day 1: Manali Pickup & Acclimatize","Day 2: Snow Trek & Skiing","Day 3: Summit Views & Return"]
  },

  // ── 2 extra Lake ──
  { 
    id: 27,
    img: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=80', 
    title: 'Lonar Crater Lake', 
    desc: 'Camp beside India\'s only meteor impact crater lake with its otherworldly jade-green waters.',
    category: 'lake',
    price: 3000,
    lat: 19.9830,
    lng: 76.5081,
    activities: ["Crater Rim Trek","Bird Watching","Geology Workshops"],
    itinerary: ["Day 1: Crater Arrival & Rim Walk","Day 2: Lake Kayak & Birdwatch","Day 3: Temple Visit & Departure"]
  },
  { 
    id: 28,
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&auto=format&fit=crop&q=80', 
    title: 'Chilika Lake Delta Camp', 
    desc: 'Spot migratory flamingos and rare Irrawaddy dolphins in Asia\'s largest brackish water lagoon.',
    category: 'lake',
    price: 4500,
    lat: 19.7218,
    lng: 85.3187,
    activities: ["Dolphin Spotting Boat Ride","Flamingo Bird Trail","Sunrise Fishing"],
    itinerary: ["Day 1: Boat Arrival & Camp Setup","Day 2: Dolphin Cruise & Birdwatch","Day 3: Island Picnic & Departure"]
  },

  // ── 2 extra Beach ──
  { 
    id: 29,
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', 
    title: 'Radhanagar Beach Havelock', 
    desc: 'Camp on Asia\'s finest beach — powder white sands, transparent turquoise water and absolute silence.',
    category: 'beach',
    price: 8500,
    lat: 11.9770,
    lng: 92.9530,
    activities: ["Glass-Bottom Kayaking","Jungle Beach Trail","Night Turtle Watch"],
    itinerary: ["Day 1: Ferry Arrival & Sunset Camp","Day 2: Kayak & Snorkel Session","Day 3: Turtle Nesting Walk"]
  },
  { 
    id: 30,
    img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80', 
    title: 'Tarkarli Scuba Beach', 
    desc: 'Dive into crystal clear shallow waters and explore coral gardens off the Konkan coast.',
    category: 'beach',
    price: 4500,
    lat: 16.0185,
    lng: 73.4678,
    activities: ["PADI Scuba Diving","Glass-Bottom Boat Ride","Beachside Bonfire"],
    itinerary: ["Day 1: Arrival & Water Intro","Day 2: Scuba Certification Dive","Day 3: Snorkel & Local Cuisine"]
  },

  // ── 2 extra Forest ──
  { 
    id: 31,
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', 
    title: 'Sundarbans Mangrove Trek', 
    desc: 'Navigate through the world\'s largest mangrove forest by boat while spotting Bengal tigers.',
    category: 'forest',
    price: 7500,
    lat: 21.9497,
    lng: 89.1833,
    activities: ["Tiger Watch Boat Safari","Mangrove Canopy Walk","Fishing with Locals"],
    itinerary: ["Day 1: Kolkata to Boat Camp","Day 2: Tiger Territory Safari","Day 3: Mangrove Walk & Return"]
  },
  { 
    id: 32,
    img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&auto=format&fit=crop&q=80', 
    title: 'Bandipur Forest Lodge', 
    desc: 'Stay in eco-friendly forest lodges inside one of India\'s premier tiger and elephant reserves.',
    category: 'forest',
    price: 6000,
    lat: 11.6557,
    lng: 76.6345,
    activities: ["Jeep Safari","Elephant Interaction","Night Jungle Walk"],
    itinerary: ["Day 1: Lodge Check-in & Safari","Day 2: Elephant Camp Visit","Day 3: Bird Walk & Departure"]
  },

  // ── 2 extra Desert ──
  { 
    id: 33,
    img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop&q=80', 
    title: 'Thar Desert Luxury Camp', 
    desc: 'Spend a night in royal Rajasthani-style tents with folk dance, music and authentic cuisine.',
    category: 'desert',
    price: 6000,
    lat: 27.0238,
    lng: 70.3673,
    activities: ["Royal Camel Procession","Rajasthani Folk Night","Sand Art Workshop"],
    itinerary: ["Day 1: Jaisalmer Pickup & Welcome","Day 2: Camel Safari & Cultural Night","Day 3: Sunrise Dune Walk"]
  },
  { 
    id: 34,
    img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80', 
    title: 'Leh Ladakh Desert Route', 
    desc: 'Cross the world\'s highest motorable passes through a dramatic cold desert moonscape.',
    category: 'desert',
    price: 9500,
    lat: 34.1526,
    lng: 77.5771,
    activities: ["Motorbike Expedition","Pangong Lake Visit","Magnetic Hill Experience"],
    itinerary: ["Day 1: Leh Acclimatize","Day 2: Khardung La Pass Ride","Day 3: Pangong Sunrise Camp"]
  },

  // ── 2 extra RV Spot ──
  { 
    id: 35,
    img: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&auto=format&fit=crop&q=80', 
    title: 'Lonavala Valley RV Park', 
    desc: 'Park your home on wheels at a scenic hilltop with panoramic views of the Western Ghats.',
    category: 'rv',
    price: 3500,
    lat: 18.7546,
    lng: 73.4062,
    activities: ["Waterfall Hike","Valley Cycling Tour","Evening Bonfire"],
    itinerary: ["Day 1: Setup & Sunset Views","Day 2: Bhushi Dam Walk & Waterfall","Day 3: Ghats Drive & Depart"]
  },
  { 
    id: 36,
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80', 
    title: 'Kodaikanal RV Meadows', 
    desc: 'Park at 2,133m in lush green meadows with mild weather, pine forests and star-filled nights.',
    category: 'rv',
    price: 4200,
    lat: 10.2381,
    lng: 77.4892,
    activities: ["Horse Riding","Boat Club Visit","Pine Forest Walk"],
    itinerary: ["Day 1: Setup & Lake Walk","Day 2: Horse Ride & Pine Trek","Day 3: Dolphin Nose Viewpoint"]
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
