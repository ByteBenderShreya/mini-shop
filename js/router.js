// Simple Hash-based Router for SPA
class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
        this.setupNavLinks();
    }

    handleRoute() {
        const path = window.location.hash.slice(1) || '/';

        // ✅ YE LINE FIX KI HAI - path ke hisaab se route uthao
        const route = this.routes || this.routes['/404'];

        this.updateActiveNav(path);
        document.getElementById('app').innerHTML = route.template;
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
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = link.getAttribute('href');
            });
        });
    }
}

export default Router;
