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

const users = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

})


const TaskList = mongoose.model("mylist", taskListSchema)
const UserList = mongoose.model("userlist", users)
module.exports = {
    TaskList, UserList
}