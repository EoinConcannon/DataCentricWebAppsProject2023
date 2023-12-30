const express = require('express')
let ejs = require('ejs');

const app = express()
app.set('view engine', 'ejs')

const port = 3000

app.get('/', (req, res) => {
    res.render("homepage")
})

app.get('/stores', (req, res) => {
    res.send('<h1>Stores</h1>')
})

app.get('/stores/edit/:sid', (req, res) => {
    res.send('<h1>Edit Stores</h1>')
})

//POST stores/edit/:sid

app.get('/products', (req, res) => {
    res.send('<h1>Products</h1>')
})

app.get('/products/delete/:pid', (req, res) => {
    res.send('<h1>Delete Products</h1>')
})

app.get('/managers', (req, res) => {
    res.send('<h1>Managers</h1>')
})

app.get('/managers/add', (req, res) => {
    res.send('<h1>Add Managers</h1>')
})

//POST managers/add

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})