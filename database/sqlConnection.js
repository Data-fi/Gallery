
var pg = require("pg");
// var cs = require("./connectionStringPostgreSQL.js")
 
// var connectionString = cs

var client = new pg.Client({
  user: 'dbacai99', //postgres
  host: 'localhost',
  database: 'gallery',
  password:'' //pw
 //same pport as server?
}); //creating connection //set of procedures that you're opening to use with node to interact with postgres
client.connect((err)=>{
  if (err) {
    console.log('error connecting from DATABASE index.js: ', err);
    return;
  }
  console.log ("============connected to POSTGRESQL DATABASE================");//starting the connection
});




//using callback for get req
const getListing = (cb, id) =>{
  client.query((`SELECT * from photos where foreign_listing_id= ${id}`), (err, res) => {
    if (err) {
      console.log('ERROR from getQuery in db connection', err.stack)
      cb(err.stack,null)
    } else {
      // console.log(res)
      cb(null,res.rows); //must invoke with err bc you have two params
      
    }
  })
}


module.exports = {getListing:getListing}


