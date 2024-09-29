// MongoSessionDriver.js
const MongoStore = require('connect-mongo'); // Ensure you have connect-mongo installed
const mongoose = require('mongoose');

class MongoSessionDriver {
    constructor() {
        this.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/sessions';
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB successfully');
        } catch (error) {
            console.error('Could not connect to MongoDB:', error);
            throw error;
        }
    }

    getStore() {
        return MongoStore.create({ mongoUrl: this.mongoUrl });
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

module.exports = MongoSessionDriver;
