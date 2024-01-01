const express = require('express')
let ejs = require('ejs');
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')


const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

app.get('/', (req, res) => {
    res.render("homepage")
})

app.get('/stores', (req, res) => {
    mySQLDAO.displayStores()
        .then((data) => {
            res.render("stores", { "stores": data })
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/stores/edit/:sid', (req, res) => {
    var currentStore = {
        values: [req.body.sid,
        req.body.location,
        req.body.mgrid]
    }
    res.render("storesEDIT", { "storesEDIT": currentStore })
})

app.post('/stores/edit/:sid', (req, res) => {
    sidVAR = req.body.sid
    locationVAR = req.body.location 
    mgridVAR = req.body.mgrid
    
    mySQLDAO.editStores(sidVAR, locationVAR, mgridVAR)
        .then((data) => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    res.redirect('/stores')
})

app.get('/products', (req, res) => {
    var editStoreID = req.params.sid
    mySQLDAO.displayProducts(editStoreID)
        .then((data) => {
            res.render("products", { "products": data })
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/products/delete/:pid', (req, res) => {
    var pidDELETE = req.params.pid

    mySQLDAO.deleteProducts(pidDELETE)
        .then((data) => {
            console.log(data)
            res.redirect('/products')
        })
        .catch(error => {
            console.log(error)
            res.render("productsDELETE")
        })
})

app.get('/managers', (req, res) => {
    mongoDAO.displayManagers()
        .then((data) => {
            res.render("managers", { "managers": data })
            res.send(data)
        })
        .catch((error) => {
            console.log(error)
        })
})

app.get('/managers/add', (req, res) => {
    res.render("managersADD")
})

app.post('/managers/add', (req, res) => {
    let idADD = req.body._id
    let nameADD = req.body.name
    let salaryADD = req.body.salary

    mongoDAO.addManagers({
        _id: idADD,
        name: nameADD,
        salary: salaryADD
    })
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            console.log(error)
        })
    res.redirect('/managers')
})

app.get('/stores/add', (req, res) => {
    res.render("storesADD")
})

app.post('/stores/add', (req, res) => {
    sidVAR = req.body.sid
    locationVAR = req.body.location 
    mgridVAR = req.body.mgrid

    mySQLDAO.addStores(sidVAR, locationVAR, mgridVAR)
        .then((data) => {

            res.send(data)
        })
        .catch((error) => {
            console.log(error)
        })
    res.redirect('/stores')
})

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})