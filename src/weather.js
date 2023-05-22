const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config({ path: "../.env"});

const currentWeatherURL = process.env.WEATHER_URL + "/current.json?key=" + process.env.WEATHER_API_KEY + encodeURIComponent("&") + "q=Chandigarh"; 

request({ url: currentWeatherURL },(error,response)=> {
    if(response){
        console.log(chalk.green("Success!"));
    }
    if(error){
        console.log(chalk.red("An error occured"));
        console.log(error);
    }
});