var ip = "http://192.168.100.11:5000";
var key;
var casosPrueba = 10;

function agregarBotones() {
  $("#prueba").remove();
  var i;
  for(i = 1; i <= casosPrueba; i++) {
    $("#filtros").append('<button class="btn boton lista" onclick="ejecutarPrueba(' + i + ')">Caso de Prueba ' + i + '</button>');
  }
}

function obtenerExtension(numeroPrueba) {
  switch(numeroPrueba) {
    case 1:
      return "selfjoin";
      break;
    case 2:
      return "having";
      break;
    case 3:
      return "any";
      break;
    case 4:
      return "all";
      break;
    case 5:
      return "union";
      break;
    case 6:
      return "undefinedFunction";
      break;
    case 7:
      return "view";
      break;
    case 8:
      return "LeftJoinNOTNULL";
      break;
    case 9:
      return "LikeBetween";
      break;
    case 10:
      return "";
      break;
  }
}

function obtenerTabla() {
  $.get(ip + "/otros/" + key, function(info){
    var keys = obtenerLlaves(info[0]);
    var data = new google.visualization.DataTable();
    for(keyIndex in keys) {
      data.addColumn("string", keys[keyIndex]);
    }
    var element = [];
    var elements = [];
    for(index in info) {
      var columna = info[index];
      for(key in keys) {
        var value = columna[keys[key]];
        if(Number.isInteger(value)){
          value = value.toString();
        }
        element.push(value);
      }
      elements.push(element);
      element = [];
    }
    data.addRows(elements);
    var table = new google.visualization.Table(document.getElementById('tabla'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  });
}

function ejecutarPrueba(numeroPrueba) {
  $("#tabla").html('');
  key = obtenerExtension(numeroPrueba);
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(obtenerTabla);
}
