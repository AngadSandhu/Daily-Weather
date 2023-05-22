const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config({ path: "../.env"});


const geoCodeURL = process.env.GEOCODE_URL + encodeURIComponent("Toronto") + ".json"; 

request({ url: geoCodeURL },(error,response)=> {
    if(response){
        console.log(chalk.green("Success!"));
    }
    if(error){
        console.log(chalk.red("An error occured"));
        console.log(error);
    }
});