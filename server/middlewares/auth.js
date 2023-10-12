const express = require('express');
const auth = express.Router();
const {
  register,
  login,
  logout
} = require('../controllers/auth.controllers.js')

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken.js')


// user authentication
auth.post('/register', register);
auth.post('/login', login);
auth.get('/logout', verifyUser, logout);


module.exports = { auth };