const express = require("express");

//setting up the request router
const router = express.Router()

router.get("/hello", (req, res)=>{
    res.send("req from get")
})


module.exports = router;     