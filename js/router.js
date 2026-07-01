// js/router.js
class Router {
    constructor() {
        this.routes = {};
        
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const path = location.hash.slice(1) || '/';
        const route = this.routes[path] || this.routes['/404'];
        if (route){
            route();
        }else{
            document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
        }
    }
}

const router = new Router();
export { router };
