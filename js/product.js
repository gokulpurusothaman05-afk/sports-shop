/**
 * STACKLY SPORTS - PRODUCT DETAIL PAGE CONTROLLER
 * Dynamic product view, size selection, image zoom, PIN code delivery checker
 */

let currentSelectedSize = null;

document.addEventListener("DOMContentLoaded", () => {
  initProductDetailPage();
  initPincodeChecker();
});

function initProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "sp-101";
  const product = Store.getProductById(productId);

  if (!product) return;

  // Set Page Title
  document.title = `${product.name} | Stackly Sports India`;

  // Render elements
  const titleEl = document.getElementById("pdp-title");
  const categoryEl = document.getElementById("pdp-category");
  const priceEl = document.getElementById("pdp-price");
  const origPriceEl = document.getElementById("pdp-orig-price");
  const descEl = document.getElementById("pdp-description");
  const mainImgEl = document.getElementById("pdp-main-img");
  const badgeEl = document.getElementById("pdp-badge");
  const ratingValEl = document.getElementById("pdp-rating-val");
  const reviewsCountEl = document.getElementById("pdp-reviews-count");
  const sizesContainer = document.getElementById("pdp-sizes-container");
  const breadcrumbName = document.getElementById("pdp-breadcrumb-name");

  if (titleEl) titleEl.textContent = product.name;
  if (categoryEl) categoryEl.textContent = `${product.sport} • ${product.category}`;
  if (priceEl) priceEl.textContent = Store.formatINR(product.price);
  if (origPriceEl) {
    if (product.originalPrice && product.originalPrice > product.price) {
      origPriceEl.textContent = Store.formatINR(product.originalPrice);
      origPriceEl.style.display = "inline";
    } else {
      origPriceEl.style.display = "none";
    }
  }
  if (descEl) descEl.textContent = product.description;
  if (mainImgEl) {
    mainImgEl.src = product.image;
    mainImgEl.alt = product.name;
  }
  if (badgeEl) badgeEl.textContent = product.badge || "★ Highly Rated";
  if (ratingValEl) ratingValEl.textContent = product.rating || "4.9";
  if (reviewsCountEl) reviewsCountEl.textContent = `(${product.reviewsCount || 120} reviews)`;
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // Render sizes
  if (sizesContainer && product.sizes) {
    let sizesHtml = "";
    product.sizes.forEach((size, idx) => {
      const isSelected = idx === 0 ? "active" : "";
      if (idx === 0) currentSelectedSize = size;
      sizesHtml += `
        <button type="button" class="pdp-size-btn ${isSelected}" onclick="selectProductSize('${size}', this)">
          ${size}
        </button>
      `;
    });
    sizesContainer.innerHTML = sizesHtml;
  }

  // Quantity Stepper (+ / -) in PDP
  const minusBtn = document.getElementById("pdp-qty-minus");
  const plusBtn = document.getElementById("pdp-qty-plus");
  const qtyInput = document.getElementById("pdp-qty-input");

  if (minusBtn && qtyInput) {
    minusBtn.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      val = Math.max(1, val - 1);
      qtyInput.value = val;
    });
  }

  if (plusBtn && qtyInput) {
    plusBtn.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      val = Math.min(10, val + 1);
      qtyInput.value = val;
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener("change", () => {
      let val = parseInt(qtyInput.value);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 10) val = 10;
      qtyInput.value = val;
    });
  }

  // Add to Bag Button
  const addToBagBtn = document.getElementById("pdp-add-bag-btn");
  if (addToBagBtn) {
    addToBagBtn.addEventListener("click", () => {
      const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;
      Store.addToCart(product, currentSelectedSize, qty);
      showToast(`Added ${qty} × ${product.name} (${currentSelectedSize || 'Standard'}) to Bag!`, "success");
      if (window.updateAllProductCardQuantities) window.updateAllProductCardQuantities();
      if (window.openCartDrawer) window.openCartDrawer();
    });
  }

  // Wishlist Button
  const pdpWishBtn = document.getElementById("pdp-wishlist-btn");
  if (pdpWishBtn) {
    pdpWishBtn.classList.toggle("active", Store.isInWishlist(product.id));
    pdpWishBtn.addEventListener("click", () => {
      const isAdded = Store.toggleWishlist(product.id);
      pdpWishBtn.classList.toggle("active", isAdded);
      showToast(isAdded ? "Added to Wishlist!" : "Removed from Wishlist", isAdded ? "success" : "info");
    });
  }

  renderRelatedProducts(product);
}

window.selectProductSize = function(size, btnEl) {
  currentSelectedSize = size;
  document.querySelectorAll(".pdp-size-btn").forEach(btn => btn.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
};

function initPincodeChecker() {
  const pinInput = document.getElementById("pincode-input");
  const checkBtn = document.getElementById("pincode-check-btn");
  const resultMsg = document.getElementById("pincode-result-msg");

  if (!checkBtn || !pinInput) return;

  const INDIAN_PIN_DATA = {
    "110001": { city: "New Delhi", time: "Tomorrow, by 2 PM", cod: true },
    "400001": { city: "Mumbai", time: "Within 24 Hours", cod: true },
    "560001": { city: "Bengaluru", time: "Tomorrow, by 5 PM", cod: true },
    "600001": { city: "Chennai", time: "2 Business Days", cod: true },
    "700001": { city: "Kolkata", time: "2-3 Business Days", cod: true },
    "500001": { city: "Hyderabad", time: "Tomorrow, by 6 PM", cod: true },
    "411001": { city: "Pune", time: "Within 24 Hours", cod: true },
    "380001": { city: "Ahmedabad", time: "2 Business Days", cod: true }
  };

  checkBtn.addEventListener("click", () => {
    const pin = pinInput.value.trim();
    if (pin.length !== 6 || isNaN(pin)) {
      if (resultMsg) {
        resultMsg.innerHTML = `<span style="color: #ef4444;">Please enter a valid 6-digit Indian PIN code.</span>`;
      }
      return;
    }

    const pinInfo = INDIAN_PIN_DATA[pin] || { city: "your location", time: "2-4 Business Days", cod: true };
    if (resultMsg) {
      resultMsg.innerHTML = `
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 10px 14px; margin-top: 10px;">
          <div style="color: #15803d; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
            Delivery Available to ${pinInfo.city} (${pin})
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">
            Estimated Delivery: <strong>${pinInfo.time}</strong> | Cash on Delivery: <strong>Eligible</strong>
          </div>
        </div>
      `;
    }
    showToast(`Delivery available to PIN ${pin}!`, "success");
  });
}

function renderRelatedProducts(currentProduct) {
  const container = document.getElementById("related-products-grid");
  if (!container) return;

  const products = Store.getProducts();
  const related = products.filter(p => p.id !== currentProduct.id).slice(0, 3);

  let html = "";
  related.forEach(p => {
    html += `
      <div class="product-card">
        <div class="product-card-top">
          <span class="card-pill-badge">${p.badge || '★ Highly Rated'}</span>
          <button class="wishlist-toggle-btn" onclick="toggleWishlistProduct('${p.id}', this, event)">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="product-image-container">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card-info">
          <a href="product-detail.html?id=${p.id}" class="product-card-title">${p.name}</a>
          <div class="product-card-category">${p.category}</div>
          <div class="product-card-bottom">
            <div class="product-price-box">
              <span class="current-price">${Store.formatINR(p.price)}</span>
              ${p.originalPrice ? `<span class="original-price">${Store.formatINR(p.originalPrice)}</span>` : ''}
            </div>
            <div class="card-action-box" data-product-id="${p.id}">
              ${window.renderCardActionHtml ? window.renderCardActionHtml(p.id) : `<button class="card-add-bag-btn" onclick="handleCardAdd('${p.id}', event)"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></button>`}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
