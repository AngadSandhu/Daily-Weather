const geocode = require("./utils/geocode");
const weatherForecast = require("./utils/weather");
const chalk = require("chalk");

const city = process.argv[2]; // Getting the city as input for weather forecast

geocode(city,(err,res)=>{
    if(err){
        return console.log(chalk.red(err));
    } 
    weatherForecast(res.latitude, res.longitude, (error,result)=> {
        if(error){
            return console.log(chalk.red(error));
        }
        console.log("Forcecast details are as follows", result);
    })
})