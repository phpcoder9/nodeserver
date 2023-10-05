
const { validationResult, check } = require("express-validator");
const { ContactUs } = require('../models/');

const BaseController = {
  index: (req, res) => {
    res.render("index");
  }
};

module.exports = BaseController;
