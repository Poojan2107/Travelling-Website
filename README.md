# 🏕️ Traveling Tent - Premium Booking Engine

Traveling Tent is a modern, scalable Web Application rebuilt from a static HTML/CSS brochure into a fully functional **React E-Commerce Booking Engine**. This application demonstrates enterprise-level frontend architecture, complex state management, third-party API integrations, and premium UI/UX design.

---

## 🚀 Core Features & Functionality

### 1. 🛒 Dynamic Booking & Checkout Engine
- **Stateful Validation:** Users can pick a `Check-in` and `Check-out` date, and the application dynamically calculates the total number of nights and blocks invalid dates.
- **Real-Time Price Calculator:** Automatically updates the total cost based on the number of nights, a fixed cleaning fee, and any selected premium gear add-ons.
- **Database Simulation (LocalStorage):** Successfully booked trips are stored natively in the browser's LocalStorage, mimicking a NoSQL database structure (e.g., MongoDB). This enables a persistent user experience across sessions.
- **Booking Dashboard (`/my-bookings`):** A dedicated protected route where authenticated users can view their past booking history, complete with payment totals, dates, and destination imagery.

### 2. 💳 Payment Gateway Integration (Razorpay)
- **Simulated Transactions:** Integrated the Razorpay Sandbox API. When users click "Proceed to Checkout", the app securely launches a Razorpay payment modal locked to the dynamically generated INR (₹) price state.
- **Invoice Generation:** Upon a successful simulated card transaction, the app captures the `razorpay_payment_id` and forwards the user to a detailed `/checkout-success` invoice screen.

### 3. Localization & Formatting 🇮🇳
- **Indian Number System:** Completely localized the pricing engine. All backend calculations and frontend renders enforce the Indian Rupee `₹` symbol and use `.toLocaleString('en-IN')` to correctly format numbers (e.g., `₹3,500`).

### 4. 🗺️ Interactive Geospatial Mapping 
- **React-Leaflet Integration:** Replaced static destination text with highly interactive OpenStreetMap tiles. 
- **Coordinate Plotting:** Each destination has specific latitude (`lat`) and longitude (`lng`) coordinates. When a user navigates to a specific booking detail page (e.g., *Manali Hiking*), the map dynamically plots a custom pin squarely on that geographical location.

### 5. 🔐 Context API Authentication & Modals
- **Simulated OAuth Flow:** Implemented a robust React `AuthContext` to manage user sessions globally.
- **Protected Routing:** The application verifies if a `user` state exists before allowing access to the Dashboard. Unauthenticated attempts trigger a beautiful Framer Motion Glassmorphism Login Modal simulating a "Sign-in with Google" payload.
- **Dynamic Navbar:** The Navbar reacts to the Auth state—dispalying a Login button for guests, and replacing it with an interactive Profile Avatar Dropdown for authenticated users.

### 6. 🎒 E-Commerce Toggle Add-ons
- Built a boolean toggle array allowing users to select extra "Premium Gear" (like Thermal Sleeping Bags or Camp Stoves). These toggle states instantly trigger re-renders, recalculating the total nightly price loop in real-time.

### 7. 🪄 Fluid Animations (Framer Motion)
- **Page Transitions:** Replaced jarring instant page loads with smooth `<AnimatePresence>` routing. Traveling between "Home" and "Destination Details" causes elements to elegantly fade, slide, and scale into place.
- **Micro-Interactions:** Custom hover-states, glassmorphism border glows, and conditional rendering (like the Contact Form Success state) are all wrapped in `motion.div` attributes to create a premium, Awwwards-style feel.

### 8. Advanced Routing (React Router v6)
- **Scroll-to-Top Management:** Standard SPAs (Single Page Apps) remember scroll position when navigating. Implemented `useEffect` hooks across routes to ensure every new page gracefully starts at the top of the window.
- **Hash Links vs Route Links:** The custom Navbar intelligently knows if a user clicked `#services` while on the Homepage (triggering a smooth scroll) vs clicking `#services` from a nested Details page (triggering a Router navigation back to root *followed* by a scroll).

---

## 🛠️ Technology Stack Breakdown
- **Core:** React.js, Vite
- **Routing:** React Router DOM (v6)
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`, `useContext`)
- **Styling:** Custom Vanilla CSS, CSS Variables, Glassmorphism UI
- **Animations:** Framer Motion
- **Maps API:** React-Leaflet (OpenStreetMap)
- **Payment API:** Razorpay Checkout JS
- **Database:** Browser LocalStorage API
- **Icons & Typography:** FontAwesome 6, Google Fonts (Outfit, Inter)
