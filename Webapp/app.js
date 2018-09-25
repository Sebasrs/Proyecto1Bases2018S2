var express = require("express");
var mysql = require('mysql');
const JSONN = require('circular-json');
var app = express();
var bodyParser = require("body-parser");

//Rutas
//var routes = require('./routes');

//var customers = require('./routes/customers'); 
//MysqlDataBase
var db  = require('./database3.js'); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var PORT = 5000 || process.env.PORT;

app.get("/", function(req,res){
	res.render("index");
});

app.get('/clientes', async function (req, res) {
	try {

	var clientes=await db.query('SELECT * FROM Cliente');

	res.send("E"+JSON.stringify(clientes[1]));
	//res.send("hola")
	} catch(e) {
		console.log(e);
	} 
});

app.get('/p', async function (req, res) {
	try {

	var clientes=await db.query("CALL prueba('A%')");

	res.send("E"+JSON.stringify(clientes));
	//res.send("hola")
	} catch(e) {
		console.log(e);
	} 
});

/*
crear reparacion(editado)
insertar cliente
reparaciones por

*/

app.listen(PORT, function(){
	console.log("Serving MOTORTEC on port " + PORT);
});