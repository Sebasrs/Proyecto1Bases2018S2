var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db  = require('./database.js'); 
const mysql = require('mysql')
const JSONN = require('circular-json');
const querysOtros=require('./selectOtros.json');

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

	res.send("E"+JSON.stringify(clientes));
	//res.send("hola")
	} catch(e) {
		console.log(e);
	} 
});

app.get("/get/:tableName",async function(req,res){
	try {
	
	res.setHeader('Content-Type', 'application/json');
	var filtros = await db.query("SELECT * FROM " + req.params.tableName +  ";");
	res.send(filtros);

	} catch(e) {
		// statements
		console.log(e);
	}
	
});

app.get("/otros/:id",async function(req,res){
	try {
		res.setHeader('Content-Type', 'application/json');
		console.log(req.params.id)
		var query=querysOtros[req.params.id];
		var tabla = await db.query(query);

		res.send(tabla);
	} catch(e) {
		// statements
		console.log(e);
	}
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

app.post('/get/:tabla',async function(req,res){
	
	try{
	
	console.log(req.body);

	var ress=await db.query('Select * from Coche LIMIT 1')
	console.log(ress);
	console.log("-------A-----------")
	console.log(traerColumnas("Cliente"));

	console.log("-----A-------------")

	console.log(req.body);
	var tabla=req.params.tabla;
	var columnas=await traerColumnas(tabla);
	console.log(columnas);

	var seleect =await armarSelect(columnas,tabla);
	console.log("---------Selectttt-----")

	console.log(seleect)

	console.log("---------Selectttt-----")

	var where=req.body.where;
	if(where){
		seleect+=whereManager(where)
	}
	console.log('----------Completa-----')
	console.log(seleect);
	console.log('----------Completa-----')
	
	resultadoTabla= await db.query(seleect);
	console.log('----------Tabla-----')
	console.log(resultadoTabla);
	console.log('----------Tabla-----')
	

	res.send({"columnas":resultadoTabla});
	

	} catch(e){

		console.log(e);

	}
});

app.listen(PORT, function(){
	console.log("Serving MOTORTEC on port " + PORT);
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
	console.log('-----where-----')
	console.log(response);
	return response;
};

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

async function armarSelect(arregloColumnas,tabla){
	var select="Select "
	var columnas="";
	var colNormales=arregloColumnas.arreglo;
	console.log(colNormales);
	var foregenKeys=arregloColumnas.foreanKeys;
	var i
	console.log("----tablaaaaaaa---");
	console.log(tabla);

	var tablas=tabla;
	var innerJoin="";
	for (i=0;i< colNormales.length;i++){
		columnas+=tabla+'.'+colNormales[i] +' AS '+"'"+tabla+'.'+colNormales[i]+"'";

		if( i != (colNormales.length-1)){
			columnas+=',';
		}
		columnas+=' ';
		
	}
	if(foregenKeys.length>0){
		//Añade las columnas al query 
		for (i=0;i< foregenKeys.length;i++){
			var respuesta=await traerColumnas(foregenKeys[i].substring(2))
			console.log('------Foregin------')
			console.log(foregenKeys[i]);
			console.log('------Foregin------')

			console.log('------columnas------')
			var columnasMostrar=respuesta.arreglo;
			console.log(columnasMostrar);
			console.log('------columnas------')
			
			var j; 
			for (j=0;j<columnasMostrar.length;j++){
				console.log('Esto es lo que inserta');
				console.log(columnasMostrar[j]);
				console.log(foregenKeys[j]);
		
				columnas+=',';
			
				columnas+=foregenKeys[i].substring(2)+'.'+columnasMostrar[j] +" AS '"+foregenKeys[i].substring(2)+'.'+columnasMostrar[j]+"'";

				columnas+=' ';
			}


		}
		//añade los inner join al query
		//FROM inner join table2 
		//   on table1.id=table2.id
		var tablaTemp;
		for(i=0;i< foregenKeys.length;i++){
			innerJoin+=' inner join ';
			innerJoin+=foregenKeys[i].substring(2);
			innerJoin+=' on '
			innerJoin+=foregenKeys[i].substring(2)+'.'+foregenKeys[i];
			innerJoin+='='+tabla+"."+foregenKeys[i];

		}
	}
	console.log('//////////////////')
	console.log(innerJoin)
	console.log('//////////////////')

	select+= columnas+' FROM '+tabla+""+innerJoin;
	console.log('//////////////////')

	console.log(select);
	console.log('//////////////////')

	return select;
}

async function traerColumnas(tabla){
	try {
		var res=await db.query('Show columns from '+tabla)
		var i;
		var arreglo=[]
		var foreanKeys=[]
		for (i=0;i<res.length;i++){
			if(res[i].Key==''){
				console.log(res[i].Field);
				arreglo.push(res[i].Field)
				console.log("--------------\n")
			}
			if(res[i].Key=='MUL'){
				foreanKeys.push(res[i].Field);
			}

		}
		console.log(arreglo);

		return {"arreglo":arreglo,"foreanKeys":foreanKeys};
		//	console.log(res);

		// statements
	} catch(e) {
		// statements
		console.log(e);
	}
}