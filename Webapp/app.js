var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var PORT = 5000 || process.env.PORT;

app.get("/", function(req,res){
	res.render("index");
});

app.listen(PORT, function(){
	console.log("Serving MOTORTEC on port " + PORT);
});