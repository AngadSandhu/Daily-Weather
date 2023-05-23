const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config({ path: "../.env"});

const geoCode = (location, geoCodeCallback) => {
    const geoCodeURL = process.env.GEOCODE_URL + encodeURIComponent(location) + ".json"; 
    request({ url: geoCodeURL },(error,response)=> {
        if(response){
            console.log(chalk.green("Success!"),response);
            let coordinates = {
                latitude: response.features[0].center[1],
                longitude: response.feature[0].center[0]
            }
            console.log("Coordinates are: ", coordinates.latitude,coordinates.longitude);
            geoCodeCallback(undefined, coordinates);
        }
        if(error){
            console.log(chalk.red("An error occured"));
            geoCodeCallback(error,undefined)
        }
    });
};

module.exports = geoCode;