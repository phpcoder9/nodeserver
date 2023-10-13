const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const winston = require("winston");
const logger = require('./logger/logger');

try {
  
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(helmet());

  app.use((req, res, next) => {
    res.locals.flashMessage = req.session.flashMessage;
    delete req.session.flashMessage;
    next();
  });

  app.use(express.static("public"));

  const web = require("./routes/web");
  const api = require("./routes/api");

  app.use("/", web);
  app.use("/api/", api);

} catch (error) {
  logger.info(error.stack);
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});