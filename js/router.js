// Simple Hash-based Router for SPA
class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        // Handle initial load
        window.addEventListener('load', () => this.handleRoute());
        // Handle navigation clicks
        this.setupNavLinks();
    }

    handleRoute() {
        // Get path from hash, default to '/'
        const path = window.location.hash.slice(1) || '/';

        // Find matching route
        const route = this.routes[path] || this.routes['/404'];

        // Update active nav link
        this.updateActiveNav(path);

        // Render the page
        document.getElementById('app').innerHTML = route.template;

        // Run page-specific logic
        if (route.init) route.init();
    }

    updateActiveNav(currentPath) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('href').slice(1);
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupNavLinks() {
        // Prevent default anchor behavior for smooth routing
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = link.getAttribute('href');
            });
        });
    }
}

export default Router;
