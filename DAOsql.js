var pmysql = require("promise-mysql")
var pool
pool = pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proj2022'
})
    .then((p) => {
        pool = p
    })
    .catch((e) => {
        console.log("pool error:" + e)
    })

var getEmployees = function(){
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM employee")
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })

    })


}
module.exports = { getEmployees }