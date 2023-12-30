const express = require('express')
let ejs = require('ejs');
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')


const app = express()
app.set('view engine', 'ejs')

const port = 3000

app.get('/', (req, res) => {
    res.render("homepage")
})

app.get('/stores', (req, res) => {
    mySQLDAO.displayStores()
        .then((data) => {
            res.render("stores", {"stores": data})
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/stores/edit/:sid', (req, res) => {
    res.render("storesEDIT")
})

//POST stores/edit/:sid

app.get('/products', (req, res) => {
    mySQLDAO.displayProducts()
        .then((data) => {
            res.render("products", {"products": data})
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/products/delete/:pid', (req, res) => {
    res.send('<h1>Delete Products</h1>')
})

app.get('/managers', (req, res) => {
    res.render("managers")
})

app.get('/managers/add', (req, res) => {
    res.render("managersADD")
})

//POST managers/add

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})