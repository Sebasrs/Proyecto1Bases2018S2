var ip = "http://192.168.100.11:5000";

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
      return "";
      break;
    case 9:
      return "";
      break;
    case 10:
      return "";
      break;
  }
}

function ejecutarPrueba(numeroPrueba) {
  $("#tabla").html('');
  var key = obtenerExtension(numeroPrueba);
  $.get(ip + "/otros/" + key, function(data){
    console.log(data);
    
  });
}
