const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config({ path: "../.env"});

const getWeatherDetails = (latitude,longitude, weatherDetailsCallback) => {
    const currentWeatherURL = process.env.WEATHER_URL + process.env.WEATHER_API_KEY  + `&query=${latitude},${longitude}`;
    request({ url: currentWeatherURL, json: true },(error,response)=> {
        if(response && response.body){
            console.log(chalk.green("Success! Weather details are as follows"));
            weatherDetailsCallback(undefined,response.body.current);
        }
        if(error){
            console.log(chalk.red("An error occured while fetching weather details"));
            console.log(error);
        }
    });
} 

module.exports = getWeatherDetails;