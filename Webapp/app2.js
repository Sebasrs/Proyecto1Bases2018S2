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
		console.log(req.body);
		var whereJSON = req.body.where;
		var setParams = req.body.set;
		res.setHeader('Content-Type', 'application/json');

		var query = "UPDATE " + req.params.tableName +  " SET ";
		
		if(setParams){
			query += setManager(setParams, String(req.params.tableName));
		}

		if(whereJSON){
			query += whereManager(whereJSON, String(req.params.tableName));
		}

		query += ";";
		console.log(query);
		var filtros = await db.query(query);

		res.send(filtros);

	} catch(e){

		console.log(e);

	}
});

app.post('/update/:tableName', async function(req,res){
	try{
		var whereJSON = req.body.where;
		var setParams = req.body.set;

		res.setHeader('Content-Type', 'application/json');

		var query = "UPDATE " + req.params.tableName +  " SET " + setManager(setParams, String(req.params.tableName)) +  whereManager(whereJSON, String(req.params.tableName)) + ";";
		console.log(query);
		var filtros = await db.query(query);

		res.send(filtros);

	} catch(e){

		console.log(e);

	}
});

app.post('/delete/:tableName', async function(req,res){
	try{
		var whereJSON = req.body.where;

		res.setHeader('Content-Type', 'application/json');

		var query = "DELETE FROM " + req.params.tableName + whereManager(whereJSON, String(req.params.tableName)) + ";";
		console.log(query);
		var filtros = await db.query(query);

		res.send(filtros);

	} catch(e){

		console.log(e);

	}
});

app.post('/create/:tableName', async function(req,res){
	try{
		var values = req.body.values;
		var jsonArray = JSON.parse(values);

		console.log(jsonArray.length);

		res.setHeader('Content-Type', 'application/json');

		var query = "INSERT INTO " + req.params.tableName + " " + insertValuesKeys(jsonArray, true) + " VALUES " + insertValuesKeys(jsonArray, false) + ";";
		console.log(query);
		var filtros = await db.query(query);

		res.send(filtros);

	} catch(e){

		console.log(e);

	}
});

function whereManager(whereJSON){
	var response = "";
	console.log(whereJSON);
	var jsonParsed = JSON.parse(whereJSON);

	if(Object.keys(jsonParsed).length){
		response += " WHERE "
		var keys = Object.keys(jsonParsed);
		var jsonSize = keys.length;
		var counter = 0;
		keys.forEach(function(key){
			var isNum = /^\d+$/.test(jsonParsed[key]);
			if(isNum){
				response += String(key) + "=" + String(jsonParsed[key]);
			}else{
				response += String(key) + "='" + String(jsonParsed[key] + "'");
			}
			if(counter != jsonSize - 1){
				response += " AND "
				counter++;
			}
		});
	}

	return response;
};

function setManager(setParams){
	var response = "";
	console.log(setParams);
	var setJSON = JSON.parse(setParams);

	if(Object.keys(setJSON).length){
		var keys = Object.keys(setJSON);
		var jsonSize = keys.length;
		var counter = 0;
		keys.forEach(function(key){
			var isNum = /^\d+$/.test(setJSON[key]);
			if(isNum){
				response += String(key) + "=" + String(setJSON[key]);
			}else{
				response += String(key) + "='" + String(setJSON[key]+"'");
			}
			if(counter != jsonSize - 1){
				response += ","
				counter++;
			}
		});
	}

	return response;
}

function insertValuesKeys(jsonArray, wantJustKey){
	var response = "";
	var toAnalyze;
	if(wantJustKey){
		toAnalyze = jsonArray[0];
	}else{
		toAnalyze = jsonArray;
	}

	if(wantJustKey){
		response += "("
		var keys = Object.keys(toAnalyze);
		var keysLenght = keys.length;
		var counter = 0;
		keys.forEach(function(key){
			response += String(key);
			if(counter != keysLenght - 1){
				response += ",";
				counter++;
			}
		});
		response += ")"
	}else{
		var arrayLenght = toAnalyze.length;
		var counter = 0;
		toAnalyze.forEach(function(jsonValues){
			response += "(";
			var keys = Object.keys(jsonValues);
			var jsonKeySize = keys.length;
			var jsonCounter = 0;
			keys.forEach(function(value){
				var isNum = /^\d+$/.test(jsonValues[value]);
				if(isNum){
					response += String(jsonValues[value]);
				}else{
					response += "'" + String(jsonValues[value]) + "'";
				}
				if(jsonCounter != jsonKeySize - 1){
					response += ",";
					jsonCounter ++;
				}
			});
			response += ")";
			if(counter != arrayLenght - 1){
				response += ",";
				counter ++;
			}
		})
	}

	return response;
}

app.listen(PORT, function(){
	console.log("Serving MOTORTEC on port " + PORT);
});