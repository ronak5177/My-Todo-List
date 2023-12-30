const mongoose = require("mongoose")

// Schema
const taskListSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    }
})

const TaskList = mongoose.model("mylist", taskListSchema)

module.exports = TaskList;