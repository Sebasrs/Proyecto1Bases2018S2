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

app.get("/get/:tableName",async function(req,res){
	res.setHeader('Content-Type', 'application/json');
	var filtros = await db.query("SELECT * FROM " + req.params.tableName +  ";");
	res.send(filtros);
});

app.post('/update/:tableName', async function(req,res){
	try{
		var whereJSON = req.body.where;
		res.setHeader('Content-Type', 'application/json');

		var query = "SELECT * FROM " + req.params.tableName +  whereManager(whereJSON);

		console.log(query);
		var filtros = await db.query(query);

		res.send(filtros);
	} catch(e){
		console.log(e);
	}
});

function whereManager(whereJSON){
	var response = "";
	var jsonParsed = JSON.parse(whereJSON);
	if(Object.keys(jsonParsed).length){
		response += " WHERE "
		var keys = Object.keys(jsonParsed);
		var jsonSize = keys.length;
		var counter = 0;
		keys.forEach(function(key){
			response += String(key) + "=" + String(jsonParsed[key]);
			if(counter != jsonSize - 1){
				response += " AND "
				counter++;
			}
		});
	}
	
	return response;
};

/*
crear reparacion(editado)
insertar cliente
reparaciones por

*/

app.listen(PORT, function(){
	console.log("Serving MOTORTEC on port " + PORT);
});