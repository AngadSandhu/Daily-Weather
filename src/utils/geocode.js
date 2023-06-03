const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config({ path: "../.env"});

const geoCode = (location, geoCodeCallback) => {
    const geoCodeURL = process.env.GEOCODE_URL + (location) + ".json?access_token=" + process.env.GEOCODE_API_KEY ;
    request({ url: geoCodeURL, json:true },(error,response,body)=> {
        if(response && response.body){
            console.log(chalk.green("Success!"));
            let coordinates = {
                latitude: body?.features[0].center[1],
                longitude: body?.features[0].center[0],
                location: body?.features[0].place_name
            }
            console.log("Coordinates are: ", coordinates.latitude,coordinates.longitude);
            geoCodeCallback(undefined, coordinates);
        }
        if(error){
            console.log(chalk.red("An error occured while fetching the geocoding details"));
            geoCodeCallback(error,undefined)
        }
    });
};

module.exports = geoCode;