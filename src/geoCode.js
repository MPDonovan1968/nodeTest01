const request = require('request');

const geoCode = (address, callbackFx) => {
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=[]limit=1";
    request({ url: geoURL, json: true }, (error, response) => {
        if (error) {
            callbackFx(error, null); // underfined works as well
        } else if (response.body.features.length == 0) {
            callbackFx("Location not found", null); // underfined works as well also not putting anything there 
        } else {
            const lat = response.body.features[0].center[1];
            const long = response.body.features[0].center[0];
            const placeName = response.body.features[0].place_name;
            callbackFx(null, { lat: lat, long: long, placeName: placeName }) // and again,  underfined works as well
        }
    })
}

module.exports = geoCode;
