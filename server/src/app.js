const express = require('express')

const requestsRouter = require("./routers/requests")

// setting up server
const app = express();

app.get("/", (req, res)=>{
    res.send("Hello from app get")
})

//setting up the CORS code
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "GET,PATCH,POST");
//       return res.status(200).json({});
//     }
//     next();
// });

// //setting up the middlewares
// app.use(express.json());
app.use(requestsRouter)

//exporting the server
module.exports = app;

