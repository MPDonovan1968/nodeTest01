const path = require('path');  // core node module. load core mods first.
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./geoCode');
const getWeather = require('./getWeather');

const author = "BobFromAkron"; // for passing into the templates 
const app = express();


// handlebars settings
// the default is 'views' in the root of the app dir. Here is where we customize that if we so desire
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);



// static directory settings
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    const vars = {
        title: "Home Page",
        author
    }
    res.render('index', vars)
});

app.get("/help", (req, res) => {
    const vars = {
        title: "Help Page",
        msg: "Please enter a city in the box marked 'city' in order to receive your forecast",
        author
    }
    res.render("help", vars)
});

app.get("/about", (req, res) => {
    const vars = {
        title: "About Page",
        author
    }
    res.render("about", vars)
});
//                                          /WEATHERF
app.get("/weatherF", (req, res) => {
    const city = req.query.city;
    const vars = {
        title: "Weather(Client Side)",
        author,
        city
    }
    res.render("weatherF", vars)
})
//**************************************************        /WEATHERFETCH
app.get("/weatherFetch", (req, res) => {
    const city = req.query.city;
    geoCode(city, (error, obj) => {
        if (error) {
            vars = { author: "BobFromAkron", title: "Forecast Page", error: "Please pick a valid city" }
            vars.error = error;
            res.send(vars);
        } else {
            getWeather(obj, (error, response) => {
                if (error) {
                    return console.log("error", error);
                }
                const vars = {};
                //vars = presentData(response, city)
                vars.title = "The Forecast";
                res.send(presentData(response, city));
            })
        }
    })

})
// **************************************************  his code
app.get("/weatherHis", (req, res) => {
    vars = { author: "BobFromAkron", title: "Weather Forecast (Mead's Code)`" }
    res.render("weatherHis", vars)
})

//  /weather
app.get("/weather", (req, res) => {
    if (!req.query.city) { // check for city. No city, send form page. If city, get forecast
        vars = { author: "BobFromAkron", title: "Forecast Page" }
        res.render("weatherForm", vars);
    } else {
        const city = req.query.city;
        geoCode(city, (error, obj) => {
            if (error) {
                vars = { author: "BobFromAkron", title: "Forecast Page", error: "Please pick a valid city" }
                return res.render("weatherForm", vars);
            }
            getWeather(obj, (error, response) => {
                if (error) {
                    return console.log("error", error);
                }
                vars = presentData(response, city)
                vars.title = "The Forecast";
                res.render("weather", vars)
            })
        })
    }
})

app.get('/about/*', (req, res) => {
    res.render("myFourOhFourAbout");
})

app.get('/weather/*', (req, res) => {
    res.render("myFourOhFourWeather");
})

app.get('/help/*', (req, res) => {
    res.render("myFourOhFourHelp");
})

app.get("*", (req, res) => {
    res.render("myFourOhFour")
})

app.listen(3000, () => {
    console.log('Started, listening...on port 3000');
})

const presentData = (response, place) => {
    const city = place.charAt(0).toUpperCase() + place.slice(1);
    retO = {
        author,
        place: city
    }
    retO.placeName = response.placeName;
    const curr = response.body.currently;
    const min = response.body.minutely;
    const hour = response.body.hourly;
    const daily = response.body.daily.data[0];
    retO.summary = response.body.daily.summary;
    retO.currSumm = curr.summary;
    retO.currTemp = curr.temperature;
    retO.currHumidty = curr.humidity;
    retO.currWindSpeed = curr.windSpeed;
    retO.currWindDir = degToCompass(curr.windBearing);
    if (min) {
        retO.minSumm = min.summary;
        retO.hourSumm = hour.summary;
    } else {
        retO.minSumm = "Not Available";
        retO.hourSumm = "Not Available";
    }
    corHiTTime = daily.temperatureHighTime + "000";
    hiTime = new Date(parseInt(corHiTTime))
    hours = hiTime.getHours();
    hours = ((hours + 11) % 12 + 1);
    retO.highTemp = daily.temperatureHigh;
    retO.highTempTime = hours + ":00";
    retO.highTempFeel = daily.apparentTemperatureHigh
    return (retO);
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
