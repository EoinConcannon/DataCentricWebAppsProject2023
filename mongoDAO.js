const MongoClient = require('mongodb').MongoClient

var coll

//mongoimport --db=managersDB --collection=managers --file=C:\Users\DCwa2023\Downloads\proj2023MongoDB.json
//FIX THIS

MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
        db = client.db('managersDB')
        coll = db.collection('managers')
    })
    .catch((error) => {
        console.log(error.message)
    })

module.exports = {  } 