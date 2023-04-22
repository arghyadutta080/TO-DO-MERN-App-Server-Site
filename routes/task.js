const express = require('express')
const { createTask, getAllTask, updateTask, delTask } = require('../controllers/task')
const isAuthenticate = require('../middlewares/auth')
// const getAllTask = require('../controllers/task')

const route = express.Router()

route.post('/addtask', isAuthenticate, createTask)

route.get('/gettask', isAuthenticate, getAllTask)

route.put('/:id', isAuthenticate, updateTask)

route.delete('/:id', isAuthenticate, delTask)

module.exports = route;