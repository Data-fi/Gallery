const newrelic = require("newrelic")
const express = require('express');
const path = require('path');
var cors = require('cors')

const postgresql= require ("../database/sqlConnection.js");


const PORT = 3001;
const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(cors())
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/listing/:id', express.static(path.join(__dirname, '../public')));
app.use(express.json())

app.get('/currentListing', (req,res)=> {
  
    // console.log('hit gallery print out req from client', req.query.id)
    var id = req.query.id;
    console.log(id)
    postgresql.getListing((err, dbObj)=> {
        if (err) {
            res.status(400).send(err)
            console.log('error from server.js SERVER********',err)
        } else {
            // console.log ('req/db received on server ')
            res.status(200).send(dbObj)
        }
    }, id)
}) //this just get the data for that specific listing and points it towards this endpoint. which you can print out http://localhost:3001/gallery/5



app.listen(PORT, () => { 
        console.log('Express is Listening on hi:', PORT)
    }
);