const MongoClient = require('mongodb').MongoClient

var coll

//mongoimport --db=proj2023MongoDB --collection=managers --file=C:\Users\DCwa2023\Downloads\proj2023MongoDB.json
MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
        db = client.db('proj2023MongoDB')
        coll = db.collection('managers')
    })
    .catch((error) => {
        console.log(error.message)
    })

//displays the list of data from managers collection in MongoDB
var displayManagers = function () {
    return new Promise((resolve, reject) => {
        var cursor = coll.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//adds new data to the managers collection
var addManagers = function (managers) {
    return new Promise((resolve, reject) => {
        coll.insertOne(managers)
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { displayManagers, addManagers } //these functions can be used in index.js