const express = require('express')
const { register, login, logout, getMyProfile } = require("../controllers/user");
const isAuthenticate = require('../middlewares/auth');


const route = express.Router();


route.post('/login', login)

route.post('/register', register)

route.get('/logout', logout)

route.get('/me', isAuthenticate, getMyProfile)


module.exports = route;