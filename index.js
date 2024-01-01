const express = require('express')
let ejs = require('ejs');
var mySQLDAO = require('./mySQLDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false })) //used for req.body.?

const port = 3000 //input "nodemon" into terminal

//FRONT PAGE
app.get('/', (req, res) => {
    res.render("homepage")
})

//When store link is clicked
app.get('/stores', (req, res) => {
    mySQLDAO.displayStores()
        .then((data) => {
            res.render("stores", { "stores": data })//gets the "stores" ejs file and sends data from the database
        })
        .catch((error) => {
            res.send(error)
        })
})

//When update link is clicked
app.get('/stores/edit/:sid', (req, res) => {
    var currentStore = {
        values: [req.body.sid,
        req.body.location,
        req.body.mgrid]//not working
    }
    res.render("storesEDIT", { "storesEDIT": currentStore })
})

//When add button is clicked
app.post('/stores/edit/:sid', (req, res) => {
    //variables, user gives these values via the input text box
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
    res.redirect('/stores')//brings user back to store page
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

//When products link is clicked
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

app.get('/products/add', (req, res) => {
    res.render("productsADD")
})

app.post('/products/add', (req, res) => {
    //variables, user gives these values via the input text box
    pidVAR = req.body.pid
    productdescVAR = req.body.productdesc
    supplierVAR = req.body.supplier

    mySQLDAO.addProducts(pidVAR, productdescVAR, supplierVAR)
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            console.log(error)
        })
    res.redirect('/products')
})

//When user clicks the "delete (productdesc)" link
app.get('/products/delete/:pid', (req, res) => {
    var pidDELETE = req.params.pid//product ID

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

//When managers link is clicked
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

app.listen(port, () => {
    console.log(`Connected to port ${port}`)//input "nodemon" into terminal
})