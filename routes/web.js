const express = require("express");
const web = express.Router();
const BaseController = require("../controllers/BaseController");
const { check } = require("express-validator");

web.get("/", BaseController.index);

module.exports = web;
