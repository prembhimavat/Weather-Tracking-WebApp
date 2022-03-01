const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req,res){
    var query = req.body.cityName;
    if(query == ""){
        var query = "Mumbai";
    };
    const appid = "ab5af4a821720ab4c74f82b82f6f044e";
    const unit = req.body.units;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weathertype = weatherData.weather[0].main;
            const icon = weatherData.weather[0].icon;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const windSpeed = weatherData.wind.speed;
            const humid = weatherData.main.humidity;

            var imageURL = "http://openweathermap.org/img/w/" + icon + ".png";


            // res.write("");
            // res.write("<h3>Current temprature in "+query+" is <u>" + temp + "</u></h3>");
            // res.write("<h3>Minimum temprature recorded : <u>"+minTemp+"</u></h3>");
            // res.write("<h3>Maximum temprature recorded : <u>" + maxTemp +"</u></h3>");
            // res.write("<h3>Wind speed : <u>" + windSpeed + "</u></h3>");
            // res.write("<h3>Humidity(%) : <u>" + humid + "</u></h3");
            //res.render("temp",{imageURL : imageURL});
            res.render("temp",{weathertype: weathertype});

        });;
    });
});

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Server is running on port 3100");
});