var filtrosCliente = ["Cedula","Nombre","Telefono","Ubicacion"];
var filtrosCoche = ["Matricula","Modelo","Marca","Kilometros","Color","Estado","Cliente","Concesionario"];
var filtrosMecanico = ["Taller","Cedula","Nombre","Primer Apellido","Segundo Apellido","Fecha de Contrato","Salario"];
var filtrosConcesionario = ["Nombre","Taller","Ubicacion"];

function completarLista(nombreTabla){
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
    var i;
    for(i = 0; i < filtros.length; i++){
      var j;
      var nombreFiltro = filtros[i];
      for(j = 0; j < data.length; j++) {
        var usuario = data[j];
      }
    }
  });
}
