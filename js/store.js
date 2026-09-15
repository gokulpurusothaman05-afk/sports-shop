/**
 * STACKLY SPORTS - CENTRAL DATA STORE & LOCAL STORAGE HELPERS
 * Expanded 28+ Product Catalog with 100% Matching Visuals & Names
 */

const DEFAULT_PRODUCTS = [
  // --- 1. CRICKET ---
  {
    id: "sp-201",
    name: "English Willow Cricket Bat Grade 1",
    category: "Cricket Equipment",
    categoryKey: "cricket",
    sport: "Cricket",
    price: 14999,
    originalPrice: 18999,
    rating: 5.0,
    reviewsCount: 148,
    badge: "🏏 Tournament Grade",
    image: "assets/images/cricket-bat.webp",
    description: "Handcrafted Grade 1 English Willow cricket bat with 39mm thick power edges, balanced pickup, and immense sweet spot engineered for Indian pitch conditions.",
    sizes: ["Short Handle (Standard)", "Long Handle"],
    stock: 15,
    featured: true
  },
  {
    id: "sp-202",
    name: "Club Red Leather Cricket Match Ball",
    category: "Cricket Match Balls",
    categoryKey: "cricket",
    sport: "Cricket",
    price: 1299,
    originalPrice: 1899,
    rating: 4.8,
    reviewsCount: 92,
    badge: "🏏 BCCI Approved",
    image: "assets/images/cricket-ball.webp",
    description: "Four-piece alum tanned high-grade red leather cricket ball with prominent hand-stitched seam for genuine swing and bounce.",
    sizes: ["Men 156g (Standard)", "Youth 142g"],
    stock: 60,
    featured: true
  },
  {
    id: "sp-203",
    name: "Stackly Pro Match Cricket Spikes",
    category: "Cricket Footwear",
    categoryKey: "cricket",
    sport: "Cricket",
    price: 6499,
    originalPrice: 8999,
    rating: 4.9,
    reviewsCount: 110,
    badge: "Fast Bowler Pick",
    image: "assets/images/cricket-spikes.webp",
    description: "Lightweight cricket spikes featuring TPU propulsion chassis, steel-tip screw spikes, and reinforced toe box for fast bowling impact.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 24,
    featured: true
  },
  {
    id: "sp-204",
    name: "Pro Elite Batting Leg Guards / Pads",
    category: "Cricket Protective Gear",
    categoryKey: "cricket",
    sport: "Cricket",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 75,
    badge: "🛡️ Max Impact",
    image: "assets/images/cricket-pads.webp",
    description: "High-density molded foam batting pads with traditional cane reinforcement and breathable side wings for unhindered running between wickets.",
    sizes: ["Men Standard", "Large Men", "Youth"],
    stock: 20,
    featured: false
  },

  // --- 2. BADMINTON ---
  {
    id: "sp-205",
    name: "Nanocore 900 Carbon Badminton Racquet",
    category: "Badminton Racquets",
    categoryKey: "badminton",
    sport: "Badminton",
    price: 5499,
    originalPrice: 7499,
    rating: 4.9,
    reviewsCount: 164,
    badge: "🏸 Tournament Pro",
    image: "assets/images/badminton-racquet.webp",
    description: "High-modulus carbon graphite racquet supporting string tensions up to 32 lbs with aerodynamic slim frame for explosive smashes.",
    sizes: ["4U (83g) - G5", "3U (88g) - G4"],
    stock: 35,
    featured: true
  },
  {
    id: "sp-206",
    name: "Aerospeed Pro Feather Shuttlecock (12 Pack)",
    category: "Badminton Shuttlecocks",
    categoryKey: "badminton",
    sport: "Badminton",
    price: 1499,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 220,
    badge: "🔥 Top Seller",
    image: "assets/images/shuttlecock.webp",
    description: "Grade A goose feather shuttlecocks with natural cork base delivering precise flight trajectory and durable skirt longevity.",
    sizes: ["Speed 77 (Medium)", "Speed 78 (Fast)"],
    stock: 80,
    featured: true
  },
  {
    id: "sp-207",
    name: "AeroCourt Non-Marking Badminton Shoes",
    category: "Badminton Court Shoes",
    categoryKey: "badminton",
    sport: "Badminton",
    price: 4999,
    originalPrice: 6499,
    rating: 4.8,
    reviewsCount: 88,
    badge: "★ Court Grip",
    image: "assets/images/badminton-shoes.webp",
    description: "Gum rubber non-marking outsole with anti-torsion carbon shank designed for quick lateral lunges and zero slip on wooden / synthetic courts.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 28,
    featured: true
  },

  // --- 3. RUNNING & TRACK ---
  {
    id: "sp-208",
    name: "Stackly Velocity Volt Running Shoes",
    category: "Road Running Footwear",
    categoryKey: "running",
    sport: "Running",
    price: 7999,
    originalPrice: 10499,
    rating: 4.9,
    reviewsCount: 290,
    badge: "★ Highly Rated",
    image: "assets/images/running-shoes-volt.webp",
    description: "Engineered with nitrogen-infused foam and responsive carbon assist plate for sub-4 marathon pacing and daily asphalt training.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 40,
    featured: true
  },
  {
    id: "sp-209",
    name: "All-Terrain Trail Running Shoes",
    category: "Trail & Outdoor Running",
    categoryKey: "running",
    sport: "Running",
    price: 8499,
    originalPrice: 11999,
    rating: 4.8,
    reviewsCount: 142,
    badge: "🌲 Mud & Rock",
    image: "assets/images/running-trail-shoes.webp",
    description: "Aggressive 5mm multi-directional lugs with water-shedding ripstop mesh for rugged Indian trails, hills, and gravel tracks.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 22,
    featured: true
  },
  {
    id: "sp-210",
    name: "Ultra-Light Marathon Hydration Vest",
    category: "Running Apparel & Gear",
    categoryKey: "running",
    sport: "Running",
    price: 2899,
    originalPrice: 3999,
    rating: 4.7,
    reviewsCount: 65,
    badge: "🏃 Endurance",
    image: "assets/images/running-vest.webp",
    description: "Breathable 3D mesh hydration vest equipped with dual 500ml flask holsters, phone pouch, and zero-bounce sternum straps.",
    sizes: ["S/M (Chest 34-38 in)", "L/XL (Chest 39-44 in)"],
    stock: 30,
    featured: false
  },

  // --- 4. GYM & FITNESS ---
  {
    id: "sp-211",
    name: "Rubber Hex Dumbbell Pair (10kg Each)",
    category: "Gym Free Weights",
    categoryKey: "gym",
    sport: "Gym",
    price: 3999,
    originalPrice: 5499,
    rating: 4.9,
    reviewsCount: 185,
    badge: "💪 Heavy Duty",
    image: "assets/images/dumbbells-hex.webp",
    description: "Cast iron core coated in heavy-duty virgin rubber to prevent rolling, minimize noise, and protect floor surfaces from heavy drops.",
    sizes: ["Pair of 10 KG", "Pair of 15 KG", "Pair of 20 KG"],
    stock: 25,
    featured: true
  },
  {
    id: "sp-212",
    name: "Cast Iron Competition Kettlebell (16kg)",
    category: "Strength Training",
    categoryKey: "gym",
    sport: "Gym",
    price: 2999,
    originalPrice: 4299,
    rating: 4.8,
    reviewsCount: 94,
    badge: "🔥 Core Strength",
    image: "assets/images/kettlebell.webp",
    description: "Single-piece precision cast iron kettlebell with matte powder coating for superior chalk retention and non-slip swings.",
    sizes: ["12 KG", "16 KG", "20 KG", "24 KG"],
    stock: 20,
    featured: true
  },
  {
    id: "sp-213",
    name: "Heavy-Duty Resistance Loop Bands (Set of 5)",
    category: "Mobility & Conditioning",
    categoryKey: "gym",
    sport: "Gym",
    price: 999,
    originalPrice: 1599,
    rating: 4.8,
    reviewsCount: 310,
    badge: "Best Value",
    image: "assets/images/resistance-bands.webp",
    description: "100% natural latex resistance bands offering variable resistance levels from 10 lbs to 50 lbs with carry pouch.",
    sizes: ["Set of 5 Levels (Extra Light to XX-Heavy)"],
    stock: 75,
    featured: false
  },
  {
    id: "sp-214",
    name: "Stainless Steel Protein Shaker 750ml",
    category: "Gym Hydration & Shakers",
    categoryKey: "gym",
    sport: "Gym",
    price: 799,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 420,
    badge: "🥤 Odor Free",
    image: "assets/images/gym-shaker.webp",
    description: "Food-grade double-walled stainless steel shaker with wire whisk ball and leak-proof flip cap that stays odor-free for years.",
    sizes: ["750 ml Matte Black"],
    stock: 90,
    featured: false
  },
  {
    id: "sp-215",
    name: "High-Density Eco Yoga & Workout Mat",
    category: "Yoga & Floor Training",
    categoryKey: "gym",
    sport: "Gym",
    price: 1799,
    originalPrice: 2699,
    rating: 4.8,
    reviewsCount: 160,
    badge: "🧘 Non-Slip",
    image: "assets/images/yoga-mat.webp",
    description: "6mm thick dual-layer TPE material providing cushioned joint support and laser-engraved alignment lines.",
    sizes: ["Standard 72 x 24 inches (6mm)"],
    stock: 45,
    featured: false
  },
  {
    id: "sp-216",
    name: "Stackly Endurance Gym Duffle Bag 45L",
    category: "Sports Bags & Duffles",
    categoryKey: "gym",
    sport: "Gym",
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviewsCount: 180,
    badge: "🎒 Waterproof",
    image: "assets/images/gym-duffle.webp",
    description: "Waterproof ripstop duffle featuring isolated ventilated shoe compartment, shaker holder, and padded shoulder harness.",
    sizes: ["Standard 45L Capacity"],
    stock: 35,
    featured: true
  },

  // --- 5. FOOTBALL ---
  {
    id: "sp-217",
    name: "FIFA Quality Pro Match Football",
    category: "Football Match Balls",
    categoryKey: "football",
    sport: "Football",
    price: 2199,
    originalPrice: 3199,
    rating: 4.9,
    reviewsCount: 230,
    badge: "⚽ Match Grade",
    image: "assets/images/football-match.webp",
    description: "Thermally bonded 32-panel PU construction ensuring zero water absorption and true aerodynamic flight on grass & turf.",
    sizes: ["Size 5 (Official Match)", "Size 4 (Youth)"],
    stock: 50,
    featured: true
  },
  {
    id: "sp-218",
    name: "StrikeForce Firm Ground Football Cleats",
    category: "Football Boots",
    categoryKey: "football",
    sport: "Football",
    price: 5999,
    originalPrice: 7999,
    rating: 4.8,
    reviewsCount: 145,
    badge: "Blistering Pace",
    image: "assets/images/football-cleats.webp",
    description: "Conical and bladed stud hybrid configuration on lightweight TPU soleplate for lightning sprints and rapid direction shifts on turf.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 30,
    featured: true
  },
  {
    id: "sp-219",
    name: "Pro Grip Latex Goalkeeper Gloves",
    category: "Football Goal Protection",
    categoryKey: "football",
    sport: "Football",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 88,
    badge: "🧤 Pro Saver",
    image: "assets/images/goalkeeper-gloves.webp",
    description: "4mm German Contact Latex palm offering supreme ball grip in both wet and dry weather, backed with removable finger spine protection.",
    sizes: ["Size 8", "Size 9", "Size 10"],
    stock: 22,
    featured: false
  },

  // --- 6. BASKETBALL & APPAREL ---
  {
    id: "sp-220",
    name: "Official Composite Leather Basketball (Size 7)",
    category: "Basketball Equipment",
    categoryKey: "basketball",
    sport: "Basketball",
    price: 1899,
    originalPrice: 2699,
    rating: 4.9,
    reviewsCount: 175,
    badge: "🏀 Deep Channel",
    image: "assets/images/basketball-ball.webp",
    description: "Premium composite leather with pebble grain channels delivering superior grip control for outdoor street courts and indoor hardwoods.",
    sizes: ["Size 7 (Men / Official)", "Size 6 (Women / Youth)"],
    stock: 40,
    featured: true
  },
  {
    id: "sp-221",
    name: "CourtAir High-Top Basketball Shoes",
    category: "Basketball Court Shoes",
    categoryKey: "basketball",
    sport: "Basketball",
    price: 9999,
    originalPrice: 13499,
    rating: 4.8,
    reviewsCount: 135,
    badge: "★ High Elevation",
    image: "assets/images/basketball-shoes.webp",
    description: "High-top padded collar providing ankle lockdown and dual zoom units for cushioned landings after contested rebounds.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 25,
    featured: true
  },
  {
    id: "sp-222",
    name: "Dri-Fit Velocity Athletic Training Jersey",
    category: "Performance Apparel",
    categoryKey: "gym",
    sport: "Running",
    price: 1499,
    originalPrice: 2199,
    rating: 4.7,
    reviewsCount: 110,
    badge: "🔥 Quick Dry",
    image: "assets/images/training-jersey.webp",
    description: "Engineered ultra-light breathable polyester fabric that pulls sweat away from the skin for rapid evaporation during hot weather workouts.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 60,
    featured: false
  },
  {
    id: "sp-223",
    name: "AeroShield Moisture-Wicking Sports Cap",
    category: "Athletic Caps & Headwear",
    categoryKey: "running",
    sport: "Running",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 95,
    badge: "🧢 UV Protection",
    image: "assets/images/sports-cap.webp",
    description: "UPF 50+ sun protection athletic cap with laser-perforated side ventilation panels and moisture-absorbing sweatband.",
    sizes: ["Adjustable One Size Fits All"],
    stock: 50,
    featured: false
  },

  // --- Reference Showcase Shoes ---
  {
    id: "sp-224",
    name: "Jordan Why Not 6 - Volt Pro",
    category: "Court & High Agility",
    categoryKey: "basketball",
    sport: "Basketball",
    price: 17999,
    originalPrice: 21999,
    rating: 4.9,
    reviewsCount: 142,
    badge: "★ Highly Rated",
    image: "assets/images/shoe-green.webp",
    description: "Russell Westbrook's 6th signature shoe built for speed, rapid cross-cuts, and responsive court traction.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 24,
    featured: true
  },
  {
    id: "sp-225",
    name: "Jordan Why Not 6 - Silver Magenta",
    category: "Track & Field",
    categoryKey: "running",
    sport: "Running",
    price: 17999,
    originalPrice: 21999,
    rating: 4.8,
    reviewsCount: 98,
    badge: "★ Highly Rated",
    image: "assets/images/shoe-silver-pink.webp",
    description: "Engineered for high-cadence distance training and speed workouts with breathable layered mesh upper.",
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9"],
    stock: 18,
    featured: true
  },
  {
    id: "sp-226",
    name: "Jordan Why Not 6 - Solar Blue Strike",
    category: "Court Agility",
    categoryKey: "basketball",
    sport: "Basketball",
    price: 17499,
    originalPrice: 20999,
    rating: 4.9,
    reviewsCount: 184,
    badge: "★ Highly Rated",
    image: "assets/images/shoe-blue-orange.webp",
    description: "Dual-density foam midsole provides ultra-cushioned shock absorption for aggressive jumpers.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 30,
    featured: true
  },
  {
    id: "sp-227",
    name: "Ginnis Immortality All-Court 3",
    category: "Road & Court",
    categoryKey: "basketball",
    sport: "Basketball",
    price: 4899,
    originalPrice: 6499,
    rating: 4.7,
    reviewsCount: 320,
    badge: "🔥 Best Seller",
    image: "assets/images/shoe-purple.webp",
    description: "Lightweight and curved foam sole from heel to toe creates smooth strides on Indian road and turf conditions.",
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 45,
    featured: true
  },
  {
    id: "sp-228",
    name: "Deldor Shoes Air Vapor Cushion",
    category: "Cushioned Athleisure",
    categoryKey: "gym",
    sport: "Gym",
    price: 12999,
    originalPrice: 15499,
    rating: 4.9,
    reviewsCount: 210,
    badge: "New Drop",
    image: "assets/images/shoe-pink.webp",
    description: "Iconic Air cushion midsole combined with a sleek finish designed for full-day workouts and street style.",
    sizes: ["UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    stock: 15,
    featured: true
  }
];

const DEFAULT_ORDERS = [
  {
    id: "STK-IND-98241",
    date: "14 Sep 2026",
    customerName: "Rahul Sharma",
    customerEmail: "rahul.sharma@example.com",
    city: "Bengaluru, Karnataka",
    pincode: "560001",
    items: [
      { name: "English Willow Cricket Bat Grade 1", selectedSize: "Short Handle (Standard)", qty: 1, price: 14999, image: "assets/images/cricket-bat.webp" }
    ],
    total: 14999,
    status: "delivered",
    paymentMethod: "UPI (Google Pay)"
  },
  {
    id: "STK-IND-98242",
    date: "15 Sep 2026",
    customerName: "Pooja Verma",
    customerEmail: "pooja.verma@example.com",
    city: "Mumbai, Maharashtra",
    pincode: "400001",
    items: [
      { name: "Nanocore 900 Carbon Badminton Racquet", selectedSize: "4U (83g) - G5", qty: 1, price: 5499, image: "assets/images/badminton-racquet.webp" },
      { name: "Rubber Hex Dumbbell Pair (10kg Each)", selectedSize: "Pair of 10 KG", qty: 1, price: 3999, image: "assets/images/dumbbells-hex.webp" }
    ],
    total: 9498,
    status: "shipped",
    paymentMethod: "RuPay Credit Card"
  },
  {
    id: "STK-IND-98243",
    date: "15 Sep 2026",
    customerName: "Vikram Malhotra",
    customerEmail: "vikram.m@example.com",
    city: "New Delhi, Delhi",
    pincode: "110001",
    items: [
      { name: "Stackly Pro Match Cricket Spikes", selectedSize: "UK 8", qty: 1, price: 6499, image: "assets/images/cricket-spikes.webp" }
    ],
    total: 6499,
    status: "processing",
    paymentMethod: "Cash on Delivery"
  }
];

// Initialize Storage
const Store = {
  getProducts: function() {
    // Force refresh if old products count is small or updated
    const saved = localStorage.getItem("stackly_products_v3");
    if (!saved) {
      localStorage.setItem("stackly_products_v3", JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(saved);
  },

  saveProducts: function(products) {
    localStorage.setItem("stackly_products_v3", JSON.stringify(products));
  },

  getProductById: function(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || products[0];
  },

  getCart: function() {
    const cart = localStorage.getItem("stackly_cart");
    return cart ? JSON.parse(cart) : [];
  },

  saveCart: function(cart) {
    localStorage.setItem("stackly_cart", JSON.stringify(cart));
    this.updateCartCountUI();
  },

  addToCart: function(product, size = null, qty = 1) {
    const cart = this.getCart();
    const chosenSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : "Standard");
    const existingIndex = cart.findIndex(item => item.id === product.id && item.selectedSize === chosenSize);

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        selectedSize: chosenSize,
        qty: qty
      });
    }

    this.saveCart(cart);
    return cart;
  },

  removeFromCart: function(id, size) {
    let cart = this.getCart();
    cart = cart.filter(item => !(item.id === id && item.selectedSize === size));
    this.saveCart(cart);
    return cart;
  },

  updateQuantity: function(id, size, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === id && i.selectedSize === size);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        return this.removeFromCart(id, size);
      }
      this.saveCart(cart);
    }
    return cart;
  },

  getProductCartQty: function(productId) {
    const cart = this.getCart();
    return cart
      .filter(item => item.id === productId)
      .reduce((sum, item) => sum + item.qty, 0);
  },

  updateProductQuantity: function(productId, delta) {
    const cart = this.getCart();
    // Find an item matching productId (first match or standard size)
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        return this.removeFromCart(item.id, item.selectedSize);
      }
      this.saveCart(cart);
      return cart;
    } else if (delta > 0) {
      const product = this.getProductById(productId);
      if (product) {
        return this.addToCart(product, null, delta);
      }
    }
    return cart;
  },

  clearCart: function() {
    localStorage.removeItem("stackly_cart");
    this.updateCartCountUI();
  },

  getCartSubtotal: function() {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  },

  getWishlist: function() {
    const wishlist = localStorage.getItem("stackly_wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  },

  toggleWishlist: function(productId) {
    let wishlist = this.getWishlist();
    const idx = wishlist.indexOf(productId);
    let added = false;
    if (idx > -1) {
      wishlist.splice(idx, 1);
      added = false;
    } else {
      wishlist.push(productId);
      added = true;
    }
    localStorage.setItem("stackly_wishlist", JSON.stringify(wishlist));
    this.updateWishlistCountUI();
    return added;
  },

  isInWishlist: function(productId) {
    const wishlist = this.getWishlist();
    return wishlist.includes(productId);
  },

  getCurrentUser: function() {
    const user = localStorage.getItem("stackly_current_user");
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: function(user) {
    localStorage.setItem("stackly_current_user", JSON.stringify(user));
  },

  logoutUser: function() {
    localStorage.removeItem("stackly_current_user");
    window.location.href = "login.html";
  },

  getOrders: function() {
    const orders = localStorage.getItem("stackly_orders");
    if (!orders) {
      localStorage.setItem("stackly_orders", JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    return JSON.parse(orders);
  },

  saveOrders: function(orders) {
    localStorage.setItem("stackly_orders", JSON.stringify(orders));
  },

  addOrder: function(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
    this.clearCart();
    return order;
  },

  formatINR: function(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  },

  updateCartCountUI: function() {
    const cart = this.getCart();
    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  },

  updateWishlistCountUI: function() {
    const wishlist = this.getWishlist();
    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = wishlist.length;
      el.style.display = wishlist.length > 0 ? "flex" : "none";
    });
  }
};

// Seed storage
Store.getProducts();
Store.getOrders();
