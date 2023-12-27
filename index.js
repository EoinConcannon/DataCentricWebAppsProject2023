const express = require('express')
let ejs = require('ejs');

const app = express()
app.set('view engine', 'ejs')

const port = 3000

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/stores', (req, res) => {
    res.send('<h1>Stores</h1>')
})

app.get('/products', (req, res) => {
    res.send('<h1>Products</h1>')
})

app.get('/managers', (req, res) => {
    res.send('<h1>Managers</h1>')
})

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})