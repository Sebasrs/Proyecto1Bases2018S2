var ip = "http://192.168.100.5:5000";
var tablaActual;
var tablaCliente = [ ["Cedula","text"],["Nombre","text"],["Telefono","number"] ];
var tablaCoche = [ ["Matricula","text"],["Modelo","text"],["Marca","text"],["Kilometros","number"] ];
var tablaMecanico = [ ["Cedula","text"],["Nombre","text"],["Apellido1","text"],["Apellido2","text"],["Salario","number"],["FechaDeContratacion","datime"] ];
var tablaConcesionario = [ ["Nombre","text"] ];

function actualizar() {
  var filtros = {};
  $("#filtros select").each(function(select){
    var nombreFiltro = $(this).attr("id");
    var valorFiltro = $(this).val();
    if(valorFiltro !== "#"){
      filtros[nombreFiltro] = valorFiltro;
  }
  var valores = {};
  $("#tabla input").each(function(select){
    var nombreFiltro = $(this).attr("id");
    var valorFiltro = $(this).val();
    if(valorFiltro !== "#"){
      filtros[nombreFiltro] = valorFiltro;
  }
  var envio = { "where" : JSON.stringify(filtros), "set" : JSON.stringify(valores) };
  $.post(ip + "/update/" + tablaActual, envio, function(info){
    alert(info);
  });
}

function obtenerFiltros() {
  var filtros = {};
  $("#filtros select").each(function(select){
    var nombreFiltro = $(this).attr("id");
    var valorFiltro = $(this).val();
    filtros[nombreFiltro] = valorFiltro;
  });
  return filtros;
}

function eliminarRepetidos(id, element) {
  var textos = [];
  $(id).each(function(element) {
    var texto = $(this).val();
    if(textos.includes(texto)){
      $(this).remove();
    }
    else{
      textos.push(texto);
    }
  });
}

function mostrarFiltros(nombreTabla) {
  $("#filtros").html('');
  $("#tabla").html('');
  tablaActual = nombreTabla;
  $.get( "http://192.168.100.11:5000/get/" + nombreTabla, function(data) {
    var keys = obtenerLlaves(data[0]);
    for(keyIndex in keys) {
      $("#filtros").append('<label for="' + keys[keyIndex] + '">' + keys[keyIndex] + '</label>');
      $("#filtros").append('<select class="lista form-control" id="' + keys[keyIndex] + '">');
      $("#" + keys[keyIndex]).append('<option value="#">Sin filtro</option>');
      for(index in data) {
        $("#" + keys[keyIndex]).append('<option value="' + data[index][keys[keyIndex]] + '">' + data[index][keys[keyIndex]] + '</option>');
      }
      eliminarRepetidos("#" + keys[keyIndex] + " option", "option");
    }
  });
  agregarCampos(nombreTabla);
}

function agregarCampos(nombreTabla) {
  var entradas;
  switch(nombreTabla) {
    case "Cliente":
      entradas = tablaCliente;
      break;
    case "Coche":
      entradas = tablaCoche;
      break;
    case "Mecanico":
      entradas = tablaMecanico;
      break;
    case "Concesionario":
      entradas = tablaConcesionario;
      break;
  }
  for(index in entradas) {
    var entrada = entradas[index];
    $("#tabla").append('<input type="' + entrada[1] + '" class="form-control" id="' + entrada[0] + '">');
  }
}
