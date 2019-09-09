var express= require("express");
var app= express();
app.set("view engine", "ejs");
var request= require('request');

app.get("/", function(req, res){
    res.render("search");
})

app.get("/results", function(req, res){
    var query = req.query.search;
  //  var url=   " http://www.omdbapi.com/?s= "+query ;
    request("http://www.omdbapi.com/?s=" + query+ "&apikey=thewdb ", function(error, response, body){
        if (error){
            console.log("somthing wrong");
            console.log(error);
    
        }
        else {
            if(response.statusCode === 200){
                var data = JSON.parse(body);
                 res.render("results",{data : data});
            //  res.send(body);
            }
        }
    }
    );
})

app.listen(3000, function(){
    console.log("Movie app has started!");
})