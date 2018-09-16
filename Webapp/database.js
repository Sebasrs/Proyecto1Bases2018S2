var mysql = require('mysql');

var connection = mysql.createConnection({
  
  host: "g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "coesgrmbpol1e57z",
  password: "nciusque494b9ikb",
  database: "xtfq8cowzznl7iwm"
});

connection.connect(function(err) {
  if (err) 
  	throw err;
  console.log("Connected!");

});

function selectPrueba(){
	connection.query("SELECT * FROM PruebaNoBorrar",function (err,result){
 	if (err) throw err;
    	console.log("Result: " + result);
    	return;
  	});
}


function pruebaEntrada(){
	var adr = '1';
	var sql = 'SELECT * FROM PruebaNoBorrar WHERE valor = ' + mysql.escape(adr);
	connection.query(sql, function (err, result) {
  	if (err) throw err;
  		console.log(result);
  		return result;
	});
}

module.exports = {
	connection

};