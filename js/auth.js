/**
 * STACKLY SPORTS - AUTHENTICATION LOGIC (LOGIN & SIGNUP)
 * Customer Auth & Admin Portal Authentication
 */

document.addEventListener("DOMContentLoaded", () => {
  initAuthRoleSwitch();
  initLoginForm();
  initSignupForm();
});

/**
 * Extract and format human-friendly name from email / gmail address
 * Example: 'alex.smith@gmail.com' -> 'Alex Smith'
 * Example: 'virat_kohli@gmail.com' -> 'Virat Kohli'
 * Example: 'karan@gmail.com' -> 'Karan'
 */
function getNameFromEmail(email) {
  if (!email || !email.includes("@")) return "Athlete";
  const localPart = email.split("@")[0];
  const parts = localPart.split(/[._\-+]+/).filter(Boolean);
  if (parts.length === 0) return "Athlete";
  return parts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function getInitials(name) {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function initAuthRoleSwitch() {
  const customerTab = document.getElementById("tab-customer");
  const adminTab = document.getElementById("tab-admin");
  const roleInput = document.getElementById("auth-role-input");
  const submitBtn = document.getElementById("auth-submit-btn");
  const authTitle = document.getElementById("auth-form-title");
  const authSub = document.getElementById("auth-form-sub");

  if (!customerTab || !adminTab) return;

  customerTab.addEventListener("click", () => {
    customerTab.classList.add("active");
    adminTab.classList.remove("active");
    if (roleInput) roleInput.value = "customer";
    if (submitBtn) {
      submitBtn.classList.remove("admin-mode");
      submitBtn.innerHTML = `<span>Sign In as Customer</span> <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    }
    if (authTitle) authTitle.textContent = "Customer Sign In";
    if (authSub) authSub.textContent = "Access your orders, wishlist, and fast checkout";
  });

  adminTab.addEventListener("click", () => {
    adminTab.classList.add("active");
    customerTab.classList.remove("active");
    if (roleInput) roleInput.value = "admin";
    if (submitBtn) {
      submitBtn.classList.add("admin-mode");
      submitBtn.innerHTML = `<span>Sign In to Admin Portal</span> <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    }
    if (authTitle) authTitle.textContent = "Staff & Admin Portal";
    if (authSub) authSub.textContent = "Manage store inventory, orders, and ₹ sales analytics";
  });
}

function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value.trim();
    const roleInput = document.getElementById("auth-role-input");
    const role = roleInput ? roleInput.value : "customer";

    if (!email || !password) {
      showToast("Please enter both email and password", "warn");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showToast("Please enter a valid email address", "warn");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long", "warn");
      return;
    }

    const derivedName = getNameFromEmail(email);

    if (role === "admin") {
      const adminUser = {
        id: "adm-" + Date.now(),
        name: derivedName,
        email: email,
        password: password,
        role: "admin",
        avatar: getInitials(derivedName)
      };

      Store.setCurrentUser(adminUser);
      showToast(`Admin access granted for ${derivedName}! Redirecting...`, "success");
      setTimeout(() => {
        window.location.href = "admin-dashboard.html";
      }, 800);
    } else {
      const existingUsers = JSON.parse(localStorage.getItem("stackly_users") || "[]");
      let matchedIndex = existingUsers.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      let userObj;

      if (matchedIndex > -1) {
        existingUsers[matchedIndex].password = password;
        existingUsers[matchedIndex].name = derivedName;
        existingUsers[matchedIndex].email = email;
        userObj = existingUsers[matchedIndex];
      } else {
        userObj = {
          id: "cust-" + Date.now(),
          name: derivedName,
          email: email,
          password: password,
          phone: "+91 98765 43210",
          city: "India",
          role: "customer",
          registeredAt: new Date().toLocaleDateString('en-IN')
        };
        existingUsers.push(userObj);
      }

      localStorage.setItem("stackly_users", JSON.stringify(existingUsers));
      Store.setCurrentUser(userObj);
      showToast(`Welcome back, ${derivedName}! Redirecting...`, "success");
      setTimeout(() => {
        window.location.href = "customer-dashboard.html";
      }, 800);
    }
  });
}

function initSignupForm() {
  const form = document.getElementById("signup-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const city = document.getElementById("signup-city").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();

    if (!email || !password) {
      showToast("Please fill all required fields", "warn");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showToast("Please enter a valid email address", "warn");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "warn");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long", "warn");
      return;
    }

    const derivedName = getNameFromEmail(email) || fullName || "Athlete";

    const newUser = {
      id: "cust-" + Date.now(),
      name: derivedName,
      fullNameEntered: fullName || derivedName,
      email: email,
      phone: phone ? (phone.startsWith("+91") ? phone : "+91 " + phone) : "+91 98765 43210",
      city: city || "India",
      role: "customer",
      password: password,
      registeredAt: new Date().toLocaleDateString('en-IN')
    };

    const users = JSON.parse(localStorage.getItem("stackly_users") || "[]");
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingIndex > -1) {
      users[existingIndex] = newUser;
    } else {
      users.push(newUser);
    }
    localStorage.setItem("stackly_users", JSON.stringify(users));

    Store.setCurrentUser(newUser);
    showToast(`Registration successful! Welcome, ${derivedName}.`, "success");
    setTimeout(() => {
      window.location.href = "customer-dashboard.html";
    }, 1000);
  });
}
