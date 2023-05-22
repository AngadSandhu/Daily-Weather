const express = require("express");
const path = require("path");

// Initialize Express
const app = express();

app.get("/", (req,res)=>{
    res.send("Welocme to Daily Weather App");
});

app.listen(3000,()=>{
    console.log("Daily Weather")
})