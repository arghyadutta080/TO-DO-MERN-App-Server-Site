const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');
const sendCookie = require('../utils/features')



const createTask = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    try {
        const { title, description } = req.body;

        const newTask = new taskModel({
            title: title,
            description: description, 
            user_id: req.user
        })

        newTask.save();
        res.status(201).json(newTask)
    } catch (error) {
        console.log(error)
    }
}



const getAllTask = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    try {
        const taskList = await taskModel.find({ user_id: req.user._id })
        res.json(taskList)
    } catch (error) {
        console.log(error)
    }
}



const updateTask = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    try {
        const task = await taskModel.findById(req.params.id)

        if (!task) {
            res.json({
                message: "add task first"
            })
        }

        task.isCompleted = !task.isCompleted
        await task.save();

        res.json({
            message: "task updated"
        })
    } catch (error) {
        console.log(error)
    }
}



const delTask = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    try {
        const task = await taskModel.findById(req.params.id)

        if (!task) {
            res.json({
                message: "add task first"
            })
        }

        await task.deleteOne();

        res.json({
            message: "task deleted"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createTask, getAllTask, updateTask, delTask };