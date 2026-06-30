import Router from './router.js';

// Page Templates
const pages = {
    home: {
        template: `
            <div class="hero">
                <h1>Welcome to Mini Shop</h1>
                <p>Discover amazing products at unbeatable prices. Curated collection just for you.</p>
                <a href="#/products" class="btn">Explore Products →</a>
            </div>
            <div class="about-card">
                <h2>Why Mini Shop?</h2>
                <p>✨ Handpicked quality products from trusted sources</p>
                <p>🚀 Fast, modern, and responsive shopping experience</p>
                <p>💎 Built with vanilla JS - No frameworks, pure performance</p>
            </div>
        `,
        init: () => {}
    },
    
    products: {
        template: `
            <div class="hero" style="padding: 2rem;">
                <h1>Our Products</h1>
                <p>Browse through our exclusive collection</p>
            </div>
            <div id="product-list" class="product-grid">
                <div class="loading">Loading products...</div>
            </div>
        `,
        init: () => {
            loadProducts();
        }
    },
    
    about: {
        template: `
            <div class="about-card">
                <h2>About This Project</h2>
                <p>Mini Shop is a capstone project built for Thiranex Web Development Certification.</p>
                <p>This is a Single Page Application (SPA) demonstrating modern web development practices:</p>
                <p>• <strong>Client-side Routing:</strong> Hash-based navigation without page reloads</p>
                <p>• <strong>Modular Architecture:</strong> Separated concerns with ES6 modules</p>
                <p>• <strong>External API:</strong> Real product data from FakeStore API</p>
                <p>• <strong>Responsive Design:</strong> Works perfectly on all devices</p>
                <p>• <strong>Modern UI/UX:</strong> Glassmorphism design with smooth animations</p>
                <br>
                <p><strong>Tech Stack:</strong> HTML5, CSS3, Vanilla JavaScript ES6+, FakeStore API</p>
                <p><strong>Deployment:</strong> Hosted on Netlify with CDN optimization</p>
            </div>
        `,
        init: () => {}
    },
    
    '404': {
        template: `
            <div class="hero">
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <a href="#/" class="btn">Go Home</a>
            </div>
        `,
        init: () => {}
    }
};

// Fetch products from FakeStore API
async function loadProducts() {
    const productList = document.getElementById('product-list');
    
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=12');
        const products = await response.json();
        
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
            </div>
        `).join('');
        
    } catch (error) {
        productList.innerHTML = `
            <div class="about-card" style="grid-column: 1/-1;">
                <h2>Error Loading Products</h2>
                <p>Failed to fetch products. Please check your connection.</p>
            </div>
        `;
    }
}

// Initialize Router with routes
const router = new Router(pages);
