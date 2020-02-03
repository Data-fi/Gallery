
var pg = require("pg");

var client = new pg.Client({
  host: 'localhost', 
  user:'dbacai99',
  database: 'gallery',
  password:'' 
}); 
client.connect((err)=>{
  if (err) {
    console.log('error connecting from DATABASE index.js: ', err);
    return;
  }
  console.log ("============connected to POSTGRESQL DATABASE================");
});

const getListing = (cb, id) =>{

  client.query((`SELECT * from photos where foreign_listing_id= ${id}`), (err, res) => {

    if (err) {
      console.log('ERROR from getQuery in db connection', err.stack)
      cb(err.stack,null)
    } else {
      cb(null,res.rows); 
    }
  })
}


module.exports = {getListing:getListing}


