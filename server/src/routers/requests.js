const express = require("express");
const fs = require("fs");
const path = require("path");

const updated_list = require("./taskList.json");
//setting up the request router
const router = express.Router();

const user = "Ronak";

router.get("/user", (req, res) => {
  try {
    const data = updated_list.filter((t) => {
      return t.user === user;
    });
    const groupedTasks = data.reduce((acc, { state, task: taskName }) => {
      acc[state] = [...(acc[state] || []), taskName];
      return acc;
    }, {});

    return res.status(200).send(groupedTasks);
  } catch (error) {
    return res.status(404).send("some issue in get");
  }
});

router.post("/user", (req, res) => {
  try {
    let body = req.body;
    updated_list.push({ ...body, id: updated_list.length + 1 });
    fs.writeFile(
      path.join(__dirname, "taskList.json"),
      JSON.stringify(updated_list),
      (err, data) => {
        if (err) {
          return res.status(400).send({ error: "Error writing to file" });
        } else {
          return res
            .status(200)
            .send(
              `Data successfully added for the user: ${updated_list.length}`
            );
        }
      }
    );
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/user/:task", (req, res) => {
  try {
    let task = req.params.task;
    let updatedList = updated_list.filter((data) => {
      return data.task !== task;
    });
    fs.writeFile(
      path.join(__dirname, "taskList.json"),
      JSON.stringify(updatedList),
      (error, data) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        } else {
          return res
            .status(200)
            .send(`Data successfully deleted for task: ${task}`);
        }
      }
    );
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.patch("/user/:task", (req, res) => {
    try {
        let task = req.params.task;
        let updatedList = updated_list.map((data)=>{
            if(data.task == task){
                if(data.state == "in_progress"){
                    data.state = "running"  
                } else {
                    data.state = "in_progress"
                }
            }
            return data            
        })
        fs.writeFile(
            path.join(__dirname, "taskList.json"),
            JSON.stringify(updatedList),
            (error, data) => {
              if (error) {
                return res.status(400).send({ error: error.message });
              } else {
                return res
                  .status(200)
                  .send(`Data successfully Updated for task: ${task}`);
              }
            }
          );
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.patch("/:task", (req, res) => {
    try {
        let task = req.params.task;
        let updatedList = updated_list.map((data)=>{
            if(data.task == task){
                if(data.state == "running"){
                    data.state = "in_progress"  
                } else {
                    data.state = "done"
                }
            }
            return data            
        })
        fs.writeFile(
            path.join(__dirname, "taskList.json"),
            JSON.stringify(updatedList),
            (error, data) => {
              if (error) {
                return res.status(400).send({ error: error.message });
              } else {
                return res
                  .status(200)
                  .send(`Data successfully Updated for task: ${task}`);
              }
            }
          );
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});


module.exports = router;
