// ─────────────────────────────────────────────────────────────
//   Brew Haven Café – Master Client JavaScript Logic
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PRELOADER HIDE ── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add('fade-out');
    }, 400);
  });
  // Fallback timeout in case window.load takes long
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 1500);

  /* ── 2. NAVBAR SCROLL & MOBILE MENU ── */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollPos > 50);
    }
    if (scrollToTopBtn) {
      scrollToTopBtn.classList.toggle('visible', scrollPos > 400);
    }
  });

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 3. DARK MODE DEFAULT ── */
  document.documentElement.setAttribute('data-theme', 'dark');

  /* ── 4. FEATURED MENU DATA & RENDERER ── */
  const menuDatabase = {
    coffee: [
      { id: 'c1', name: 'Espresso', price: 3.50, desc: 'Bold, intense single-origin shot with a dense golden crema.', tag: 'CLASSIC', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80' },
      { id: 'c2', name: 'Americano', price: 4.00, desc: 'Double espresso diluted with hot water for a crisp, smooth roast.', tag: null, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
      { id: 'c3', name: 'Cappuccino', price: 4.80, desc: 'Equal parts espresso, warm milk, and deep velvety micro-foam.', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80' },
      { id: 'c4', name: 'Latte', price: 5.20, desc: 'Rich espresso poured into silky steamed milk with delicate latte art.', tag: 'BESTSELLER', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80' },
      { id: 'c5', name: 'Mocha', price: 5.50, desc: 'Espresso infused with premium dark chocolate & steamed milk.', tag: 'INDULGENT', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80' },
      { id: 'c6', name: 'Cold Brew', price: 4.90, desc: '18-hour slow cold-steeped craft coffee served over crystal ice.', tag: 'REFRESHING', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80' }
    ],
    tea: [
      { id: 't1', name: 'Green Tea', price: 3.80, desc: 'Organic Japanese Sencha green tea leaves steamed for antioxidant purity.', tag: 'HEALTHY', img: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80' },
      { id: 't2', name: 'Masala Chai', price: 4.20, desc: 'Traditional spiced black tea simmered with cardamom, ginger & milk.', tag: 'BESTSELLER', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
      { id: 't3', name: 'Lemon Tea', price: 3.90, desc: 'Fresh Ceylon black tea infused with real lemon juice and wildflowers.', tag: null, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
      { id: 't4', name: 'Herbal Tea', price: 4.10, desc: 'Caffeine-free blend of chamomile, peppermint, and lemongrass.', tag: 'CALMING', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80' },
      { id: 't5', name: 'Matcha Latte', price: 5.40, desc: 'Ceremonial grade Uji matcha whisked with oat milk & organic honey.', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80' },
      { id: 't6', name: 'Earl Grey Supreme', price: 4.30, desc: 'Bergamot-infused black tea with blue cornflowers & lavender hints.', tag: 'PREMIUM', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' }
    ],
    snacks: [
      { id: 's1', name: 'Croissant', price: 3.50, desc: 'Flaky, buttery French golden croissant baked fresh every morning.', tag: 'FRESH', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
      { id: 's2', name: 'Chocolate Muffin', price: 3.80, desc: 'Rich, moist double-chocolate muffin with molten Belgian chips.', tag: null, img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80' },
      { id: 's3', name: 'Blueberry Cheesecake', price: 5.50, desc: 'Creamy New York style cheesecake topped with sweet wild blueberry compote.', tag: 'CHEF\'S CHOICE', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80' },
      { id: 's4', name: 'Garlic Bread', price: 4.20, desc: 'Toasted artisan baguette brushed with garlic butter and fresh herbs.', tag: null, img: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80' },
      { id: 's5', name: 'Veg Sandwich', price: 5.00, desc: 'Grilled multigrain bread layered with avocado, cucumber, tomato & pesto.', tag: 'VEGAN', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80' },
      { id: 's6', name: 'Chicken Sandwich', price: 6.20, desc: 'Herb-roasted chicken breast, melted mozzarella, and chipotle mayo on ciabatta.', tag: 'SAVORY', img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80' }
    ],
    desserts: [
      { id: 'd1', name: 'Tiramisu', price: 6.50, desc: 'Authentic Italian dessert made with espresso-soaked ladyfingers & mascarpone.', tag: 'SIGNATURE', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80' },
      { id: 'd2', name: 'Brownie', price: 4.50, desc: 'Fudgy, dense chocolate brownie topped with walnuts & sea salt.', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80' },
      { id: 'd3', name: 'Red Velvet Cake', price: 6.00, desc: 'Moist red velvet sponge layers with silky cream cheese frosting.', tag: null, img: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80' },
      { id: 'd4', name: 'Cookies', price: 3.20, desc: 'Pair of freshly baked giant cookies (Chocolate Chip & Almond Crunch).', tag: null, img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80' },
      { id: 'd5', name: 'French Macaron Box', price: 7.50, desc: 'Assortment of 6 delicate almond macarons (Pistachio, Raspberry, Vanilla).', tag: 'CHEF\'S CHOICE', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80' },
      { id: 'd6', name: 'Fresh Berry Tartlet', price: 5.80, desc: 'Crisp pastry shell filled with vanilla custard & fresh wild berries.', tag: 'FRESH', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80' }
    ]
  };

  const menuCardsContainer = document.getElementById('menuCardsContainer');
  const menuTabs = document.querySelectorAll('.menu-tab');

  function renderMenuCategory(category) {
    if (!menuCardsContainer) return;
    menuCardsContainer.innerHTML = '';
    const items = menuDatabase[category] || [];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <div class="menu-card-img-wrap">
          <img src="${item.img}" alt="${item.name}" class="menu-card-img" loading="lazy" />
          ${item.tag ? `<span class="menu-card-badge">${item.tag}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">$${item.price.toFixed(2)}</span>
            <button class="add-cart-btn" data-id="${item.id}">
              <i class="fa-solid fa-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
      menuCardsContainer.appendChild(card);
    });

    // Attach Add to Cart event listeners
    menuCardsContainer.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        addToCart(id);
      });
    });
  }

  // Tab switching handler
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderMenuCategory(cat);
    });
  });

  // Footer Category Link Handler
  document.querySelectorAll('[data-cat-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCat = e.currentTarget.getAttribute('data-cat-link');
      const matchingTab = document.querySelector(`.menu-tab[data-category="${targetCat}"]`);
      if (matchingTab) {
        matchingTab.click();
      }
    });
  });

  // Initial menu render
  renderMenuCategory('coffee');

  /* ── 5. SHOPPING CART SYSTEM ── */
  let cart = [];
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTaxEl = document.getElementById('cartTax');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const heroOrderBtn = document.getElementById('heroOrderBtn');

  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const finishOrderBtn = document.getElementById('finishOrderBtn');
  const checkoutOrderDetails = document.getElementById('checkoutOrderDetails');

  function saveCart() {
    try {
      localStorage.setItem('brewhaven_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }

  function loadCart() {
    try {
      const saved = localStorage.getItem('brewhaven_cart');
      if (saved) {
        cart = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
  }

  function findMenuItem(id) {
    for (const cat in menuDatabase) {
      const item = menuDatabase[cat].find(i => i.id === id);
      if (item) return item;
    }
    return null;
  }

  function addToCart(id) {
    const menuItem = findMenuItem(id);
    if (!menuItem) return;

    const existingIndex = cart.findIndex(i => i.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...menuItem, qty: 1 });
    }
    updateCartUI();
    openCartDrawer();
  }

  function updateQty(id, delta) {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
    }
    updateCartUI();
  }

  function updateCartUI() {
    saveCart();
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) cartBadge.textContent = totalCount;

    if (!cartItemsList) return;
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-msg">
          <i class="fa-solid fa-mug-saucer"></i>
          <p>Your cart is empty.</p>
          <small>Add something delicious from our menu!</small>
        </div>
      `;
      if (checkoutBtn) checkoutBtn.disabled = true;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
      if (cartTaxEl) cartTaxEl.textContent = '$0.00';
      if (cartTotalEl) cartTotalEl.textContent = '$0.00';
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    let subtotal = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-qty-controls">
            <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
          </div>
        </div>
        <div style="font-weight: 700; color: var(--gold);">$${itemTotal.toFixed(2)}</div>
      `;
      cartItemsList.appendChild(itemEl);
    });

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTaxEl) cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Quantity button events
    cartItemsList.querySelectorAll('.inc-btn').forEach(btn => {
      btn.addEventListener('click', () => updateQty(btn.getAttribute('data-id'), 1));
    });
    cartItemsList.querySelectorAll('.dec-btn').forEach(btn => {
      btn.addEventListener('click', () => updateQty(btn.getAttribute('data-id'), -1));
    });
  }

  // Load saved cart on page load
  loadCart();
  updateCartUI();

  function openCartDrawer() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('hidden');
      cartOverlay.classList.remove('hidden');
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('hidden');
      cartOverlay.classList.add('hidden');
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
  if (heroOrderBtn) {
    heroOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }

  // Checkout modal
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      closeCartDrawer();

      const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      if (checkoutOrderDetails) {
        checkoutOrderDetails.innerHTML = `
          <strong>Order Summary (${cart.reduce((s, i) => s + i.qty, 0)} items):</strong><br/>
          ${cart.map(i => `• ${i.qty}x ${i.name} ($${(i.price * i.qty).toFixed(2)})`).join('<br/>')}
          <hr style="margin: 0.8rem 0; border-color: var(--border-color);" />
          <strong>Total Paid: $${total.toFixed(2)}</strong>
        `;
      }

      if (checkoutModal) checkoutModal.classList.remove('hidden');
      cart = [];
      updateCartUI();
    });
  }

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.add('hidden'));
  }
  if (finishOrderBtn) {
    finishOrderBtn.addEventListener('click', () => checkoutModal.classList.add('hidden'));
  }

  /* ── 6. REVIEWS CAROUSEL (3 CARDS PER VIEW) ── */
  const reviewsTrack = document.getElementById('reviewsTrack');
  const prevReviewBtn = document.getElementById('prevReviewBtn');
  const nextReviewBtn = document.getElementById('nextReviewBtn');
  const carouselDotsContainer = document.getElementById('carouselDots');
  const carouselTrackWrapper = document.getElementById('carouselTrackWrapper');
  
  let currentReviewPage = 0;
  let autoSlideTimer = null;
  let cardsPerView = 3;
  let totalPages = 2;
  const reviewCards = reviewsTrack ? Array.from(reviewsTrack.children) : [];
  const totalCards = reviewCards.length;

  function updateCarouselDimensions() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 639) {
      cardsPerView = 1;
    } else if (screenWidth <= 991) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
    totalPages = Math.ceil(totalCards / cardsPerView);
    if (currentReviewPage >= totalPages) {
      currentReviewPage = Math.max(0, totalPages - 1);
    }
    renderCarouselDots();
    goToReviewPage(currentReviewPage, false);
  }

  function renderCarouselDots() {
    if (!carouselDotsContainer) return;
    carouselDotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `dot ${i === currentReviewPage ? 'active' : ''}`;
      dot.setAttribute('data-index', i);
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.addEventListener('click', () => goToReviewPage(i));
      carouselDotsContainer.appendChild(dot);
    }
  }

  function goToReviewPage(pageIndex, animate = true) {
    if (totalPages <= 0) return;
    if (pageIndex < 0) pageIndex = totalPages - 1;
    if (pageIndex >= totalPages) pageIndex = 0;
    currentReviewPage = pageIndex;

    if (reviewsTrack && carouselTrackWrapper) {
      const wrapperWidth = carouselTrackWrapper.offsetWidth;
      const gap = 24; // 1.5rem = 24px gap
      const shiftX = pageIndex * (wrapperWidth + gap);
      
      reviewsTrack.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      reviewsTrack.style.transform = `translateX(-${shiftX}px)`;
    }

    if (carouselDotsContainer) {
      const dots = carouselDotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentReviewPage);
      });
    }
  }

  if (prevReviewBtn) prevReviewBtn.addEventListener('click', () => goToReviewPage(currentReviewPage - 1));
  if (nextReviewBtn) nextReviewBtn.addEventListener('click', () => goToReviewPage(currentReviewPage + 1));

  // Touch & Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  if (carouselTrackWrapper) {
    carouselTrackWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    carouselTrackWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToReviewPage(currentReviewPage + 1);
        } else {
          goToReviewPage(currentReviewPage - 1);
        }
      }
      startAutoSlide();
    }, { passive: true });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToReviewPage(currentReviewPage + 1);
    }, 6000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  window.addEventListener('resize', updateCarouselDimensions);
  updateCarouselDimensions();
  startAutoSlide();

  const reviewsSection = document.getElementById('reviews');
  if (reviewsSection) {
    reviewsSection.addEventListener('mouseenter', stopAutoSlide);
    reviewsSection.addEventListener('mouseleave', startAutoSlide);
  }

  /* ── 7. FEEDBACK FORM REMOVED ── */

  /* ── 8. LIVE OPENING HOURS BADGE ── */
  function calculateLiveHours() {
    const liveHoursBadge = document.getElementById('liveHoursBadge');
    if (!liveHoursBadge) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 6 = Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeVal = hour * 60 + minute;

    let isOpen = false;
    let closingTime = '';

    if (day === 0 || day === 6) { // Weekend: 9AM - 10PM
      if (timeVal >= 9 * 60 && timeVal < 22 * 60) {
        isOpen = true;
        closingTime = '10:00 PM';
      }
    } else { // Weekday: 8AM - 9PM
      if (timeVal >= 8 * 60 && timeVal < 21 * 60) {
        isOpen = true;
        closingTime = '9:00 PM';
      }
    }

    if (isOpen) {
      liveHoursBadge.className = 'live-hours-badge open';
      liveHoursBadge.innerHTML = `<i class="fa-solid fa-circle"></i> OPEN NOW (Closes at ${closingTime})`;
    } else {
      liveHoursBadge.className = 'live-hours-badge closed';
      liveHoursBadge.innerHTML = `<i class="fa-solid fa-circle"></i> CLOSED NOW (Opens at 8:00 AM)`;
    }
  }

  calculateLiveHours();

  /* ── 9. JOIN COFFEE LOVERS CLUB FORM ── */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.classList.add('hidden');
      if (newsletterSuccess) newsletterSuccess.classList.remove('hidden');
    });
  }

  /* ── 10. FLOATING BEANBOT CHATBOT (WITH GROQ AI INTEGRATION & ROBUST ERROR HANDLING) ── */
  const chatbotFab = document.getElementById('chatbotFab');
  const chatWindow = document.getElementById('chatWindow');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const suggestionsChips = document.getElementById('suggestionsChips');
  const fabBadge = chatbotFab ? chatbotFab.querySelector('.fab-badge') : null;
  const aiBadge = document.getElementById('aiBadge');

  let hasGroqApiKey = false;
  let chatHistory = [];

  const ALL_SUGGESTIONS = [
    "What are today's specials?",
    "What are your opening hours?",
    "Do you offer takeaway?",
    "Do you have free WiFi?",
    "Where are you located?",
    "Can I reserve a table?",
    "What payment methods do you accept?",
    "Do you have vegan options?",
    "What desserts are available?",
    "Do you offer home delivery?",
    "How can I contact customer support?",
    "Do you have loyalty rewards?"
  ];

  const CAFE_KEYWORDS = [
    'coffee', 'cafe', 'tea', 'menu', 'order', 'hours', 'open', 'close', 
    'location', 'where', 'address', 'table', 'reserve', 'book', 'wifi', 
    'internet', 'pay', 'card', 'cash', 'vegan', 'plant', 'dairy', 'dessert', 
    'sweet', 'cake', 'brownie', 'macaron', 'takeaway', 'to go', 'deliver', 
    'contact', 'phone', 'call', 'email', 'reward', 'loyalty', 'club', 'stamp', 
    'special', 'recommend', 'latte', 'espresso', 'cappuccino', 'mocha', 'hello', 'hi', 'hey',
    'bestseller', 'bestsellers', 'popular', 'price', 'prices', 'cost', 'rate', 'cheap', 'expensive',
    'drink', 'drinks', 'topping', 'syrup', 'flavor', 'ingredient', 'caffeine', 'decaf', 'hot', 'cold',
    'ice', 'iced', 'food', 'breakfast', 'snack', 'pastry', 'pastries', 'croissant', 'tiramisu', 'chai'
  ];

  const GROQ_SYSTEM_PROMPT = `You are BeanBot ☕, the ultra-friendly, knowledgeable AI barista assistant for Brew Haven Café.
Your goal is to assist customers warmly with questions about our menu, bestsellers, prices, specials, opening hours, reservations, location, ingredients, and coffee/tea recommendations.
Café Details:
- Name: Brew Haven Café ("Every Cup Tells a Story")
- Location: 123 Coffee Street, Downtown, New York, NY 10001 (Next to Central Square)
- Phone: +1 (555) 123-4567 | Email: hello@brewhaven.com
- Hours: Mon-Fri: 8:00 AM - 9:00 PM | Sat-Sun: 9:00 AM - 10:00 PM
- Menu Highlights & Prices ($3.20 - $7.50): Single-Origin Espresso ($3.20), Americano ($3.80), Cappuccino ($4.80), Latte ($5.20), Dark Chocolate Mocha ($5.50), 18-hr Cold Brew ($4.80), Organic Green Tea ($3.80), Masala Chai ($4.20), Lemon Tea ($3.50), Herbal Tea ($3.80), Uji Matcha Latte ($5.20), Earl Grey Supreme ($4.00), French Croissants ($3.50), Chocolate Muffins ($3.80), NY Cheesecake ($6.00), Veg/Chicken Sandwiches ($6.50), Tiramisu ($6.50), French Macarons ($7.50), Wild Berry Tartlets ($5.80).
- Bestsellers: Latte, Masala Chai, Signature Tiramisu, French Croissant.
- Features: High-speed Fiber WiFi, power outlets at every booth, takeaway, indoor & outdoor seating, vegan milk options (Oat, Almond, Soy).
Instructions: Answer all café, menu, price, and beverage queries helpfully. Keep responses concise (under 120 words), conversational, welcoming, and properly formatted with HTML tags like <strong>, <br/>, bullet lists, and cute emojis!`;

  async function checkServerConfig() {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        hasGroqApiKey = Boolean(data.hasGroqApiKey);
      }
    } catch (e) {
      console.warn('Could not check server API config:', e);
    }
    updateAiBadgeState();
  }

  checkServerConfig();

  function updateAiBadgeState() {
    if (!aiBadge) return;
    if (hasGroqApiKey) {
      aiBadge.textContent = 'Groq AI ⚡';
      aiBadge.className = 'ai-badge active';
    } else {
      aiBadge.textContent = 'Smart Bot ☕';
      aiBadge.className = 'ai-badge local';
    }
  }

  function toggleChatbot() {
    if (!chatWindow) return;
    const isHidden = chatWindow.classList.contains('hidden');
    if (isHidden) {
      chatWindow.classList.remove('hidden');
      if (chatbotFab) chatbotFab.classList.add('active');
      if (fabBadge) fabBadge.style.display = 'none';
      if (chatInput) chatInput.focus();
    } else {
      chatWindow.classList.add('hidden');
      if (chatbotFab) chatbotFab.classList.remove('active');
    }
  }

  if (chatbotFab) chatbotFab.addEventListener('click', toggleChatbot);
  if (closeChatBtn) closeChatBtn.addEventListener('click', toggleChatbot);

  // Suggested Questions Database (Local Fallback)
  const botAnswers = {
    "What are today's specials?": "☕ <strong>Today's Specials:</strong><br/>• Espresso-soaked Tiramisu Cake<br/>• Creamy Caramel Macchiato with oat milk<br/>• Freshly baked Blueberry Cheesecake! 🍰",
    "What are your opening hours?": "🕒 <strong>Opening Hours:</strong><br/>• <strong>Monday – Friday:</strong> 8:00 AM – 9:00 PM<br/>• <strong>Saturday – Sunday:</strong> 9:00 AM – 10:00 PM",
    "Do you offer takeaway?": "🛍️ <strong>Yes, absolutely!</strong> All menu items, drinks, and fresh pastries are packaged for takeaway with thermal cups and carriers.",
    "Do you have free WiFi?": "📶 <strong>Yes!</strong> We provide high-speed optical fiber WiFi for all guests with plenty of laptop power outlets.",
    "Where are you located?": "📍 <strong>Our Address:</strong><br/>123 Coffee Street, Downtown, New York, NY 10001. We are right next to Central Square!",
    "Can I reserve a table?": "🪑 <strong>Table Reservations:</strong> Walk-ins are always welcome! For groups of 6 or more, please call us at <strong>+1 (555) 123-4567</strong>.",
    "What payment methods do you accept?": "💳 <strong>Payment Methods:</strong> We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and Cash.",
    "Do you have vegan options?": "🌱 <strong>Vegan Options:</strong> We offer Oat, Almond, and Soy milk, plus Vegan Avocado Toast, Dark Chocolate Cookies, and Vegan Sandwich!",
    "What desserts are available?": "🍰 <strong>Available Desserts:</strong><br/>• Signature Tiramisu ($6.50)<br/>• Fudgy Brownie ($4.50)<br/>• Red Velvet Cake ($6.00)<br/>• Giant Cookie Duo ($3.20)<br/>• French Macaron Box ($7.50)<br/>• Wild Berry Tartlet ($5.80)",
    "Do you offer home delivery?": "🛵 <strong>Home Delivery:</strong> Yes! You can order directly through our website or find us on UberEats and DoorDash.",
    "How can I contact customer support?": "📞 <strong>Contact Us:</strong><br/>• Phone: +1 (555) 123-4567<br/>• Email: hello@brewhaven.com<br/>• WhatsApp: <a href='https://wa.me/15551234567' target='_blank' style='color:var(--gold);'>Chat on WhatsApp</a>",
    "Do you have loyalty rewards?": "🎁 <strong>Coffee Lovers Club:</strong> Earn 1 stamp for every cup! Collect 10 stamps to unlock a FREE specialty beverage of your choice!"
  };

  function getLocalBotAnswer(questionText) {
    if (botAnswers[questionText]) return botAnswers[questionText];
    const lower = questionText.toLowerCase();
    if (lower.includes('bestseller') || lower.includes('popular') || lower.includes('recommend') || lower.includes('special') || lower.includes('best')) {
      return "🌟 <strong>Our Bestsellers & Recommendations:</strong><br/>• ☕ <strong>Latte ($5.20):</strong> Silky steamed milk with rich espresso art.<br/>• 🍵 <strong>Masala Chai ($4.20):</strong> Spiced black tea with cardamom & ginger.<br/>• 🍰 <strong>Signature Tiramisu ($6.50):</strong> Creamy espresso-soaked Italian classic!<br/>• 🥐 <strong>Fresh Croissant ($3.50):</strong> Flaky, buttery French perfection.";
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('cheap') || lower.includes('expensive')) {
      return "💰 <strong>Menu Pricing:</strong> Our artisan coffee & organic teas range from $3.20 to $5.50. Savory snacks & decadent desserts range from $3.20 to $7.50.";
    }
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time')) return botAnswers["What are your opening hours?"];
    if (lower.includes('takeaway') || lower.includes('to go') || lower.includes('pack')) return botAnswers["Do you offer takeaway?"];
    if (lower.includes('wifi') || lower.includes('internet') || lower.includes('work')) return botAnswers["Do you have free WiFi?"];
    if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('map')) return botAnswers["Where are you located?"];
    if (lower.includes('reserve') || lower.includes('table') || lower.includes('book')) return botAnswers["Can I reserve a table?"];
    if (lower.includes('pay') || lower.includes('card') || lower.includes('cash')) return botAnswers["What payment methods do you accept?"];
    if (lower.includes('vegan') || lower.includes('plant') || lower.includes('dairy free')) return botAnswers["Do you have vegan options?"];
    if (lower.includes('dessert') || lower.includes('sweet') || lower.includes('cake') || lower.includes('brownie') || lower.includes('macaron')) return botAnswers["What desserts are available?"];
    if (lower.includes('deliver') || lower.includes('ubereats') || lower.includes('order')) return botAnswers["Do you offer home delivery?"];
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('call') || lower.includes('email')) return botAnswers["How can I contact customer support?"];
    if (lower.includes('reward') || lower.includes('loyalty') || lower.includes('club') || lower.includes('stamp')) return botAnswers["Do you have loyalty rewards?"];
    return "I'm here to help with all questions about Brew Haven Café's menu, specials, hours, location, WiFi, and table reservations! How can I assist you today?";
  }

  function refreshSuggestions() {
    if (!suggestionsChips) return;
    suggestionsChips.innerHTML = '';
    const shuffled = [...ALL_SUGGESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    selected.forEach(question => {
      const btn = document.createElement('button');
      btn.className = 'chip-btn';
      btn.setAttribute('data-question', question);
      btn.textContent = question;
      btn.addEventListener('click', () => {
        processUserQuestion(question);
      });
      suggestionsChips.appendChild(btn);
    });
  }

  async function callGroqChatProxy(userMessage) {
    chatHistory.push({ role: 'user', content: userMessage });
    if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

    const messages = [
      { role: 'system', content: GROQ_SYSTEM_PROMPT },
      ...chatHistory
    ];

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorObj = new Error(data.message || `HTTP ${response.status}`);
      errorObj.code = data.error || 'API_ERROR';
      throw errorObj;
    }

    const reply = data.choices?.[0]?.message?.content;
    if (reply) {
      chatHistory.push({ role: 'assistant', content: reply });
      let formatted = reply
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>');
      return formatted;
    }

    throw new Error('No response content received from AI');
  }

  function appendChatMessage(sender, text) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div class="msg-bubble">${text}</div>
      <span class="msg-timestamp">${timeStr}</span>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showBotTyping(callback) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.innerHTML = `
      <div class="msg-bubble" style="display:flex; gap:4px; align-items:center;">
        <span class="typing-dot" style="width:6px;height:6px;background:var(--gold);border-radius:50%;animation:pulse 1s infinite;"></span>
        <span class="typing-dot" style="width:6px;height:6px;background:var(--gold);border-radius:50%;animation:pulse 1s infinite 0.2s;"></span>
        <span class="typing-dot" style="width:6px;height:6px;background:var(--gold);border-radius:50%;animation:pulse 1s infinite 0.4s;"></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    callback(typingDiv);
  }

  function preValidateQuery(text) {
    const lowerText = text.toLowerCase();
    return CAFE_KEYWORDS.some(keyword => lowerText.includes(keyword));
  }

  async function processUserQuestion(questionText) {
    appendChatMessage('user', questionText);

    const suggestionsBox = document.getElementById('chatSuggestionsBox');
    if (suggestionsBox) {
      suggestionsBox.style.display = 'none';
    }

    if (!preValidateQuery(questionText)) {
      appendChatMessage('bot', "I'm here to help with café-related questions only.");
      return;
    }

    showBotTyping(async (typingDiv) => {
      let botResponse = null;

      try {
        botResponse = await callGroqChatProxy(questionText);
      } catch (err) {
        console.warn('Groq Chat Proxy error:', err);
        let errorNotice = '';

        if (err.code === 'MISSING_API_KEY') {
          errorNotice = `<div class="chat-error-banner"><strong>⚠️ Missing API Key:</strong> GROQ_API_KEY is missing in .env file. Showing local answer:</div>`;
        } else if (err.code === 'INVALID_API_KEY') {
          errorNotice = `<div class="chat-error-banner"><strong>⚠️ Invalid API Key:</strong> GROQ_API_KEY in .env is invalid. Showing local answer:</div>`;
        } else {
          errorNotice = `<div class="chat-error-banner"><strong>⚠️ API Error:</strong> Unable to reach Groq server (${err.message || 'Request failed'}). Showing local answer:</div>`;
        }

        botResponse = errorNotice + getLocalBotAnswer(questionText);
      }

      if (typingDiv) typingDiv.remove();
      appendChatMessage('bot', botResponse);
    });
  }

  // Initial suggestions load
  refreshSuggestions();

  // Handle chat form submit
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      processUserQuestion(text);
    });
  }

  /* ── 11. SCROLL REVEAL OBSERVER ── */
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0, 0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

    if (el.classList.contains('reveal-left')) {
      el.style.transform = 'translateX(-40px)';
    } else if (el.classList.contains('reveal-right')) {
      el.style.transform = 'translateX(40px)';
    } else if (el.classList.contains('reveal-up')) {
      el.style.transform = 'translateY(40px)';
    }

    revealObserver.observe(el);
  });

});
