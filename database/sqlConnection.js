
var pg = require("pg");

var client = new pg.Client({
  host: 'localhost', 
  // user: 'dbacai99', 
  // port: 5432
  user:'dbacai99',
  database: 'gallery',
  password:'makeWork99' 
}); 
client.connect((err)=>{
  if (err) {
    console.log('error connecting from DATABASE index.js: ', err);
    return;
  }
  console.log ("============connected to POSTGRESQL DATABASE================");
});

const getListing = (cb, id) =>{
  console.log('idddddd', id)
  client.query((`SELECT * from photos where foreign_listing_id= ${id}`), (err, res) => {
    console.log('hiiiiiiiiiiiiiiiiio')
    if (err) {
      console.log('ERROR from getQuery in db connection', err.stack)
      cb(err.stack,null)
    } else {
      console.log('watttttt',res.rows)
      cb(null,res.rows); 
    }
  })
}


module.exports = {getListing:getListing}


