// Cart ko localStorage se uthao, nahi to khali array
let cart = JSON.parse(localStorage.getItem('minishop_cart')) || [];

// Page load pe cart count update
updateCartCount();

// Add to Cart Function
function addToCart(id, name, price, img, event) {
  const btn = event.target;
  const originalText = btn.innerText;

  // Button pe "Adding..." animation
  btn.innerText = "Adding...";
  btn.disabled = true;

  setTimeout(() => {
    // Check karo item pehle se cart mein hai kya
    const existingItem = cart.find(item => item.id === id);

    if(existingItem) {
      existingItem.qty += 1; // Quantity +1
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }

    // LocalStorage mein save kar do - refresh pe bhi nahi udega
    localStorage.setItem('minishop_cart', JSON.stringify(cart));

    // Count update + Toast
    updateCartCount();
    showToast(`${name} Added to Cart! 🛒`);

    // Button wapas normal
    btn.innerText = "Added ✓";
    btn.style.background = "#4caf50";

    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
      btn.disabled = false;
    }, 1500);

  }, 500); // 0.5 sec loading feel ke liye
}

// Cart Count Update Karo Navbar Mein
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById('cart-count');
  if(cartCount) {
    cartCount.innerText = totalQty;
    cartCount.style.transform = "scale(1.4)";
    setTimeout(() => cartCount.style.transform = "scale(1)", 300);
  }
}

// Toast Notification - "Added to Cart!" popup
function showToast(msg) {
  const toast = document.createElement('div');
  toast.innerText = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #333;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideIn 0.3s;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// CSS Animation
const style = document.createElement('style');
style.innerHTML = `@keyframes slideIn { from { transform: translateX(400px); opacity:0; } to { transform: translateX(0); opacity:1; }`;
document.head.appendChild(style);
