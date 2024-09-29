// providers/SessionServiceProvider.js
const session = require('express-session');
const RedisSessionDriver = require('../drivers/RedisSessionDriver'); 
const MongoSessionDriver = require('../drivers/MongoSessionDriver'); 

class SessionServiceProvider {
    static async register(app) {
        const redisUrl = process.env.REDIS_URL;

        let sessionDriver;

        if (redisUrl) {
            sessionDriver = new RedisSessionDriver();
            await sessionDriver.connect();
            app.use(
                session({
                    store: sessionDriver.getStore(),
                    secret: process.env.SESSION_SECRET || 'your-secret-key',
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        secure: process.env.NODE_ENV === 'production',
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24, // Optional: Set cookie expiry to 1 day
                    },
                })
            );
        } else {
            console.log('Using MongoDB session store');
            sessionDriver = new MongoSessionDriver();
            await sessionDriver.connect();
            app.use(
                session({
                    store: sessionDriver.getStore(),
                    secret: process.env.SESSION_SECRET || 'your-secret-key',
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        secure: process.env.NODE_ENV === 'production',
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24, // Optional: Set cookie expiry to 1 day
                    },
                })
            );
        }

        // Middleware for flash messages
        app.use((req, res, next) => {
            res.locals.flashMessage = req.session.flashMessage;
            delete req.session.flashMessage;
            next();
        });
    }
}

module.exports = SessionServiceProvider;
