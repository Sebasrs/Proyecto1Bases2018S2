var tablaActual;

function actualizar() {

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
}
