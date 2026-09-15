/**
 * STACKLY SPORTS - CART & CHECKOUT CONTROLLER
 * Full Cart Page, Indian Checkout, Promo Codes & Payment Simulators
 */

let appliedDiscountPercent = 0;

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-page-table")) {
    renderFullCartPage();
    initPromoCode();
  }

  if (document.getElementById("checkout-page-form")) {
    initCheckoutPage();
  }
});

/* ==========================================================================
   FULL CART PAGE LOGIC
   ========================================================================== */
function renderFullCartPage() {
  const tableBody = document.getElementById("cart-table-tbody");
  const subtotalEl = document.getElementById("cart-summary-subtotal");
  const discountEl = document.getElementById("cart-summary-discount");
  const shippingEl = document.getElementById("cart-summary-shipping");
  const totalEl = document.getElementById("cart-summary-total");
  const emptyState = document.getElementById("cart-empty-state");
  const cartContent = document.getElementById("cart-main-content");

  const cart = Store.getCart();

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (cartContent) cartContent.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  let html = "";
  cart.forEach(item => {
    html += `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 70px; height: 70px; background: var(--bg-card-muted); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; padding: 6px;">
              <img src="${item.image}" alt="${item.name}" style="max-height: 100%; object-fit: contain;">
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--text-primary);">${item.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Size: <strong>${item.selectedSize}</strong> | ${item.category}</div>
              <button onclick="handleCartPageRemove('${item.id}', '${item.selectedSize}')" style="color: #ef4444; font-size: 0.78rem; font-weight: 600; margin-top: 4px; background: none; border: none; cursor: pointer;">Remove</button>
            </div>
          </div>
        </td>
        <td><strong>${Store.formatINR(item.price)}</strong></td>
        <td>
          <div class="qty-control" style="width: fit-content;">
            <button class="qty-btn" onclick="handleCartPageQty('${item.id}', '${item.selectedSize}', -1)">-</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" onclick="handleCartPageQty('${item.id}', '${item.selectedSize}', 1)">+</button>
          </div>
        </td>
        <td><strong style="font-size: 1.05rem;">${Store.formatINR(item.price * item.qty)}</strong></td>
      </tr>
    `;
  });

  if (tableBody) tableBody.innerHTML = html;

  // Calculate pricing breakdown
  const subtotal = Store.getCartSubtotal();
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  if (subtotalEl) subtotalEl.textContent = Store.formatINR(subtotal);
  if (discountEl) discountEl.textContent = discountAmount > 0 ? `-${Store.formatINR(discountAmount)}` : "₹0";
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : Store.formatINR(shipping);
  if (totalEl) totalEl.textContent = Store.formatINR(total);
}

window.handleCartPageQty = function(id, size, delta) {
  Store.updateQuantity(id, size, delta);
  renderFullCartPage();
  if (window.updateAllProductCardQuantities) window.updateAllProductCardQuantities();
  if (window.renderCartDrawerItems) window.renderCartDrawerItems();
};

window.handleCartPageRemove = function(id, size) {
  Store.removeFromCart(id, size);
  renderFullCartPage();
  if (window.updateAllProductCardQuantities) window.updateAllProductCardQuantities();
  if (window.renderCartDrawerItems) window.renderCartDrawerItems();
  showToast("Item removed from cart", "info");
};

function initPromoCode() {
  const promoInput = document.getElementById("promo-input");
  const promoBtn = document.getElementById("promo-apply-btn");
  const promoMsg = document.getElementById("promo-message");

  if (!promoBtn) return;

  promoBtn.addEventListener("click", () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === "STACKLY10") {
      appliedDiscountPercent = 10;
      if (promoMsg) {
        promoMsg.textContent = "Code STACKLY10 applied! 10% Instant Discount.";
        promoMsg.style.color = "var(--accent-green)";
      }
      showToast("Coupon STACKLY10 Applied (10% Off)!", "success");
      renderFullCartPage();
    } else if (code === "INDRA20") {
      appliedDiscountPercent = 20;
      if (promoMsg) {
        promoMsg.textContent = "🎉 Code INDRA20 applied! 20% Special Discount.";
        promoMsg.style.color = "var(--accent-green)";
      }
      showToast("Coupon INDRA20 Applied (20% Off)!", "success");
      renderFullCartPage();
    } else {
      if (promoMsg) {
        promoMsg.textContent = "Invalid promo code. Try 'STACKLY10' or 'INDRA20'.";
        promoMsg.style.color = "#ef4444";
      }
      showToast("Invalid promo code", "warn");
    }
  });
}

/* ==========================================================================
   CHECKOUT PAGE LOGIC
   ========================================================================== */
function initCheckoutPage() {
  const form = document.getElementById("checkout-page-form");
  const orderSummaryList = document.getElementById("checkout-order-items");
  const checkoutSubtotalEl = document.getElementById("checkout-subtotal");
  const checkoutTotalEl = document.getElementById("checkout-total");
  const paymentTabs = document.querySelectorAll(".payment-method-tab");
  const paymentSections = document.querySelectorAll(".payment-method-panel");

  const cart = Store.getCart();

  if (cart.length === 0) {
    showToast("Your cart is empty! Redirecting to shop...", "info");
    setTimeout(() => window.location.href = "new-in.html", 1500);
    return;
  }

  // Render items in summary
  if (orderSummaryList) {
    let html = "";
    cart.forEach(item => {
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: var(--bg-card-muted); border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; padding: 4px;">
              <img src="${item.image}" alt="${item.name}" style="max-height: 100%; object-fit: contain;">
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary);">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Size: ${item.selectedSize} × ${item.qty}</div>
            </div>
          </div>
          <div style="font-weight: 800; font-size: 0.92rem;">${Store.formatINR(item.price * item.qty)}</div>
        </div>
      `;
    });
    orderSummaryList.innerHTML = html;
  }

  const subtotal = Store.getCartSubtotal();
  const total = subtotal; // Assuming free express shipping
  if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = Store.formatINR(subtotal);
  if (checkoutTotalEl) checkoutTotalEl.textContent = Store.formatINR(total);

  // Payment tab switching
  paymentTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      paymentTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      paymentSections.forEach(sec => {
        sec.style.display = sec.id === target ? "block" : "none";
      });
    });
  });

  // Pre-fill user data if logged in
  const currentUser = Store.getCurrentUser();
  if (currentUser) {
    const nameField = document.getElementById("checkout-name");
    const emailField = document.getElementById("checkout-email");
    const phoneField = document.getElementById("checkout-phone");
    if (nameField && currentUser.name) nameField.value = currentUser.name;
    if (emailField && currentUser.email) emailField.value = currentUser.email;
    if (phoneField && currentUser.phone) phoneField.value = currentUser.phone;
  }

  // Handle Order Submit
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("checkout-name").value.trim();
      const email = document.getElementById("checkout-email").value.trim();
      const phone = document.getElementById("checkout-phone").value.trim();
      const address = document.getElementById("checkout-address").value.trim();
      const city = document.getElementById("checkout-city").value.trim();
      const state = document.getElementById("checkout-state").value;
      const pincode = document.getElementById("checkout-pincode").value.trim();

      const activePayTab = document.querySelector(".payment-method-tab.active");
      const paymentMethod = activePayTab ? activePayTab.textContent.trim() : "UPI";

      if (!name || !email || !phone || !address || !pincode) {
        showToast("Please fill all shipping details", "warn");
        return;
      }

      const orderId = "STK-IND-" + Math.floor(10000 + Math.random() * 90000);
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        address: `${address}, ${city}, ${state} - ${pincode}`,
        city: `${city}, ${state}`,
        pincode: pincode,
        items: cart,
        total: total,
        status: "processing",
        paymentMethod: paymentMethod
      };

      Store.addOrder(newOrder);

      // Show celebration and redirect
      showToast(`🎉 Order #${orderId} Placed Successfully!`, "success");
      setTimeout(() => {
        window.location.href = "customer-dashboard.html?placed=" + orderId;
      }, 1500);
    });
  }
}
