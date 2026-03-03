import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { destinationsData } from '../components/Destinations';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import L from 'leaflet';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const gearAddons = [
  { id: 'luxuryTent', name: 'Luxury Basecamp Tent', pricePerNight: 1500, icon: 'fa-campground' },
  { id: 'sleepingBag', name: 'Thermal Sleeping Bag', pricePerNight: 500, icon: 'fa-sleeping-bag' },
  { id: 'stove', name: 'Portable Camp Stove', pricePerNight: 800, icon: 'fa-fire-burner' },
];

const StarPicker = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {[1,2,3,4,5].map(s => (
      <i key={s}
        className={s <= value ? 'fas fa-star' : 'far fa-star'}
        onClick={() => onChange(s)}
        style={{ cursor: 'pointer', color: s <= value ? '#fbbf24' : 'var(--text-muted)', fontSize: '1.3rem' }}
      />
    ))}
  </div>
);

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const destination = destinationsData.find(d => d.id === parseInt(id));

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setNights(diffDays);
        const basePrice = diffDays * (destination?.price || 0);
        const addonPrice = selectedAddons.reduce((acc, addonId) => {
          const item = gearAddons.find(g => g.id === addonId);
          return acc + (item.pricePerNight * diffDays);
        }, 0);
        setTotalPrice(basePrice + addonPrice);
      } else { setNights(0); setTotalPrice(0); }
    } else { setNights(0); setTotalPrice(0); }
  }, [checkIn, checkOut, destination, selectedAddons]);

  // Fetch reviews from Firestore
  useEffect(() => {
    if (!destination) return;
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, `reviews_${destination.id}`), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch { setReviews([]); }
      finally { setReviewsLoading(false); }
    };
    fetchReviews();
  }, [destination]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please sign in to leave a review.', { position: 'top-center' }); return; }
    if (!reviewText.trim()) { toast.error('Please write something in your review.', { position: 'top-center' }); return; }
    setSubmittingReview(true);
    try {
      const docRef = await addDoc(collection(db, `reviews_${destination.id}`), {
        userName: user.name,
        userAvatar: user.avatar,
        rating: reviewRating,
        text: reviewText.trim(),
        createdAt: serverTimestamp(),
      });
      setReviews(prev => [{ id: docRef.id, userName: user.name, userAvatar: user.avatar, rating: reviewRating, text: reviewText.trim(), createdAt: { seconds: Date.now() / 1000 } }, ...prev]);
      setReviewText('');
      setReviewRating(5);
      toast.success('Review submitted! Thank you 🙏', { position: 'bottom-right' });
    } catch { toast.error('Failed to submit review. Please try again.', { position: 'top-center' }); }
    finally { setSubmittingReview(false); }
  };

  if (!destination) {
    return (
      <div className="section-padding text-center" style={{ marginTop: '100px' }}>
        <h2>Destination Not Found</h2>
        <Link to="/" className="btn btn-primary mt-3">Back Home</Link>
      </div>
    );
  }

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || nights <= 0) {
      toast.error('Please select valid check-in and check-out dates.', { position: 'top-center' });
      return;
    }
    const cleaningFee = 1000;
    const finalAmount = totalPrice + cleaningFee;
    toast.info('Processing your booking...', { position: 'top-center', autoClose: 1000 });
    setTimeout(() => {
      const newBooking = {
        id: 'BK_' + Math.floor(Math.random() * 100000000),
        destinationId: destination.id,
        destinationTitle: destination.title,
        destinationImg: destination.img,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        totalPrice: finalAmount,
        bookingDate: new Date().toISOString(),
      };
      const existingBookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
      localStorage.setItem('travelBookings', JSON.stringify([...existingBookings, newBooking]));
      toast.success('Booking confirmed!', { position: 'bottom-right', autoClose: 2000 });
      navigate('/checkout-success', { state: { booking: newBooking } });
    }, 1000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out ${destination.title} on TravelingTent! Starting at ₹${destination.price.toLocaleString('en-IN')}/night.`;
    if (navigator.share) {
      try { await navigator.share({ title: destination.title, text, url }); }
      catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!', { position: 'bottom-right' });
    }
  };

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '4.9';

  return (
    <motion.section
      className="details-page section-padding"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" className="back-link"><i className="fas fa-arrow-left" /> Back to Destinations</Link>
        {/* Share button */}
        <button onClick={handleShare} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '8px 18px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(14,165,233,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
        >
          <i className="fas fa-share-alt" style={{ color: 'var(--primary)' }} /> Share
        </button>
      </div>

      <div className="details-header mt-3">
        <h1>{destination.title}</h1>
        <div className="details-meta">
          <span><i className="fas fa-star" style={{ color: '#fbbf24' }} /> {avgRating} ({reviews.length} reviews)</span>
          <span><i className="fas fa-map-marker-alt" /> {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)} Experience</span>
        </div>
      </div>

      <div className="details-grid mt-4">
        <div className="details-main">
          <div className="details-image-wrapper">
            <img src={destination.img} alt={destination.title} />
          </div>

          <div className="details-description glass-card mt-4">
            <h3>About this experience</h3>
            <p>{destination.desc}</p>
            <p className="mt-2">Prepare for a trip you will never forget. Connect with nature and enjoy world-class amenities right in the wild. All of our curated locations guarantee safety, pristine views, and easy access to premium trails.</p>

            {destination.activities?.length > 0 && (
              <>
                <h4 className="mt-4" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                  <i className="fas fa-compass" style={{ color: 'var(--primary)', marginRight: '10px' }} />Top Experiences
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  {destination.activities.map((act, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--primary)', marginRight: '10px' }} />
                      <span style={{ fontSize: '0.95rem' }}>{act}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {destination.itinerary?.length > 0 && (
              <>
                <h4 className="mt-4" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                  <i className="far fa-calendar-alt" style={{ color: 'var(--primary)', marginRight: '10px' }} />Recommended Itinerary
                </h4>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {destination.itinerary.map((day, i) => {
                    const [dayLabel, ...descParts] = day.split(':');
                    return (
                      <div key={i} className="fade-up" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                        <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>{dayLabel}</strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{descParts.join(':').trim()}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <h4 className="mt-4" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Map Location</h4>
            <div style={{ height: '300px', width: '100%', marginTop: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
              <MapContainer center={[destination.lat, destination.lng]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[destination.lat, destination.lng]}><Popup>{destination.title}</Popup></Marker>
              </MapContainer>
            </div>

            <h4 className="mt-4" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Premium Gear Add-ons</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Select gear to rent for the duration of your trip. Cost reflects price per night.</p>

            {nights > 0 && guests > 0 && (
              <div className="fade-up" style={{ background: 'rgba(14, 165, 233, 0.1)', borderLeft: '4px solid var(--primary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}><i className="fas fa-magic" style={{ color: 'var(--primary)', marginRight: '8px' }} />AI Travel Recommendation</strong>
                For a <strong>{nights} night</strong> stay with <strong>{guests} guest(s)</strong>, we suggest adding <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{Math.ceil(guests / 2)} Luxury Tent(s)</span> and <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{guests} Thermal Sleeping Bag(s)</span> for optimal comfort.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {gearAddons.map(addon => (
                <label key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: selectedAddons.includes(addon.id) ? 'rgba(14,165,233,0.1)' : 'rgba(0,0,0,0.2)', border: `1px solid ${selectedAddons.includes(addon.id) ? 'var(--primary)' : 'var(--card-border)'}`, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input type="checkbox" checked={selectedAddons.includes(addon.id)} onChange={() => handleAddonToggle(addon.id)} style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                    <div>
                      <h5 style={{ margin: 0 }}><i className={`fas ${addon.icon}`} style={{ color: 'var(--accent)', marginRight: '5px' }} />{addon.name}</h5>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Added per night of your stay</span>
                    </div>
                  </div>
                  <strong>+₹{addon.pricePerNight.toLocaleString('en-IN')}</strong>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="details-sidebar">
          <div className="booking-card glass-card">
            <h3><span className="price">₹{destination.price.toLocaleString('en-IN')}</span> / night</h3>
            <form onSubmit={handleBooking} className="mt-4">
              <div className="date-picker-group" style={{ display: 'flex', flexDirection: window.innerWidth < 600 ? 'column' : 'row', gap: '10px' }}>
                <div className="input-group mb-0" style={{ flex: 1 }}>
                  <label style={{ position: 'static', fontSize: '0.85rem' }}>Check-in</label>
                  <DatePicker selected={checkIn} onChange={setCheckIn} selectsStart startDate={checkIn} endDate={checkOut} minDate={new Date()} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YYYY" className="form-control" wrapperClassName="date-picker-wrapper" required />
                </div>
                <div className="input-group mb-0" style={{ flex: 1 }}>
                  <label style={{ position: 'static', fontSize: '0.85rem' }}>Check-out</label>
                  <DatePicker selected={checkOut} onChange={setCheckOut} selectsEnd startDate={checkIn} endDate={checkOut} minDate={checkIn || new Date()} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YYYY" className="form-control" wrapperClassName="date-picker-wrapper" required />
                </div>
              </div>

              <div className="input-group mt-3">
                <label style={{ position: 'static', fontSize: '0.85rem' }}>Guests</label>
                <select value={guests} onChange={e => setGuests(parseInt(e.target.value))} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.8rem', color: 'var(--text-main)', marginTop: '5px' }}>
                  {[1,2,3,4,5].map(n => <option key={n} value={n} style={{ background: '#0f172a', color: '#fff' }}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              {totalPrice > 0 && nights > 0 && (
                <div className="price-breakdown mt-4">
                  <div className="flex-between"><span>Base ₹{destination.price.toLocaleString('en-IN')} x {nights} nights</span><span>₹{(destination.price * nights).toLocaleString('en-IN')}</span></div>
                  {selectedAddons.length > 0 && <div className="flex-between mt-2 text-muted" style={{ fontSize: '0.9rem' }}><span>Gear Add-ons ({nights} nights)</span><span>₹{(totalPrice - destination.price * nights).toLocaleString('en-IN')}</span></div>}
                  <div className="flex-between mt-2"><span>Cleaning Fee</span><span>₹1,000</span></div>
                  <hr style={{ borderColor: 'var(--card-border)', margin: '15px 0' }} />
                  <div className="flex-between fw-bold"><span>Total (INR)</span><span className="text-primary">₹{(totalPrice + 1000).toLocaleString('en-IN')}</span></div>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block mt-4">
                <i className="fas fa-calendar-check" style={{ marginRight: '8px' }} />Proceed to Checkout
              </button>
              <p className="text-center text-muted mt-3" style={{ fontSize: '0.85rem' }}>
                <i className="fas fa-shield-alt" style={{ color: 'var(--primary)', marginRight: '5px' }} />Secure &amp; instant confirmation
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ── Reviews Section ── */}
      <div style={{ marginTop: '4rem', borderTop: '1px solid var(--card-border)', paddingTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.8rem' }}>
            <i className="fas fa-star" style={{ color: '#fbbf24', marginRight: '10px' }} />
            Reviews &amp; Ratings
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '12px' }}>({reviews.length} reviews · avg {avgRating}★)</span>
          </h3>
        </div>

        {/* Write a Review */}
        {user ? (
          <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Write a Review</h4>
            <form onSubmit={handleSubmitReview}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your Rating</label>
                <StarPicker value={reviewRating} onChange={setReviewRating} />
              </div>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your experience at this destination..."
                rows={3}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.8rem', color: 'var(--text-main)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.95rem', boxSizing: 'border-box' }}
              />
              <button type="submit" disabled={submittingReview} className="btn btn-primary mt-3" style={{ opacity: submittingReview ? 0.7 : 1 }}>
                {submittingReview ? <><i className="fas fa-spinner fa-spin" /> Submitting...</> : <><i className="fas fa-paper-plane" style={{ marginRight: '8px' }} />Submit Review</>}
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-card text-center" style={{ padding: '2rem', marginBottom: '2rem', background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.2)' }}>
            <i className="fas fa-user-lock" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.8rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>Sign in to leave a review for this destination.</p>
          </div>
        )}

        {/* All Reviews */}
        {reviewsLoading ? (
          <div className="text-center" style={{ padding: '2rem', color: 'var(--text-muted)' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem' }} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '2.5rem' }}>
            <i className="far fa-comment-alt" style={{ fontSize: '3rem', color: 'var(--text-muted)', opacity: 0.4, marginBottom: '1rem' }} />
            <h4>No reviews yet</h4>
            <p style={{ color: 'var(--text-muted)' }}>Be the first to share your experience!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {reviews.map(review => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={review.userAvatar} alt={review.userName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} />
                      <span style={{ fontWeight: '600' }}>{review.userName}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[1,2,3,4,5].map(s => <i key={s} className={s <= review.rating ? 'fas fa-star' : 'far fa-star'} style={{ color: '#fbbf24', fontSize: '0.85rem' }} />)}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{review.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Related Destinations */}
      <div style={{ marginTop: '5rem', borderTop: '1px solid var(--card-border)', paddingTop: '3rem' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>More {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)} Adventures</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {destinationsData
            .filter(d => d.category === destination.category && d.id !== destination.id)
            .slice(0, 3)
            .map(related => (
              <Link to={`/destination/${related.id}`} key={related.id} className="glass-card fade-up" style={{ color: 'inherit', textDecoration: 'none', transition: 'transform 0.3s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ position: 'relative', height: '200px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={related.img} alt={related.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <i className="fas fa-star" style={{ color: '#fbbf24' }} /> 4.9
                  </span>
                </div>
                <div style={{ padding: '1.2rem 1rem 0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{related.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{related.category.charAt(0).toUpperCase() + related.category.slice(1)}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{related.price.toLocaleString('en-IN')}<span style={{ fontSize: '0.8em', color: 'var(--text-muted)', fontWeight: 'normal' }}>/night</span></span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </motion.section>
  );
}

export default DestinationDetails;
