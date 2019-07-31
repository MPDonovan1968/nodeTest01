const request = require('request');

const getWeather = (obj, callBackFx) => {
    const urlMyHouse = 'https://api.darksky.net/forecast/e9e11af46642ebec4925a56aea644a1e/' + obj.lat + ',' + obj.long;
    request({ url: urlMyHouse, json: true }, (error, response) => {
        if (error) {
            callBackFx(error)
        }
        else if (response.body.error) {
            callBackFx(response.body.error);
        } else {
            response.placeName = obj.placeName;
            callBackFx(null, response)
        }
    })
}

module.exports = getWeather;