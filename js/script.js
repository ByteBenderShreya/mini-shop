// 1. Cart array localStorage se load karo
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 2. Navbar cart count update karo
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  if(cartCount) cartCount.textContent = totalItems;
}

// 3. Add to Cart function
function addToCart(productId, name, price, image) {
  const existing = cart.find(item => item.id === productId);
  
  if(existing) {
    existing.qty += 1; // already hai to +1 kar do
  } else {
    cart.push({id: productId, name, price, image, qty: 1});
  }
  
  // Save karo localStorage mein
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Navbar update karo
  updateCartCount();
  
  // Toast dikhao
  alert(`Added ${name} to cart! 🛒`);
}

// Page load pe cart count dikhao
updateCartCount();
