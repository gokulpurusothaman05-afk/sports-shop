/**
 * STACKLY SPORTS - MAIN JAVASCRIPT
 * Header, Cart Drawer, Search, Toast, Scroll Animations, Tilt & 404 Interceptor
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCartDrawer();
  initSearchModal();
  initDeadLinksInterceptor();
  initForms404Interceptor();
  initScrollAnimations();
  initCardTiltEffects();
  initAuthUI();
  Store.updateCartCountUI();
  Store.updateWishlistCountUI();
  updateAllProductCardQuantities();
});

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const iconSvg = type === "success" 
    ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `<span>${iconSvg}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.35s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* ==========================================================================
   HEADER & MOBILE MENU
   ========================================================================== */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Mobile menu toggle
  const mobileBtn = document.querySelector(".mobile-menu-toggle");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  const mobileOverlay = document.querySelector(".mobile-nav-overlay");
  const mobileClose = document.querySelector(".mobile-nav-close");

  if (mobileBtn && mobileDrawer && mobileOverlay) {
    mobileBtn.addEventListener("click", () => {
      mobileDrawer.classList.add("active");
      mobileOverlay.classList.add("active");
    });

    const closeMobileMenu = () => {
      mobileDrawer.classList.remove("active");
      mobileOverlay.classList.remove("active");
    };

    if (mobileClose) mobileClose.addEventListener("click", closeMobileMenu);
    mobileOverlay.addEventListener("click", closeMobileMenu);
  }
}

/* ==========================================================================
   AUTH UI IN HEADER (LOGIN VS DASHBOARD)
   ========================================================================== */
function initAuthUI() {
  const accountBtn = document.querySelector(".header-account-btn");
  const user = Store.getCurrentUser();

  if (accountBtn) {
    if (user) {
      const displayName = user.name || (user.email ? user.email.split('@')[0] : 'Account');
      const firstName = displayName.split(' ')[0];
      accountBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span>${user.role === 'admin' ? 'Admin Hub' : firstName}</span>
      `;
      accountBtn.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
    } else {
      accountBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Sign In</span>
      `;
      accountBtn.href = 'login.html';
    }
  }
}

/* ==========================================================================
   SLIDE-IN CART DRAWER
   ========================================================================== */
function initCartDrawer() {
  const cartTriggerBtns = document.querySelectorAll(".cart-drawer-trigger");
  const cartDrawer = document.querySelector(".cart-drawer");
  const cartOverlay = document.querySelector(".cart-drawer-overlay");
  const cartCloseBtn = document.querySelector(".cart-drawer-close-btn");

  if (!cartDrawer || !cartOverlay) return;

  const openCart = (e) => {
    if (e) e.preventDefault();
    renderCartDrawerItems();
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  cartTriggerBtns.forEach(btn => btn.addEventListener("click", openCart));
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Global helper to open cart from any script
  window.openCartDrawer = openCart;
}

function renderCartDrawerItems() {
  const itemsContainer = document.querySelector(".cart-drawer-items");
  const subtotalEl = document.querySelector(".cart-drawer-subtotal");
  if (!itemsContainer) return;

  const cart = Store.getCart();

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <svg style="width: 54px; height: 54px; margin: 0 auto 16px auto; opacity: 0.4;" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <h4 style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary); margin-bottom: 6px;">Your Bag is Empty</h4>
        <p style="font-size: 0.88rem; margin-bottom: 20px;">Explore our high-performance gear and add items to your cart.</p>
        <a href="new-in.html" class="action-btn-sm" style="display: inline-block; padding: 10px 24px; background: var(--accent-black); color: #fff; border-radius: var(--radius-full);">Explore New Arrivals</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = Store.formatINR(0);
    return;
  }

  let html = "";
  cart.forEach(item => {
    html += `
      <div class="cart-drawer-item">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.selectedSize} | ${item.category}</div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="handleDrawerQty('${item.id}', '${item.selectedSize}', -1)">-</button>
              <span class="qty-number">${item.qty}</span>
              <button class="qty-btn" onclick="handleDrawerQty('${item.id}', '${item.selectedSize}', 1)">+</button>
            </div>
            <div class="cart-item-price">${Store.formatINR(item.price * item.qty)}</div>
          </div>
          <button class="cart-item-remove-btn" onclick="handleDrawerRemove('${item.id}', '${item.selectedSize}')">Remove item</button>
        </div>
      </div>
    `;
  });

  itemsContainer.innerHTML = html;
  if (subtotalEl) {
    subtotalEl.textContent = Store.formatINR(Store.getCartSubtotal());
  }
}

window.handleDrawerQty = function(id, size, delta) {
  Store.updateQuantity(id, size, delta);
  renderCartDrawerItems();
  if (window.updateAllProductCardQuantities) window.updateAllProductCardQuantities();
  if (window.renderFullCartPage) window.renderFullCartPage();
};

window.handleDrawerRemove = function(id, size) {
  Store.removeFromCart(id, size);
  renderCartDrawerItems();
  if (window.updateAllProductCardQuantities) window.updateAllProductCardQuantities();
  if (window.renderFullCartPage) window.renderFullCartPage();
  showToast("Item removed from bag", "info");
};

/* ==========================================================================
   LIVE SEARCH MODAL
   ========================================================================== */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll(".search-modal-trigger");
  const modal = document.querySelector(".search-modal-overlay");
  const closeBtn = document.querySelector(".search-close-btn");
  const input = document.querySelector(".search-input-field");
  const resultsContainer = document.querySelector(".search-results-area");

  if (!modal) return;

  searchTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      if (input) {
        input.value = "";
        setTimeout(() => input.focus(), 100);
        renderSearchResults("");
      }
    });
  });

  const closeModal = () => modal.classList.remove("active");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (input) {
    input.addEventListener("input", (e) => {
      renderSearchResults(e.target.value.trim());
    });
  }

  function renderSearchResults(query) {
    if (!resultsContainer) return;
    const products = Store.getProducts();

    if (!query) {
      resultsContainer.innerHTML = `
        <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">
          Trending Searches
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="product-detail.html?id=sp-101" class="action-btn-sm" style="border-radius: var(--radius-full);">Jordan Why Not 6</a>
          <a href="product-detail.html?id=sp-106" class="action-btn-sm" style="border-radius: var(--radius-full);">Cricket Spikes</a>
          <a href="product-detail.html?id=sp-108" class="action-btn-sm" style="border-radius: var(--radius-full);">English Willow Bat</a>
          <a href="product-detail.html?id=sp-105" class="action-btn-sm" style="border-radius: var(--radius-full);">Deldor Shoes Air</a>
        </div>
      `;
      return;
    }

    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.sport.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <p style="text-align: center; padding: 20px; color: var(--text-muted);">No sports gear found for "<strong>${query}</strong>". Try searching for 'Jordan', 'Cricket', or 'Running'.</p>
      `;
      return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
    filtered.forEach(p => {
      html += `
        <a href="product-detail.html?id=${p.id}" style="display: flex; align-items: center; gap: 14px; padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); transition: var(--transition-fast);">
          <div style="width: 50px; height: 50px; background: var(--bg-card-muted); border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; padding: 4px;">
            <img src="${p.image}" alt="${p.name}" style="max-height: 100%; object-fit: contain;">
          </div>
          <div style="flex: 1;">
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">${p.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${p.category}</div>
          </div>
          <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-primary);">${Store.formatINR(p.price)}</div>
        </a>
      `;
    });
    html += '</div>';
    resultsContainer.innerHTML = html;
  }
}

/* ==========================================================================
   404 REDIRECTION FOR UNLINKED / PLACEHOLDER BUTTONS
   (User requirement: "redirect all unwanted and unrelated links in websit eto 404 page like media buttons and page buttons tht dosent have redriection links")
   ========================================================================== */
function initDeadLinksInterceptor() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    
    // Ignore links that trigger javascript actions, mailto, tel, or valid pages
    if (!href || href === "#" || href === "javascript:void(0)" || href === "" || href === "#!") {
      // Check if it's a dedicated JS trigger like cart drawer or modal
      if (link.classList.contains("cart-drawer-trigger") || 
          link.classList.contains("search-modal-trigger") ||
          link.classList.contains("mobile-menu-toggle") ||
          link.hasAttribute("onclick")) {
        return;
      }
      
      e.preventDefault();
      window.location.href = "404.html";
    }
  });
}

/* ==========================================================================
   404 REDIRECTION FOR FORMS (EXCEPT SIGN IN & SIGN UP)
   Redirect all forms to 404 after getting valid information
   ========================================================================== */
function initForms404Interceptor() {
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!form || form.tagName !== "FORM") return;

    // Preserve Sign In and Sign Up authentication forms
    if (
      form.id === "login-form" ||
      form.id === "signup-form" ||
      window.location.pathname.toLowerCase().endsWith("login.html") ||
      window.location.pathname.toLowerCase().endsWith("signup.html")
    ) {
      return;
    }

    e.preventDefault();

    // Check if form inputs are valid
    if (form.checkValidity()) {
      window.location.href = "404.html";
    } else {
      form.reportValidity();
    }
  }, true);
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3D CARD TILT EFFECTS
   ========================================================================== */
function initCardTiltEffects() {
  const tiltCards = document.querySelectorAll(".tilt-effect");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });
}

/* ==========================================================================
   PRODUCT CARD QUANTITY MANAGEMENT & ACTIONS (PLUS / MINUS BUTTONS)
   ========================================================================== */

/**
 * Generates HTML for product card action button or interactive stepper
 */
window.renderCardActionHtml = function(productId, isMini = false) {
  const qty = Store.getProductCartQty(productId);
  if (qty > 0) {
    return `
      <div class="card-qty-control" onclick="event.stopPropagation()">
        <button type="button" class="card-qty-btn card-qty-minus" onclick="handleCardQty('${productId}', -1, event)" title="Decrease Quantity" aria-label="Decrease quantity">−</button>
        <span class="card-qty-value">${qty}</span>
        <button type="button" class="card-qty-btn card-qty-plus" onclick="handleCardQty('${productId}', 1, event)" title="Increase Quantity" aria-label="Increase quantity">+</button>
      </div>
    `;
  }
  return `
    <button type="button" class="${isMini ? 'quick-add-btn' : 'card-add-bag-btn'}" onclick="handleCardAdd('${productId}', event)" title="Add to Bag" aria-label="Add to Bag">
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </button>
  `;
};

/**
 * Updates all product card action buttons/steppers across the active page
 */
window.updateAllProductCardQuantities = function() {
  document.querySelectorAll(".card-action-box[data-product-id]").forEach(el => {
    const pId = el.getAttribute("data-product-id");
    if (pId) {
      el.innerHTML = window.renderCardActionHtml(pId, false);
    }
  });
  document.querySelectorAll(".quick-add-box[data-product-id]").forEach(el => {
    const pId = el.getAttribute("data-product-id");
    if (pId) {
      el.innerHTML = window.renderCardActionHtml(pId, true);
    }
  });
};

/**
 * Direct Add from Product Card (sets qty to 1 and transforms button into stepper)
 */
window.handleCardAdd = function(productId, e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const product = Store.getProductById(productId);
  if (product) {
    Store.addToCart(product, null, 1);
    showToast(`Added ${product.name} to Bag!`, "success");
    window.updateAllProductCardQuantities();
    if (window.renderCartDrawerItems) window.renderCartDrawerItems();
    if (window.renderFullCartPage) window.renderFullCartPage();
  }
};

/**
 * Interactive Plus (+) and Minus (-) stepper handler on product cards
 */
window.handleCardQty = function(productId, delta, e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const product = Store.getProductById(productId);
  if (!product) return;

  Store.updateProductQuantity(productId, delta);
  const newQty = Store.getProductCartQty(productId);

  if (newQty <= 0) {
    showToast(`Removed ${product.name} from Bag`, "info");
  } else if (delta > 0) {
    showToast(`Added another ${product.name} (${newQty} in Bag)`, "success");
  } else {
    showToast(`Decreased ${product.name} quantity (${newQty} in Bag)`, "info");
  }

  window.updateAllProductCardQuantities();
  if (window.renderCartDrawerItems) window.renderCartDrawerItems();
  if (window.renderFullCartPage) window.renderFullCartPage();
};

/**
 * Global quick add compatibility
 */
window.quickAddToCart = function(productId, e) {
  window.handleCardAdd(productId, e);
};

/* ==========================================================================
   GLOBAL WISHLIST HELPER
   ========================================================================== */
window.toggleWishlistProduct = function(productId, btnEl, e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const added = Store.toggleWishlist(productId);
  if (btnEl) {
    btnEl.classList.toggle("active", added);
  }
  showToast(added ? "Added to Wishlist!" : "Removed from Wishlist", added ? "success" : "info");
};
