const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode =  require("./src/utils/geocode");
const weatherForecast =  require("./src/utils/weather");
require("dotenv").config({ path: "./.env"});

// Initialize Express
const app = express();

// Setting up paths for public and views directory
const publicDirPath = path.join(__dirname,"./public");
const viewsDirPath = path.join(__dirname,"./templates/views");
const partialsDirPath = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");                          // Sets the view engine to hbs
app.set("views", viewsDirPath)                          // Sets the path to views directory for hbs

app.use(express.static(publicDirPath));                 // Important - Used for serving static content
hbs.registerPartials(partialsDirPath);

app.get("/", (req,res)=> {
    res.render("index", {
        title: "The Daily Weather"
    });
});

app.get("/about", (req,res)=>{
    res.render("about", {
        title: "The Daily Weather",
        github: process.env.GITHUB,
        linkedin: process.env.LINKEDIN
    });
});

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide a valid address"
        })
    }
    geocode(req.query.address,(err,data)=>{
        if(err){
            return res.send({error: err});
        } 
        weatherForecast(data.latitude, data.longitude, (error,result)=> {
            if(error){
                return res.send({error});
            }
            console.log("Forcecast details are as follows", result);
            res.send({
                ...result
            })
        })
    });
});


app.get("*",(req,res)=>{
    res.render("pageNotFound",{
        message: "Sorry ! Thee content you are looking for does not exist."
    })
});

app.listen(3000,()=>{
    console.log("Daily Weather app started.. ")
})