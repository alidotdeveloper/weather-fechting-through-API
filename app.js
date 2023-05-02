const express = require("express");
const bodyParser = require ("body-parser");
const https = require("https");
const { stringify } = require("querystring");
const { request } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
res.sendFile(__dirname + '/index.html')
})

app.post("/", function(req,res){
   //send external request
const query = req.body.cityName;
const units = "metric";
const appid = "45dafdde586c60ac41a3d9592af7aff0";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ appid +"&units=" + units ;
https.get(url,function(response){
    
response.on("data", function(data){
    var data = JSON.parse(data)
    var temp = data.main.temp
   const desc = data.weather[0].description
   const icon = data.weather[0].icon
   const pressure = data.main.pressure
   const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
    res.write('<p>The sky has ' + desc );
    res.write('<p>The temprature in '+ query +  ' is ' + temp +  ' degrees celcius and pressure of air is ' + pressure +   '</p>' );
    res.write("<img src=" + imageURL+  ">" );
    res.send();
     console.log(url);
    })
})


    
    
})









app.listen(3000,console.log("runing!"))