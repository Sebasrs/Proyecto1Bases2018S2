var filtrosCliente = ["Cedula","Nombre","Telefono"];
var filtrosCoche = ["Matricula","Modelo","Marca","Kilometros","Concesionario"];
var filtrosMecanico = ["Cedula","Nombre","Apellido1","Apellido2","FechaDeContratacion","Salario"];
var filtrosConcesionario = ["Nombre"];

function solicitarTabla() {
  var filtro = {};
  $("#filtros select").each(function(select){
    var nombreFiltro = $(this).attr("id");
    var valorFiltro = $(this).val();
    filtro[nombreFiltro] = valorFiltro;
  });
  
}

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
    $("#filtros").append('<button class="btn boton" onclick="solicitarTabla()" >Buscar</button>');
  });
}
