const logger = require('../logger/logger'); // Import custom logger

class LoggingServiceProvider {
    static register(app) {
        app.use((err, req, res, next) => {
            logger.error(err.stack);
            next(err);
        });
    }
}

module.exports = LoggingServiceProvider;
