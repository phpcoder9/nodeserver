// RedisSessionDriver.js
const RedisStore = require('connect-redis').default; 
const { createClient } = require('redis');

class RedisSessionDriver {
    constructor() {
        this.redisClient = null;
    }

    async connect() {
        const redisUrl = process.env.REDIS_URL;

        if (!redisUrl) {
            throw new Error('Redis URL not provided');
        }

        this.redisClient = createClient({ url: redisUrl });

        this.redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        try {
            await this.redisClient.connect();
            console.log('Connected to Redis successfully');
        } catch (error) {
            console.error('Could not connect to Redis:', error);
            throw error;
        }
    }

    getStore() {
        return new RedisStore({ client: this.redisClient });
    }

    async disconnect() {
        if (this.redisClient) {
            await this.redisClient.quit();
        }
    }
}

module.exports = RedisSessionDriver;
