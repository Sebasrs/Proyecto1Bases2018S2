var tablaActual;
var filtrosCliente = ["Cedula","Nombre","Telefono"];
var filtrosCoche = ["Matricula","Modelo","Marca","Kilometros"];
var filtrosMecanico = ["Cedula","Nombre","Apellido1","Apellido2","FechaDeContratacion","Salario"];
var filtrosConcesionario = ["Nombre"];

function obtenerLlaves(json){
  var keys = [];
  for(var key in json){
    keys.push(key);
  }
  return keys;
}

function llamarTabla() {
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(dibujarTabla);
}

function dibujarTabla() {
  var filtro = {};
  $("#filtros select").each(function(select){
    var nombreFiltro = $(this).attr("id");
    var valorFiltro = $(this).val();
    if(valorFiltro !== "#"){
      filtro[tablaActual + "." + nombreFiltro] = valorFiltro;
    }
  });
  var envio = {"where" : JSON.stringify(filtro)};
  $.post("http://192.168.100.5:5000/get/" + tablaActual, envio, function(info){
    var data = new google.visualization.DataTable();
    var columnas = info["columnas"];
    var keys = obtenerLlaves(columnas[0]);
    for(var key in keys){
      var k = keys[key];
      columna = k.split(".");
      var valor = columnas[0];
      var tipo = valor[k];
      if(Number.isInteger(tipo)) {
        data.addColumn("number", columna[1]);
      }
      else {
        data.addColumn("string", columna[1]);
      }
    }
    var infoColumnas = [];
    var tempColumna = [];
    for(var columna in columnas) {
      for(var key in keys) {
        var k = keys[key];
        var c = columnas[columna];
        var valor = c[k];
        tempColumna.push(valor);
      }
      infoColumnas.push(tempColumna);
      tempColumna = [];
    }
    data.addRows(infoColumnas);
    var table = new google.visualization.Table(document.getElementById('tabla'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  });
}

function completarLista(nombreTabla){
  tablaActual = nombreTabla;
  $.get( "http://192.168.100.11:5000/get/" + nombreTabla, function(data) {
    var filtros;
    switch(nombreTabla) {
      case "Cliente":
        filtros = filtrosCliente;
        break;
      case "Coche":
        filtros = filtrosCoche;
        break;
      case "Mecanico":
        filtros = filtrosMecanico;
        break;
      case "Concesionario":
        filtros = filtrosConcesionario;
        break;
    }
    $("#filtros").html('');
    var i;
    for(i = 0; i < filtros.length; i++){
      var j;
      var nombreFiltro = filtros[i];
      $("#filtros").append('<label for="' + nombreFiltro + '">' + nombreFiltro + '</label>');
      $("#filtros").append('<select class="lista form-control" id="' + nombreFiltro + '">');
      $("#" + nombreFiltro).append('<option value="#">Seleccione una opcion</option>');
      for(j = 0; j < Object.keys(data).length; j++) {
        var usuario = data[j];
        $("#" + nombreFiltro).append('<option value="' + usuario[nombreFiltro] + '">' + usuario[nombreFiltro] + '</option>');
      }
      var textos = [];
      $("#" + nombreFiltro + " option").each(function(option) {
        var texto = $(this).val();
        if(textos.includes(texto)){
          $(this).remove();
        }
        else{
          textos.push(texto);
        }
      });
    }
    $("#filtros").append('<button class="btn boton" onclick="llamarTabla()" >Buscar</button>');
  });
}
