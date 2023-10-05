const express = require('express');
const api = express.Router();


api.get('/', (req, res) => {
  res.send('Welcome to your Node.js API');
});



module.exports = api;