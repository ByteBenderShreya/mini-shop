// js/api.js
const API_URL = 'https://fakestoreapi.com';

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return await res.json();
}
