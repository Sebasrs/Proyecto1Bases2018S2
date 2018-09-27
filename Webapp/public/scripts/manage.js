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
      case "cliente":
        input = clientInputText;
        fill = clientInputFill;
        break;
      case "coche":
        input = cocheInputText;
        fill = cocheInputFill;
        break;
      case "mecanico":
        input = mecanicoInputText;
        fill = mecanicoInputFill;
        break;
      case "concesionario":
        input = concesionarioInputText;
        fill = concesionarioInputFill;
        break;
      case "compra":
      	input = compraInputFill;
      	fill = null;
    }

	var i;
	var j;

	for(i = 0; i < input.length; i++){
		$("#filtros").append('<label for="'+ input[i] +'">'+ input[i] +'</label><input id="'+ input[i] +'" type="text" name="'+ input[i] +'" class="form-control" placeholder="'+ input[i] +'">')
	}

	if(fill){
		for(j = 0; j < fill.length; j++){
			globalCount = j;
			$.ajax({url: ip+"/distinct/"+ getTableName(fill[globalCount]) + "/" + getColName(fill[globalCount]), async:false,success: function(data){
		        $("#filtros").append('<label for "' + fill[globalCount] + '">' + fill[globalCount] + '</label><select id="' + fill[globalCount] + '" class="form-control"></select>');
				$("#" + fill[globalCount]).append('<option value="#">Seleccione una opcion</option>');
				data.forEach(function(each){
					var keys = Object.keys(each);
					keys.forEach(function(key){
						$("#"+ fill[globalCount]).append('<option value="' + each[key] + '">' + each[key] + '</option>');
					})
				})
		    }});
		}
	}
	$("#filtros").append('<button class="btn boton" onclick="insertOnTable()" >Buscar</button>');
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

function insertOnTable(){
}