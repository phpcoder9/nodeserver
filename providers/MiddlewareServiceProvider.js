const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');

class MiddlewareServiceProvider {
    static register(app) {

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.use(helmet());

        if (process.env.NODE_ENV === 'production') {
            app.use(morgan('combined'));
        } else {
            app.use(morgan('dev'));
        }

        app.use(express.static("public"));
    }
}

module.exports = MiddlewareServiceProvider;
