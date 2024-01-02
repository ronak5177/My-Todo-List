const express = require("express");

const { UserList, TaskList } = require("../models/tasks")

//setting up the request router
const router = express.Router();
// const user = "Ronak";
let user;

router.get("/user", async (req, res) => {
  try {
    const allDbTasks = await TaskList.find({user})
    const groupedTasks = allDbTasks.reduce((acc, { _id, state, task: taskName }) => {
      acc[state] = [...(acc[state] || []), {_id,taskName}];
      return acc;
    }, {});
    return res.status(200).send(groupedTasks);
  } catch (error) {
    return res.status(404).send({message: "some issue in get request"});
  }
});

router.get("/otheruser", async (req, res)=>{
  try {
    // Fetch all tasks from MongoDB
    const data = await TaskList.find({user : {$ne : user}})
    // let users = []    
    // data.forEach(user => {
    //   if (!users.includes(user.user)) {
    //     users.push(user.user);
    //   }
    // })

    const formattedData = {};

data.forEach((task) => {
  if (!formattedData[task.user]) {
    formattedData[task.user] = {
      running: [],
      in_progress: [],
      done: [],
    };
  }

  formattedData[task.user][task.state].push({
    _id: task._id,
    taskName: task.task,
  });
});

    return res.status(200).send(formattedData);
  } catch (error) {
     return res.status(404).send({message: "some issue in get request"});
  }
})

router.post("/user", async (req, res) => {
  try {
    let body = req.body;
    let result = await TaskList.create({
      task: body.task,
      user: body.user,
      email: body.email,
      state: body.state
    })
    // console.log("Result : ", result)
    return res.status(201).send({ message: "success" , id: result._id});
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    await TaskList.findByIdAndDelete(req.params.id)
    return res.status(200).send({ status: "deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// For Move
router.patch("/user/:id", async (req, res) => {
    try {
        const userTask = await TaskList.findById(req.params.id)  
        if (userTask.state == "in_progress"){
          await TaskList.findByIdAndUpdate(req.params.id, {state: "done"})
          return res.status(200).send({ status: "state successfully changed to done"})
        } else if (userTask.state == "running"){
          await TaskList.findByIdAndUpdate(req.params.id, {state: "in_progress"})
          return res.status(200).send({ status: "state successfully changed to in_progress"})
        } 
        return res.status(400).send({ error: "some issue occured in while changing status" });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

// For Undo
router.patch("/user/:id", async (req, res) => {
  try {
    const userTask = await TaskList.findById(req.params.id)  
    if (userTask.state == "in_progress"){
      await TaskList.findByIdAndUpdate(req.params.id, {state: "running"})
      return res.status(200).send({ status: "state successfully changed to running"})
    } else if (userTask.state == "done"){
      await TaskList.findByIdAndUpdate(req.params.id, {state: "in_progress"})
      return res.status(200).send({ status: "state successfully changed to in_progress"})
    } 
    return res.status(400).send({ error: "some issue occured in while changing status" });
} catch (error) {
    return res.status(400).send({ error: error.message });
}
});

// SignUp
router.post("/user/signup", async (req, res)=>{
  try {
      await UserList.create(req.body);
      res.status(200).send(`User: ${req.body.email} Created`)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

router.post("/user/signin", async (req, res)=>{
  try {
      const data = await UserList.findOne({email: req.body.email})
      if (data && (data.password === req.body.password)){
        user = data.name
        return res.status(200).send(`Successfully logiin with user ${data.email}`)
      }
      console.log("Error data")
      return res.status(401).send(`Please enter correct email id or password`)
  } catch (error) {
    console.log(error)
    return res.status(400).send({error: error.message})
  }
})

module.exports = router;
