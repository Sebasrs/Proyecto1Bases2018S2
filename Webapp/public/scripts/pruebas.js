var ip = "http://192.168.100.11:5000";
var key;
var casosPrueba = 10;

function agregarBotones() {
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
      return "StoreProcedure/LeftJoinNOTNULL";
      break;
    case 9:
      return "StoreProcedure/LikeBetween";
      break;
    case 10:
      return "rightJoin";
      break;
  }
}

function obtenerTabla() {
  $.get("http://192.168.100.5:5000/otros/" + key, function(info){
    console.log(info);
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
