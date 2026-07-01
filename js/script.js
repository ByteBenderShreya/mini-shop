let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const count = document.getElementById('cart-count');
  if(count) {
    count.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    count.classList.add('animate');
    setTimeout(() => count.classList.remove('animate'), 500);
  }
}

function addToCart(id, name, price, image) {
  let item = cart.find(i => i.id === id);
  if(item) item.qty++;
  else cart.push({id, name, price, image, qty: 1});
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart! 🛒`);
}

updateCartCount();
