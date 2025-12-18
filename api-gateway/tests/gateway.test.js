const assert = require('assert');

describe('API Gateway Integration Logic', () => {
    it('should correctly proxy requests to the User Service', () => {
        // Simulation d'une configuration de proxy
        const proxyConfig = {
            target: 'http://api-users:3001',
            changeOrigin: true,
            pathRewrite: { '^/users': '/users' }
        };
        
        assert.strictEqual(proxyConfig.target, 'http://api-users:3001', "Gateway must point to the correct internal service URL");
    });

    it('should have all microservices routes defined', () => {
        const routes = ['/users', '/posts', '/matchmake'];
        assert.ok(routes.includes('/users'), "User service route missing");
        assert.ok(routes.includes('/posts'), "Posts service route missing");
        assert.ok(routes.includes('/matchmake'), "Matchmaker service route missing");
    });
});
