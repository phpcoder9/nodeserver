const webRoutes = require('../routes/web');
const apiRoutes = require('../routes/api');

class RouteServiceProvider {
    static register(app) {
        // Web routes
        app.use('/', webRoutes);
        
        // API routes
        app.use('/api', apiRoutes);
    }
}

module.exports = RouteServiceProvider;
