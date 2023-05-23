const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config({ path: "../.env"});


const geoCodeURL = process.env.GEOCODE_URL + encodeURIComponent("Toronto") + ".json"; 

request({ url: geoCodeURL },(error,response)=> {
    if(response){
        console.log(chalk.green("Success!"),response);
        let coordinates = {
            latitude: response.features[0].center[1],
            longitude: response.feature[0].center[0]
        }
        console.log("Coordinates are: ", coordinates.latitude,coordinates.longitude);
    }
    if(error){
        console.log(chalk.red("An error occured"));
        console.log(error);
    }
});