const express = require('express');
const newrelic = require("newrelic")
const path = require('path');
// const MongoPhoto = require("../database/MongooseConnection.js");
const postgresql= require ("../database/sqlConnection.js");


const PORT = 3001;
const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json())

app.get('/listing/:id', (req,res)=> {
    console.log('hit gallery')
    var id = req.params.id;
    console.log(id)
    postgresql.getListing((err, dbObj)=> {
        if (err) {
            console.log('error from server.js SERVER********',err)
            res.status(400).send(err)
        } else {
            console.log ('Server received data from database', dbObj)
            res.status(200).send(dbObj)
        }
    }, id)
}) //this just get the data for that specific listing and points it towards this endpoint. which you can print out http://localhost:3001/gallery/5

app.listen(PORT, () => { 
        console.log('Express is Listening on :', PORT)
    }
);