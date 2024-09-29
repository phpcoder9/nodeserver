// const express = require("express");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const path = require("path");
// const app = express();
// require("dotenv").config();
// const helmet = require("helmet");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const winston = require("winston");
// const logger = require('./logger/logger');
// const morgan = require('morgan');

// try {
  
//   app.set("view engine", "ejs");
//   app.set("views", path.join(__dirname, "views"));
//   if (process.env.NODE_ENV === 'production') {
//     app.use(morgan('combined'));
//   } else {
//     app.use(morgan('dev'));
//   } 
//   app.use(
//     session({
//       secret: "your-secret-key",
//       resave: false,
//       saveUninitialized: true,
//     })
//   );

//   app.use(helmet());

//   app.use((req, res, next) => {
//     res.locals.flashMessage = req.session.flashMessage;
//     delete req.session.flashMessage;
//     next();
//   });

//   app.use(express.static("public"));

//   const web = require("./routes/web");
//   const api = require("./routes/api");

//   app.use("/", web);
//   app.use("/api/", api);

// } catch (error) {
//   logger.info(error.stack);
// }

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const logger = require('./logger/logger');

// Service Providers
const MiddlewareServiceProvider = require('./providers/MiddlewareServiceProvider');
const SessionServiceProvider = require('./providers/SessionServiceProvider');
const RouteServiceProvider = require('./providers/RouteServiceProvider');
const LoggingServiceProvider = require('./providers/LoggingServiceProvider');

async function startServer() {
    try {
        // Set view engine
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "views"));

        // Register Service Providers
        // await SessionServiceProvider.register(app); // Ensure this is awaited
        MiddlewareServiceProvider.register(app);
        RouteServiceProvider.register(app);
        LoggingServiceProvider.register(app);

        // Start the server
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
    }
}

startServer();

