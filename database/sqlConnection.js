
var pg = require("pg");
// var cs = require("./connectionStringPostgreSQL.js")
 
// var connectionString = cs

var client = new pg.Client({
  user: 'dbacai99',
  host: 'localhost',
  database: 'gallery',
  password:'',
  port: 5432
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
      console.log('ERROR from getQuery in db connection', err)
      return err.stack
    } else {
      // console.log(res)
      cb(err,res.rows); //must invoke with err bc you have two params
      
    }
  })
}


module.exports = {getListing:getListing}




//   client = new Client({
//     host: '/cloudsql/myproject:zone:mydb'
//     username: 'username',
//     password: 'password',
//     database: 'database_name',
// }); ubuntu