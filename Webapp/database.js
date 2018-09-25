var mysql = require('mysql');
const JSONN = require('circular-json');


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
  selecttPrueba();
 });

async function selecttPrueba(){
  try {
  
    // statements
  var res = await connection.query("SELECT * FROM Cliente");
   console.log("Result api2 : " + JSONN.stringify(res));
    return res ;
  } catch(e) {
    // statements
    console.log(e);
  }
  
}
selecttPrueba().then((mess)=>{
console.log("/////////FUERA DEL CALL /////////////\n"+mess+
  "\n/////FUERA DEL CALL\n");
});
module.exports = {
  connection,
  pr:  function (){
    return 1 
  }
};
