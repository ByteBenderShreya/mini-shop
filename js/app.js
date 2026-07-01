import { router } from './router.js';
import { fetchProducts } from './api.js';

const pages = {
    home: {
        template: `
            <div class="page-content">
                <h1 class="page-title">Welcome to Mini Shop</h1>
                <p style="text-align: center; margin-bottom: 2rem;">Discover amazing products at unbeatable prices</p>
                <div style="text-align: center;">
                    <a href="#/products" class="btn">Browse Products</a>
                </div>
            </div>
        `
    },
    products: {
        template: `
            <div class="page-content">
                <h1 class="page-title">Our Products</h1>
                <div id="products-container" class="loading">Loading products...</div>
            </div>
        `,
        init: async () => {
            const container = document.getElementById('products-container');
            const products = await fetchProducts();
            
            if (products.length === 0) {
                container.innerHTML = '<p style="text-align:center;">Failed to load products</p>';
                return;
            }
            
            container.classList.remove('loading');
            container.innerHTML = `
                <div class="products-grid">
                    ${products.map(product => `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.title}" class="product-image">
                            <h3 class="product-title">${product.title}</h3>
                            <p class="product-price">$${product.price}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    },
    about: {
        template: `
            <div class="page-content">
                <h1 class="page-title">About Mini Shop</h1>
                <p style="text-align: center; line-height: 1.8;">
                    Mini Shop is a capstone project demonstrating modern web development practices.<br><br>
                    Built with HTML5, CSS3, and Vanilla JavaScript ES6+.<br>
                    Features client-side routing, modular architecture, and API integration.<br><br>
                    <strong>Tech Stack:</strong> Vanilla JS, FakeStore API, Netlify
                </p>
            </div>
        `
    },
    // ✅ YE ADD KAR - 404 ROUTE MISSING THA
    '/404': {
        template: `
            <div class="page-content">
                <h1 class="page-title">404 - Page Not Found</h1>
                <p style="text-align: center;">Oops! This page doesn't exist.</p>
                <div style="text-align: center; margin-top: 2rem;">
                    <a href="#/" class="btn">Go Home</a>
                </div>
            </div>
        `
    }
};

router.addRoute('/', () => {
    document.getElementById('app').innerHTML = pages.home.template;
});

router.addRoute('/products', async () => {
    document.getElementById('app').innerHTML = pages.products.template;
    const products = await fetchProducts(); // API call yahan
    // products ko render karne ka code yahan
});

router.addRoute('/about', () => {
    document.getElementById('app').innerHTML = pages.about.template;
});

router.addRoute('/404', () => {
    document.getElementById('app').innerHTML = pages['/404'].template;
});

router.init();

