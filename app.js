const express = require("express");
const path = require("path");

// Initialize Express
const app = express();

const publicDirPath = path.join(__dirname,"../public");
app.set("view engine", "hbs");                          // Sets the view engine to hbs
app.use(express.static(publicDirPath));                 // Used for serving static content

app.get("/", (req,res)=>{
    res.render("home");
    res.send("Welocme to Daily Weather App");
});

app.listen(3000,()=>{
    console.log("Daily Weather app started.. ")
})