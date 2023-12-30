var pmysql = require('promise-mysql')
var pool;

pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2023'
})
    .then((p) => {
        pool = p
    })
    .catch((e) => {
        console.log("pool error:" + e)
    })


function displayStores() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM store')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function displayProducts() {
    return new Promise((resolve, reject) => {
        //LOOK FOR A BETTER QUERY
        pool.query('select distinct p.pid, p.productdesc, ps.sid, s.location, ps.price from product p inner join product_store ps inner join store s order by p.pid;')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { displayStores, displayProducts }