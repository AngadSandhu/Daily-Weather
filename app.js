const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode =  require("./src/geocode");
const getWeather =  require("./src/weather");

// Initialize Express
const app = express();

// Setting up paths for public and views directory
const publicDirPath = path.join(__dirname,"../public");
const viewsDirPath = path.join(__dirname,"../templates/views");

app.set("view engine", "hbs");                          // Sets the view engine to hbs
app.set("views", viewsDirPath)                          // Sets the path to views directory for hbs

app.use(express.static(publicDirPath));                 // Used for serving static content

app.get("/home", (req,res)=>{
    let results;
    geoCode("Toronto",(error,response)=>{
        if(response){
            getWeather(response.latitude,response.longitude,(err,resp)=>{
                console.log(resp);
                results = resp;
            })
        }
    });
    res.render("home");
    res.send({results});
});

app.get("/about", (req,res)=>{
    res.render("about");
});

app.listen(3000,()=>{
    console.log("Daily Weather app started.. ")
})