var clientInputText = ["Nombre", "Cedula", "Telefono"];
var clientInputFill = ["Ubicacion"];
var cocheInputText = ["Matricula", "Kilometros"];
var cocheInputFill = ["Marca","Modelo", "Color", "Estado", "Concesionario"];
var mecanicoInputText = ["Cedula", "Nombre", "Apellido 1", "Apellido 2", "Salario"];
var mecanicoInputFill = ["Taller"];
var concesionarioInputText = ["Nombre"];
var concesionarioInputFill = ["Taller", "Ubicacion"];
var compraInputFill = ["Cliente", "Coche"];
var ip = "http://192.168.100.11:5000";
var fill;
var globalCount;

$("li.nav-item a").click(function(){
	$("#filtros").html("");
	$("#tabla").html("");
});

function formFill(table){
	var input;

	$("#filtros").html("");
	$("#tabla").html("");
	$("#botonSpace").html("");

	switch(table) {
      case "Cliente":
        input = clientInputText;
        fill = clientInputFill;
        break;
      case "Coche":
        input = cocheInputText;
        fill = cocheInputFill;
        break;
      case "Mecanico":
        input = mecanicoInputText;
        fill = mecanicoInputFill;
        break;
      case "Concesionario":
        input = concesionarioInputText;
        fill = concesionarioInputFill;
        break;
      case "Compra":
      	input = null;
      	fill = compraInputFill;
    }

	var i;
	var j;

	if(input){
		for(i = 0; i < input.length; i++){
			$("#filtros").append('<label for="'+ input[i] +'">'+ input[i] +'</label><input id="'+ input[i] +'" type="text" name="'+ input[i] +'" class="form-control" placeholder="'+ input[i] +'">')
		}
	}

	if(fill){
		for(j = 0; j < fill.length; j++){
			globalCount = j;
			if(fill[globalCount] === "Coche"){
				$.ajax({url: ip+"/nullCoches", async:false,success: function(data){
		        	$("#filtros").append('<label for "' + fill[globalCount] + '">' + fill[globalCount] + '</label><select id="' + fill[globalCount] + '" class="form-control"></select>');
					$("#" + fill[globalCount]).append('<option value="#">Seleccione una opcion</option>');
		    		var keys = Object.keys(data);
		    		keys.forEach(function(key){
		    			console.log(data[key].IdCoche);
		    			$("#"+ fill[globalCount]).append('<option value="' + String(data[key].IdCoche) + '">' + data[key].IdCoche + '</option>');
		    		});
		    	}});
			}else{
				$.ajax({url: ip+"/distinct/"+ getTableName(fill[globalCount]) + "/" + getColName(fill[globalCount]), async:false,success: function(data){
		        $("#filtros").append('<label for "' + fill[globalCount] + '">' + fill[globalCount] + '</label><select id="' + fill[globalCount] + '" class="form-control"></select>');
				$("#" + fill[globalCount]).append('<option value="#">Seleccione una opcion</option>');
				var contador = 1;
				data.forEach(function(each){
					var keys = Object.keys(each);
					keys.forEach(function(key){
						if(fill[globalCount] == "Marca" || fill[globalCount] == "Modelo"){
							$("#"+ fill[globalCount]).append('<option value="' + each[key] + '">' + each[key] + '</option>');
						}else{
							$("#"+ fill[globalCount]).append('<option value="' + String(contador) + '">' + each[key] + '</option>');
						}
						contador++;
					})
				})
		    }});
			}
		}
	}
	$("#filtros").append('<button class="btn boton" onclick="insertOnTable(\''+ table +'\')">Agregar</button>');
}

function getColName(table){
	var response;

	switch(table){
		case "Ubicacion":
			response = "DireccionExacta";
			break;
		case "Color":
			response = "Nombre";
			break;
		case "Taller":
			response = "IdTaller";
			break;
		case "Concesionario":
			response = "Nombre";
			break;
		case "Cliente":
			response = "Nombre";
			break;
		case "Coche":
			response = "Matricula";
			break;
		default:
			response = String(table);
			break;
	}

	return response;
}

function getTableName(field){
	var response;

	switch(field){
		case "Marca":
			response = "Coche";
			break;
		case "Modelo":
			response = "Coche";
			break;
		default:
			response = String(field);
			break;
	}

	return response;
}

function insertOnTable(tableName){
	var jsonArray = [];
	var serverJson = {};
	var jsonToInsert = {};
	var fillFields;
	var textFields;

	switch(tableName) {
      case "Cliente":
        textFields = clientInputText;
        fillFields = clientInputFill;
        break;
      case "Coche":
        textFields = cocheInputText;
        fillFields = cocheInputFill;
        break;
      case "Mecanico":
        textFields = mecanicoInputText;
        fillFields = mecanicoInputFill;
        break;
      case "Concesionario":
        textFields = concesionarioInputText;
        fillFields = concesionarioInputFill;
        break;
      case "Compra":
      	textFields = null;
      	fillFields = compraInputFill;
    }

	if(fillFields){
		fillFields.forEach(function(field){
			if(tableName === "Coche"){
				if(field == "Marca" || field == "Modelo"){
					jsonToInsert[field] = $("#"+field).val();
				}else{
					jsonToInsert["Id" + field] = $("#"+field).val();
				}
			}else{
				jsonToInsert["Id" + field] = $("#"+field).val();
			}
		});
	}

	if(textFields){
		textFields.forEach(function(field){
			jsonToInsert[field] = $("#"+field).val();
		});
	}

	serverJson["values"] = "["+JSON.stringify(jsonToInsert)+"]";

	if(tableName === "Compra"){
		alert("Llamo mi sp");
		alert(JSON.stringify(jsonToInsert));
		$.post(ip + "/comprar", jsonToInsert);
	}else{
		$.post(ip + "/create/" + tableName, serverJson);
	}
}