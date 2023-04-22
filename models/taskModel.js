const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel;