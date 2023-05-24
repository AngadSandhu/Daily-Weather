const request = require("postman-request");
const chalk = require("chalk");
const geocode = require("./geocode.js");
require("dotenv").config({ path: "../.env"});

const getWeatherDetails = (latitude,longitude, weatherDetailsCallback) => {
    const currentWeatherURL = process.env.WEATHER_URL + "current.json?key=" + process.env.WEATHER_API_KEY  + `&q=${latitude},${longitude}`;
    request({ url: currentWeatherURL, json: true },(error,response,body)=> {
        if(response){
            console.log(chalk.green("Success!"));
            weatherDetailsCallback(undefined,response);
        }
        if(error){
            console.log(chalk.red("An error occured"));
            console.log(error);
        }
    });
} 

module.exports = getWeatherDetails;