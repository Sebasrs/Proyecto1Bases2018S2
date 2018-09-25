const mysql = require('mysql2/promise');
let connection;

async function createConnection(){
	try {
	connection = await mysql.createConnection({
    host: "g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  	user: "coesgrmbpol1e57z",
  	password: "nciusque494b9ikb",
  	database: "xtfq8cowzznl7iwm"
  	});
	} catch(e) {
		// statements
		console.log(e);
	}
	
}

var handle = {

    pr: async function prueba(sql) {

        try {

            // query database
            const [rows, fields] = await connection.query('SELECT * FROM Cliente');
            console.log("rows:" + "\n")
            //console.log(rows);
            console.log("fields" + "\n")
            //console.log(fields)

            return rows;

        } catch (e) {
            // statements
            console.log(e);
        }
        // create the connection
    }

}
console.log("Por aca")

//Crea La conneccion 
createConnection();

module.exports = {
    connection,
    handle
}