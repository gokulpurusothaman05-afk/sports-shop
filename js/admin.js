/**
 * STACKLY SPORTS - ADMIN DASHBOARD LOGIC
 * Revenue Analytics, Order Management, Product Inventory CRUD
 */

document.addEventListener("DOMContentLoaded", () => {
  verifyAdminAuth();
  renderAdminMetrics();
  renderAdminOrdersTable();
  renderAdminInventoryTable();
  initAdminModal();
});

function verifyAdminAuth() {
  const user = Store.getCurrentUser();
  if (!user || user.role !== "admin") {
    // If not admin, redirect to login with notification
    window.location.href = "login.html";
    return;
  }
  const displayEl = document.getElementById("admin-user-display");
  if (displayEl) {
    const adminName = user.name || (user.email ? user.email.split('@')[0] : 'Admin');
    displayEl.innerHTML = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>${adminName}</span>`;
  }
}

function renderAdminMetrics() {
  const orders = Store.getOrders();
  const products = Store.getProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const activeProducts = products.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const revEl = document.getElementById("admin-metric-revenue");
  const ordEl = document.getElementById("admin-metric-orders");
  const prodEl = document.getElementById("admin-metric-products");
  const aovEl = document.getElementById("admin-metric-aov");

  if (revEl) revEl.textContent = Store.formatINR(totalRevenue);
  if (ordEl) ordEl.textContent = totalOrders;
  if (prodEl) prodEl.textContent = activeProducts;
  if (aovEl) aovEl.textContent = Store.formatINR(avgOrderValue);
}

function renderAdminOrdersTable() {
  const tbody = document.getElementById("admin-orders-tbody");
  if (!tbody) return;

  const orders = Store.getOrders();
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No orders found</td></tr>`;
    return;
  }

  let html = "";
  orders.forEach(order => {
    html += `
      <tr>
        <td><strong>#${order.id}</strong></td>
        <td>
          <div style="font-weight: 700;">${order.customerName}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${order.customerEmail || order.city}</div>
        </td>
        <td>${order.date}</td>
        <td>${order.items.map(i => `${i.name} (${i.qty})`).join(', ')}</td>
        <td><strong>${Store.formatINR(order.total)}</strong></td>
        <td>
          <span class="dash-status-pill ${order.status}">${order.status}</span>
        </td>
        <td>
          <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 4px 8px; border-radius: var(--radius-xs); border: 1px solid var(--border-light); font-size: 0.8rem; font-weight: 600;">
            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.updateOrderStatus = function(orderId, newStatus) {
  const orders = Store.getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    Store.saveOrders(orders);
    renderAdminOrdersTable();
    showToast(`Order #${orderId} status updated to ${newStatus.toUpperCase()}`, "success");
  }
};

function renderAdminInventoryTable() {
  const tbody = document.getElementById("admin-inventory-tbody");
  if (!tbody) return;

  const products = Store.getProducts();
  let html = "";

  products.forEach(p => {
    html += `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; background: var(--bg-card-muted); border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; padding: 4px;">
              <img src="${p.image}" alt="${p.name}" style="max-height: 100%; object-fit: contain;">
            </div>
            <div>
              <div style="font-weight: 700;">${p.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${p.category}</div>
            </div>
          </div>
        </td>
        <td>${p.sport || 'Sports'}</td>
        <td><strong>${Store.formatINR(p.price)}</strong></td>
        <td><span style="font-weight: 700; color: ${p.stock < 15 ? '#ef4444' : 'var(--text-primary)'};">${p.stock} units</span></td>
        <td><span class="dash-status-pill ${p.stock > 0 ? 'delivered' : 'cancelled'}">${p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
        <td>
          <div style="display: flex; gap: 8px;">
            <button class="action-btn-sm" onclick="editProduct('${p.id}')">Edit</button>
            <button class="action-btn-sm" onclick="deleteProduct('${p.id}')" style="color: #ef4444;">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function initAdminModal() {
  const modal = document.getElementById("product-modal");
  const openAddBtn = document.getElementById("btn-add-product");
  const closeBtn = document.getElementById("btn-close-modal");
  const form = document.getElementById("admin-product-form");

  if (!modal) return;

  if (openAddBtn) {
    openAddBtn.addEventListener("click", () => {
      document.getElementById("modal-title").textContent = "Add New Sports Gear";
      if (form) form.reset();
      document.getElementById("prod-id-hidden").value = "";
      modal.classList.add("active");
    });
  }

  const closeModal = () => modal.classList.remove("active");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      window.location.href = "404.html";
    });
  }
}

window.editProduct = function(id) {
  const product = Store.getProductById(id);
  if (!product) return;

  document.getElementById("modal-title").textContent = "Edit Product: " + product.name;
  document.getElementById("prod-id-hidden").value = product.id;
  document.getElementById("prod-name").value = product.name;
  document.getElementById("prod-category").value = product.category;
  document.getElementById("prod-sport").value = product.sport || "Running";
  document.getElementById("prod-price").value = product.price;
  document.getElementById("prod-orig-price").value = product.originalPrice || product.price;
  document.getElementById("prod-stock").value = product.stock || 20;
  document.getElementById("prod-image").value = product.image;
  document.getElementById("prod-desc").value = product.description || "";

  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.add("active");
};

window.deleteProduct = function(id) {
  if (confirm("Are you sure you want to remove this product from inventory?")) {
    let products = Store.getProducts();
    products = products.filter(p => p.id !== id);
    Store.saveProducts(products);
    renderAdminInventoryTable();
    renderAdminMetrics();
    showToast("Product deleted from catalog", "info");
  }
};
