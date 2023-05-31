const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode =  require("./src/utils/geocode");
const getWeather =  require("./src/utils/weather");

// Initialize Express
const app = express();

// Setting up paths for public and views directory
const publicDirPath = path.join(__dirname,"./public");
const viewsDirPath = path.join(__dirname,"./templates/views");
const partialsDirPath = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");                          // Sets the view engine to hbs
app.set("views", viewsDirPath)                          // Sets the path to views directory for hbs

app.use(express.static(publicDirPath));                 // Used for serving static content
hbs.registerPartials(partialsDirPath);

app.get("/", (req,res)=> {
    res.render("index", {
        title: "The Daily Weather"
    });
});

app.get("/about", (req,res)=>{
    res.render("about", {
        title: "The Daily Weather"
    });
});

app.get("/weather", (req,res)=>{
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
});


app.get("*",(req,res)=>{
    res.render("pageNotFound",{
        message: "Sorry ! Thee content you are looking for does not exist."
    })
});

app.listen(3000,()=>{
    console.log("Daily Weather app started.. ")
})