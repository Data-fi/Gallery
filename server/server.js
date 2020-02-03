const newrelic = require("newrelic")
const express = require('express');
const path = require('path');
var cors = require('cors')

const postgresql= require ("../database/sqlConnection.js");


const PORT = 3001;
const app = express();

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
            res.status(200).send(dbObj)
        }
    }, id)
}) 



app.listen(PORT, () => { 
        console.log('Express is Listening on hi:', PORT)
    }
);