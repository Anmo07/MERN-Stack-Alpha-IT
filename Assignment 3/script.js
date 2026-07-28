// --- Premium Aesthetic Product Database ---
const products = [
  {
    id: 1,
    name: "Minimalist Linen Trench Coat",
    price: 189.00,
    category: "Clothing",
    description: "A tailored, single-breasted trench coat crafted from a premium linen-cotton blend. Features custom horn buttons, structured shoulders, and an adjustable waist belt. Its soothing oat tone goes perfectly with any seasonal aesthetic.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Material: 60% Linen, 40% Cotton", "Cut: Relaxed Tailored Fit", "Sleeve: Long buttoned cuff sleeves", "Care: Dry Clean Only"],
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "Absolutely stunning fit! The fabric feels breathable and hangs beautifully." },
      { author: "Liam J.", rating: 4, comment: "Very nice quality, fits slightly oversized. Highly recommend." }
    ]
  },
  {
    id: 2,
    name: "Cable-Knit Merino Wool Sweater",
    price: 135.00,
    category: "Clothing",
    description: "Woven from 100% extra-fine Merino wool, this cable-knit sweater offers unparalleled warmth and cloud-like softness. A classic design updated with a modern drop-shoulder silhouette.",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Material: 100% Merino Wool", "Weave: Multi-directional cable stitch", "Fit: Relaxed drop-shoulder", "Care: Hand wash cold, dry flat"],
    reviews: [
      { author: "Clara M.", rating: 5, comment: "So incredibly soft! Not itchy at all, and the cream color is beautiful." },
      { author: "David R.", rating: 5, comment: "Perfect winter staple. Keeps its shape after washing too." }
    ]
  },
  {
    id: 3,
    name: "Hydrating Botanicals Facial Serum",
    price: 68.00,
    category: "Skincare",
    description: "Infused with organic rosewater, hyaluronic acid, and cold-pressed jojoba oil. This ultra-light serum absorbs instantly to deeply plump, hydrate, and brighten dull skin, leaving a dewy, glowing finish.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Volume: 50ml (1.7 fl oz)", "Formulation: Cruelty-free & Vegan", "Skin Types: Suitable for all skin types", "Ingredients: 100% organic active extracts"],
    reviews: [
      { author: "Chloe G.", rating: 5, comment: "My skin has never felt so hydrated. Literal holy grail!" },
      { author: "Sarah L.", rating: 4, comment: "Love the dewy finish, but it has a very mild botanical scent." }
    ]
  },
  {
    id: 4,
    name: "Obsidian Face Roller & Gua Sha Set",
    price: 45.00,
    category: "Skincare",
    description: "Handcrafted from 100% natural volcanic obsidian stone. Regular massage increases circulation, reduces facial puffiness, and aids in the absorption of serums and oils.",
    images: [
      "https://images.unsplash.com/photo-1590159763121-7c9fd312190d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Material: 100% Natural Volcanic Obsidian", "Set Includes: Dual-sided roller, Heart-shaped Gua Sha", "Storage: Custom velvet drawer bag", "Craftsmanship: Hand-polished smooth finish"],
    reviews: [
      { author: "Nina T.", rating: 5, comment: "Excellent quality, cold to the touch. Helps with jaw tension enormously!" },
      { author: "Marcus W.", rating: 4, comment: "Good set, feels very premium and heavy in hand." }
    ]
  },
  {
    id: 5,
    name: "Apple MacBook Pro 16\" (M3 Max)",
    price: 2499.00,
    category: "Electronics",
    description: "The absolute pinnacle of portable workstation computing. Features the M3 Max chip, a gorgeous Liquid Retina XDR display, up to 22 hours of battery life, and 36GB unified memory for ultra-fast heavy-duty workflows.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Processor: Apple M3 Max 16-Core Chip", "Memory: 36GB Unified RAM", "Storage: 1TB PCIe NVMe SSD", "Display: 16.2-inch Liquid Retina XDR (3456x2234)"],
    reviews: [
      { author: "Alex H.", rating: 5, comment: "A processing powerhouse. Xcode compiles projects in seconds!" },
      { author: "Tyler M.", rating: 5, comment: "Unbelievable screen, deep blacks and the battery lasts forever." }
    ]
  },
  {
    id: 6,
    name: "Hi-Fi Wireless ANC Headphones",
    price: 349.00,
    category: "Electronics",
    description: "Engineered with custom audio drivers and hybrid active noise cancellation. Enjoy rich, spacious acoustic detail with up to 30 hours of continuous wireless playback. Soothing memory foam earcups provide all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Driver: 40mm Custom Dynamic Dome", "Noise Cancellation: Adaptive Hybrid ANC", "Connectivity: Bluetooth 5.2, LDAC High-Res", "Battery Life: 30 hours (ANC on)"],
    reviews: [
      { author: "Jordan P.", rating: 5, comment: "Noise cancellation blocks out office chatter completely. So comfy too." },
      { author: "Emily S.", rating: 4, comment: "Sound quality is outstanding. Bass is punchy but clear." }
    ]
  },
  {
    id: 7,
    name: "Organic Hand-Picked Matcha Powder",
    price: 32.00,
    category: "Food",
    description: "Ceremonial grade Matcha sourced from the rolling hills of Uji, Kyoto. Meticulously stone-ground to preserve nutrients, vibrant green color, and sweet umami undertones. Perfect for daily tea rituals.",
    images: [
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Ingredients: 100% Organic Camellia Sinensis", "Origin: Uji, Kyoto, Japan", "Grade: Ceremonial First-Harvest", "Net Weight: 40g (approx. 30 servings)"],
    reviews: [
      { author: "Kenji Y.", rating: 5, comment: "Incredibly vibrant green. No bitterness, blends extremely smoothly." },
      { author: "Sophia F.", rating: 5, comment: "Best matcha latte I've ever made at home. Definitely ceremonial grade." }
    ]
  },
  {
    id: 8,
    name: "Artisanal Roasted Hazelnut Spread",
    price: 18.00,
    category: "Food",
    description: "Small-batch spread made with 70% slow-roasted Piedmont hazelnuts, organic dark cocoa, and a hint of Maldon sea salt. Free of palm oil, emulsifiers, and artificial additives.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Hazelnut Content: 70% Piedmont Hazelnuts", "Additives: Zero palm oil, gluten-free, vegan", "Net Weight: 250g", "Jar Material: Reusable glass container"],
    reviews: [
      { author: "Laura D.", rating: 5, comment: "Oh my god. I cannot go back to store-bought spreads. Absolutely divine!" },
      { author: "Sam B.", rating: 4, comment: "Rich, nutty, and not overly sweet. Very delicious." }
    ]
  },
  {
    id: 9,
    name: "Hand-Poured Soy Wax Candle",
    price: 26.00,
    category: "Home Decor",
    description: "Poured by hand in a minimalist ceramic vessel. Scented with premium essential oils of cedarwood, amber, and patchouli, creating a deeply relaxing and earthy forest atmosphere in any space.",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Wax Type: 100% Natural Organic Soy Wax", "Scent Profile: Cedarwood, Amber, Patchouli", "Burn Time: Approx. 50 hours", "Wick: Eco-friendly double cotton wicks"],
    reviews: [
      { author: "Rebecca Z.", rating: 5, comment: "The cedarwood scent is amazing. Very soothing and subtle, not chemical." },
      { author: "James T.", rating: 4, comment: "Excellent burn, lasts a long time. The container looks so beautiful as a decor piece." }
    ]
  },
  {
    id: 10,
    name: "Ceramic Drip Glaze Flower Vase",
    price: 52.00,
    category: "Home Decor",
    description: "Each vase is individually thrown on a potter's wheel and finished with a unique reactive drip glaze. Features a natural, organic shape ideal for dry grasses or fresh cut stems.",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Material: High-fired reactive stoneware", "Dimensions: Height 22cm, Diameter 12cm", "Waterproof: Fully glazed interior", "Craftsmanship: Individually wheel-thrown"],
    reviews: [
      { author: "Helen P.", rating: 5, comment: "A gorgeous statement piece. The color transition is beautiful." },
      { author: "Mark S.", rating: 5, comment: "High quality, nicely packaged, looks exactly like the photo." }
    ]
  },
  {
    id: 11,
    name: "Samsung Galaxy S24 Ultra Titanium",
    price: 1299.00,
    category: "Electronics",
    description: "Unlocks the next generation of mobile intelligence. Powered by Galaxy AI, an integrated aerospace-grade titanium frame, ultra-sharp 200MP camera sensor, and built-in S-Pen stylus.",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ],
    specs: ["Processor: Snapdragon 8 Gen 3 Mobile Platform", "Display: 6.8-inch Dynamic AMOLED 2X (120Hz)", "Camera: 200MP Main + 50MP Periscope Telephoto", "Frame: Titanium alloy frame, Gorilla Armor glass"],
    reviews: [
      { author: "Daniel C.", rating: 5, comment: "AI photo editing features are mind-blowing. The zoom is ridiculous." },
      { author: "Maya K.", rating: 4, comment: "Huge screen, super bright in sunlight. S-Pen is really helpful." }
    ]
  }
];

// App State
let cart = [];
let currentCategory = "All";
let searchQuery = "";
let currentTheme = "nordic";

// Carousel Auto-Scroll Properties
let carouselIndex = 0;
let carouselIntervalId = null;
const featuredProducts = [products[0], products[4], products[6]]; // Coat, MacBook, Matcha

// Modal Gallery Properties
let activeModalProduct = null;
let activeModalImageIndex = 0;
let modalSlideshowIntervalId = null;

// Initialize Layout and event bindings
document.addEventListener("DOMContentLoaded", () => {
  initAppLayout();
  startCarouselTimer();
});

// Build the shell page layout dynamically
function initAppLayout() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <!-- Sticky Navbar -->
    <nav class="navbar">
      <div class="navbar-container">
        <a href="#" class="logo" onclick="loadHomePage(event)">✨ QuantumStore</a>
        
        <div class="search-container">
          <span class="search-input-icon">🔍</span>
          <input type="text" id="search-bar" class="search-input" placeholder="Search products, clothing, skincare..." oninput="handleSearch(event)">
        </div>
        
        <div class="theme-switcher">
          <button class="theme-btn theme-btn-nordic active" onclick="setTheme('nordic')" title="Nordic Calm"></button>
          <button class="theme-btn theme-btn-lavender" onclick="setTheme('lavender')" title="Lavender Dream"></button>
          <button class="theme-btn theme-btn-sakura" onclick="setTheme('sakura')" title="Sakura Petal"></button>
          <button class="theme-btn theme-btn-sage" onclick="setTheme('sage')" title="Midnight Sage"></button>
        </div>
      </div>
    </nav>

    <!-- Main Container -->
    <div class="container">
      
      <!-- Auto Scrolling Hero Banner -->
      <div id="hero-carousel" class="hero-carousel">
        <!-- Rendered dynamically -->
      </div>

      <!-- Categories Navigation Pills -->
      <div id="categories-bar" class="categories-container">
        <!-- Rendered dynamically -->
      </div>

      <!-- Dashboard Layout -->
      <div class="main-layout">
        
        <!-- Products Column -->
        <main class="products-section">
          <div id="products-grid" class="products-grid">
            <!-- Rendered dynamically -->
          </div>
        </main>

        <!-- Cart Column -->
        <aside class="cart-section">
          <div class="cart-header">
            <h2 class="cart-title">🛒 Shopping Cart</h2>
            <span id="cart-count-badge" class="cart-count-badge">0</span>
          </div>
          
          <div id="cart-items" class="cart-items-container">
            <!-- Rendered dynamically -->
          </div>
          
          <div class="cart-footer">
            <div class="cart-calculation-row">
              <span class="calc-label">Total Items:</span>
              <span id="cart-total-count" class="calc-value">0</span>
            </div>
            <div class="cart-calculation-row">
              <span class="calc-label">Subtotal:</span>
              <span id="cart-subtotal" class="calc-value">$0.00</span>
            </div>
            <div class="cart-calculation-row" style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-color);">
              <span class="calc-label" style="font-weight: 700;">Grand Total:</span>
              <span id="cart-total-price" class="calc-value grand-total">$0.00</span>
            </div>
            <button class="btn-checkout" onclick="handleCheckout()">Complete Purchase</button>
          </div>
        </aside>

      </div>
    </div>

    <!-- Product Details Modal Backdrop -->
    <div id="product-detail-modal" class="modal-backdrop" onclick="closeModal(event)">
      <div class="modal-container" onclick="event.stopPropagation()">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- Feedback Notification Toast -->
    <div id="notification" class="notification-toast">
      <span class="notification-icon">✓</span>
      <span id="notification-message">Added to cart!</span>
    </div>
  `;

  // Render initial contents
  renderHeroCarousel();
  renderCategoryPills();
  renderProductsList();
  renderCart();
  setTheme("nordic"); // Default theme
}

// Reset page filters to go "Home"
function loadHomePage(event) {
  if (event) event.preventDefault();

  // Reset filter criteria
  searchQuery = "";
  currentCategory = "All";

  // Reset inputs in DOM
  const searchInput = document.getElementById("search-bar");
  if (searchInput) searchInput.value = "";

  // Close any details modal
  closeModal();

  // Update UI components
  renderCategoryPills();
  renderProductsList();
  renderHeroCarousel();
  startCarouselTimer(); // Reset carousel animation

  showToast("Welcome back to home page!");
}

// Change color themes smoothly
function setTheme(themeName) {
  document.body.className = ""; // Wipe current classes
  if (themeName !== "nordic") {
    document.body.classList.add(`theme-${themeName}`);
  }
  currentTheme = themeName;

  // Toggle active styling on buttons
  const buttons = document.querySelectorAll(".theme-btn");
  buttons.forEach(btn => {
    if (btn.classList.contains(`theme-btn-${themeName}`)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Render dynamic category pills
function renderCategoryPills() {
  const bar = document.getElementById("categories-bar");
  if (!bar) return;

  // Extract unique categories from db
  const cats = ["All", ...new Set(products.map(p => p.category))];
  
  bar.innerHTML = cats.map(cat => {
    const activeClass = (cat === currentCategory) ? "active" : "";
    return `
      <button class="category-pill ${activeClass}" onclick="selectCategory('${cat}')">${cat}</button>
    `;
  }).join("");
}

// Handle category selection
function selectCategory(categoryName) {
  currentCategory = categoryName;
  renderCategoryPills();
  renderProductsList();
}

// Live search input handler
function handleSearch(event) {
  searchQuery = event.target.value.toLowerCase().trim();
  renderProductsList();
}

// Render product catalog grid
function renderProductsList() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  // Filter products by search terms and active category selection
  const filtered = products.filter(prod => {
    const matchSearch = prod.name.toLowerCase().includes(searchQuery) ||
                        prod.category.toLowerCase().includes(searchQuery) ||
                        prod.description.toLowerCase().includes(searchQuery);
    const matchCategory = (currentCategory === "All" || prod.category === currentCategory);
    return matchSearch && matchCategory;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">No items match your search</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">Try clearing filters or search for tags like clothing, skincare, or electronics.</p>
      </div>
    `;
    return;
  }

  // Populate dynamic cards
  grid.innerHTML = filtered.map(prod => {
    const isExpensive = prod.price > 1000;
    const cardClass = isExpensive ? "product-card expensive-item" : "product-card";
    return `
      <div class="${cardClass}" id="card-${prod.id}" onclick="openProductDetail(${prod.id})">
        <div class="product-card-img-wrapper">
          <img src="${prod.images[0]}" alt="${prod.name}" class="product-card-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';">
        </div>
        <div class="product-card-category">${prod.category}</div>
        <div class="product-card-title">${prod.name}</div>
        <div class="product-card-bottom">
          <div class="product-card-price">$${prod.price.toFixed(2)}</div>
          <button class="btn-card-add" onclick="event.stopPropagation(); addToCart(${prod.id})" title="Add to Cart">+</button>
        </div>
      </div>
    `;
  }).join("");
}

// Auto Scrolling Hero Carousel Render
function renderHeroCarousel() {
  const container = document.getElementById("hero-carousel");
  if (!container) return;

  let slidesHTML = "";
  let dotsHTML = "";

  featuredProducts.forEach((prod, index) => {
    const activeClass = (index === carouselIndex) ? "active" : "";
    slidesHTML += `
      <div class="carousel-slide ${activeClass}" style="background-image: url('${prod.images[0]}')">
        <div class="carousel-overlay"></div>
        <div class="carousel-content">
          <span class="carousel-tag">Aesthetic Highlight</span>
          <h2 class="carousel-title">${prod.name}</h2>
          <p class="carousel-desc">${prod.description.substring(0, 105)}...</p>
          <button class="carousel-btn" onclick="openProductDetail(${prod.id})">Explore Details</button>
        </div>
      </div>
    `;

    dotsHTML += `
      <button class="carousel-dot ${activeClass}" onclick="setCarouselSlide(${index})"></button>
    `;
  });

  container.innerHTML = `
    ${slidesHTML}
    <div class="carousel-dots">${dotsHTML}</div>
  `;
}

// Start Carousel timer
function startCarouselTimer() {
  if (carouselIntervalId) clearInterval(carouselIntervalId);
  carouselIntervalId = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % featuredProducts.length;
    renderHeroCarousel();
  }, 4000);
}

// Select a specific slide manually
function setCarouselSlide(index) {
  carouselIndex = index;
  renderHeroCarousel();
  startCarouselTimer(); // Reset timer
}

// Open Product Detail Modal
function openProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;
  activeModalImageIndex = 0;

  const modal = document.getElementById("product-detail-modal");
  if (!modal) return;

  updateModalContent();
  modal.classList.add("show");

  // Start modal image auto-rotation if user stays inactive
  startModalSlideshow();
}

// Close Product Detail Modal
function closeModal(event) {
  const modal = document.getElementById("product-detail-modal");
  if (modal) {
    modal.classList.remove("show");
  }
  stopModalSlideshow();
  activeModalProduct = null;
}

// Update the inner modal HTML dynamically
function updateModalContent() {
  const modal = document.getElementById("product-detail-modal");
  if (!modal || !activeModalProduct) return;

  const container = modal.querySelector(".modal-container");
  if (!container) return;

  const prod = activeModalProduct;

  // Generate specs list HTML
  const specsHTML = prod.specs.map(spec => `<li>${spec}</li>`).join("");

  // Generate review stars & cards HTML
  const reviewsHTML = prod.reviews.map(rev => {
    const starString = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
    return `
      <div class="review-card">
        <div class="review-header">
          <span class="review-author">${rev.author}</span>
          <span class="review-stars">${starString}</span>
        </div>
        <p class="review-comment">"${rev.comment}"</p>
      </div>
    `;
  }).join("");

  // Create image gallery slider elements
  const imagesHTML = prod.images.map((imgUrl, index) => {
    const activeClass = (index === activeModalImageIndex) ? "active" : "";
    return `<img src="${imgUrl}" alt="${prod.name} gallery image" class="modal-gallery-img ${activeClass}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';">`;
  }).join("");

  // Create sub thumbnails
  const thumbnailsHTML = prod.images.map((imgUrl, index) => {
    const activeClass = (index === activeModalImageIndex) ? "active" : "";
    return `
      <img src="${imgUrl}" alt="Thumbnail" class="gallery-thumbnail ${activeClass}" onclick="setModalImage(${index})" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';">
    `;
  }).join("");

  container.innerHTML = `
    <button class="btn-close-modal" onclick="closeModal()">✕</button>
    
    <!-- Image Gallery Section -->
    <div class="modal-gallery-pane">
      <div class="modal-gallery-main">
        ${imagesHTML}
        <button class="gallery-arrow gallery-arrow-left" onclick="slideModalImage(-1)">‹</button>
        <button class="gallery-arrow gallery-arrow-right" onclick="slideModalImage(1)">›</button>
      </div>
      <div class="gallery-thumbnails">
        ${thumbnailsHTML}
      </div>
    </div>

    <!-- Product details context -->
    <div class="modal-details-pane">
      <div class="modal-category">${prod.category}</div>
      <h2 class="modal-title">${prod.name}</h2>
      <div class="modal-price-row">
        <span class="modal-price">$${prod.price.toFixed(2)}</span>
      </div>
      
      <p class="modal-description">${prod.description}</p>
      
      <!-- Specifications tab -->
      <h3 class="modal-section-title">Design Specs</h3>
      <ul class="specs-list">
        ${specsHTML}
      </ul>

      <!-- Reviews tab -->
      <h3 class="modal-section-title">Customer Reviews</h3>
      <div class="reviews-container">
        ${reviewsHTML}
      </div>

      <div class="modal-action-row">
        <button class="btn-modal-checkout" onclick="addToCart(${prod.id}); closeModal();">Add to Shopping Cart</button>
      </div>
    </div>
  `;
}

// Change active modal image manually
function setModalImage(index) {
  stopModalSlideshow();
  activeModalImageIndex = index;
  updateModalContent();
}

// Slide active modal image index
function slideModalImage(direction) {
  stopModalSlideshow();
  if (!activeModalProduct) return;
  const count = activeModalProduct.images.length;
  activeModalImageIndex = (activeModalImageIndex + direction + count) % count;
  updateModalContent();
}

// Start auto scrolling modal image slideshow (every 3 seconds)
function startModalSlideshow() {
  if (modalSlideshowIntervalId) clearInterval(modalSlideshowIntervalId);
  modalSlideshowIntervalId = setInterval(() => {
    if (!activeModalProduct) return;
    const count = activeModalProduct.images.length;
    activeModalImageIndex = (activeModalImageIndex + 1) % count;
    // We update only the active class in DOM directly to avoid re-rendering entire details during auto-scroll
    const galleryImgs = document.querySelectorAll(".modal-gallery-img");
    const thumbnails = document.querySelectorAll(".gallery-thumbnail");
    
    galleryImgs.forEach((img, index) => {
      if (index === activeModalImageIndex) img.classList.add("active");
      else img.classList.remove("active");
    });
    
    thumbnails.forEach((thumb, index) => {
      if (index === activeModalImageIndex) thumb.classList.add("active");
      else thumb.classList.remove("active");
    });
  }, 3000);
}

// Stop modal auto slideshow
function stopModalSlideshow() {
  if (modalSlideshowIntervalId) {
    clearInterval(modalSlideshowIntervalId);
    modalSlideshowIntervalId = null;
  }
}

// --- Cart Operations ---

// Add item to cart state
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  showToast(`Added "${product.name}" to cart!`);
  renderCart();
}

// Remove item completely from cart state
function removeFromCart(productId) {
  const index = cart.findIndex(item => item.product.id === productId);
  if (index > -1) {
    const itemName = cart[index].product.name;
    cart.splice(index, 1);
    showToast(`Removed "${itemName}" from cart!`, "warning");
    renderCart();
  }
}

// Update cart quantity (+1 or -1)
function updateQuantity(productId, change) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity += change;

    // Using comparison operators to handle boundaries
    if (cartItem.quantity <= 0) {
      removeFromCart(productId);
    } else {
      renderCart();
    }
  }
}

// Calculate total items and price using operators
function calculateTotal() {
  let totalItems = 0;
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
    totalPrice += cart[i].product.price * cart[i].quantity;
  }

  return { totalItems, totalPrice };
}

// Render updated cart in UI
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalCountEl = document.getElementById("cart-total-count");
  const totalPriceEl = document.getElementById("cart-total-price");
  const subtotalEl = document.getElementById("cart-subtotal");
  const countBadgeEl = document.getElementById("cart-count-badge");

  if (!cartItemsContainer) return;

  const { totalItems, totalPrice } = calculateTotal();

  // Update count displays
  totalCountEl.textContent = totalItems;
  countBadgeEl.textContent = totalItems;
  subtotalEl.textContent = `$${totalPrice.toFixed(2)}`;
  totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🌱</div>
        <div>Your cart is empty. Explore products to add them here!</div>
      </div>
    `;
    return;
  }

  // Populate dynamic cart items lists
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemSubtotal = item.product.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.product.images[0]}" alt="${item.product.name}" class="cart-item-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price-row">
            <span>$${item.product.price.toFixed(2)} x ${item.quantity}</span>
            <span class="cart-item-subtotal">$${itemSubtotal.toFixed(2)}</span>
          </div>
          
          <div class="cart-item-controls">
            <div class="quantity-controller">
              <button class="btn-qty" onclick="updateQuantity(${item.product.id}, -1)">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="btn-qty" onclick="updateQuantity(${item.product.id}, 1)">+</button>
            </div>
            
            <button class="btn-remove-item" onclick="removeFromCart(${item.product.id})" title="Remove item">
              🗑️ Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Complete order simulated checkout
function handleCheckout() {
  if (cart.length === 0) {
    showToast("Please add items to your cart first!", "warning");
    return;
  }

  const { totalPrice } = calculateTotal();
  alert(`🌸 Checkout Completed!\nTotal amount charged: $${totalPrice.toFixed(2)}\n\nThank you for shopping at QuantumStore.`);
  
  cart = [];
  renderCart();
  showToast("Checkout successful!");
}

// Show a feedback notification toast
function showToast(message, type = "success") {
  const toast = document.getElementById("notification");
  const msgEl = document.getElementById("notification-message");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  
  if (type === "warning") {
    toast.style.borderColor = "var(--danger-color)";
    toast.querySelector(".notification-icon").textContent = "⚠️";
    toast.querySelector(".notification-icon").style.color = "var(--danger-color)";
  } else {
    toast.style.borderColor = "rgba(var(--accent-rgb), 0.4)";
    toast.querySelector(".notification-icon").textContent = "✓";
    toast.querySelector(".notification-icon").style.color = "var(--success-color)";
  }

  toast.classList.add("show");
  
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Export functions to global window object
window.loadHomePage = loadHomePage;
window.setTheme = setTheme;
window.selectCategory = selectCategory;
window.handleSearch = handleSearch;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openProductDetail = openProductDetail;
window.closeModal = closeModal;
window.setModalImage = setModalImage;
window.slideModalImage = slideModalImage;
window.handleCheckout = handleCheckout;
