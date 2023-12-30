const app = require("./app");
const mongoose = require("mongoose")

// Connection - /databaseName
mongoose.connect("mongodb://127.0.0.1:27017/task-list")
.then(()=> console.log("Mongodb Connected"))
.catch((err)=>console.log("Mongo Error", err))

//serving app on port 8000
app.listen(8000, () => console.log(`Example app listening on port http://localhost:8000`))

