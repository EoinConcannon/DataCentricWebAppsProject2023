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
        //select p.pid, p.productdesc, ps.sid, s.location, ps.price from product p left join product_store ps ON p.pid = ps.pid left join store s ON ps.sid = s.sid order by p.pid;
        pool.query('select p.pid, p.productdesc, ps.sid, s.location, ps.price from product p left join product_store ps ON p.pid = ps.pid left join store s ON ps.sid = s.sid order by p.pid;')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function deleteProducts(pid) {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM product WHERE pid = "${pid}"`)
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function editStores(sidVAR, locationVAR, mgridVAR) {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE store SET location = "${locationVAR}", mgrid = "${mgridVAR}" where sid = "${sidVAR}"`)
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function addStores(sidVAR, locationVAR, mgridVAR) {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO store (sid, location, mgrid) VALUES ("${sidVAR}", "${locationVAR}", "${mgridVAR}");`)
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { displayStores, displayProducts, deleteProducts, editStores, addStores }