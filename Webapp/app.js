var express = require("express");
var mysql = require('mysql');

var app = express();
var bodyParser = require("body-parser");

//Rutas
//var routes = require('./routes');

//var customers = require('./routes/customers'); 
//MysqlDataBase
var db  = require('./database.js'); 




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var PORT = 5000 || process.env.PORT;

app.get("/", function(req,res){
	res.render("index");
});


app.get('/clientes', function (req, res) {
	db.connection.query("SELECT * FROM Cliente", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
      res.send(result);

//    return;
  });  
});



app.listen(PORT, function(){
	console.log("Serving MOTORTEC on port " + PORT);
});