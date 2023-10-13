const express = require('express');
const auth = express.Router();
const {
  register,
  login,
  logout
} = require('../controllers/auth.controllers.js')

const { verifyUser } = require('../utils/verifyToken.js')


// admin authentication
auth.post('/register', register);
auth.post('/login', login);
auth.get('/logout', verifyUser, logout);


module.exports = { auth };