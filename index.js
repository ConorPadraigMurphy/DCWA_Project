const e = require('express');
var express = require('express')
var app = express();
let ejs = require("ejs");
app.set("view engine", "ejs");

var DAOsql = require("./DAOsql");

app.listen(3004, () => {
    console.log("Server is listening on port 3004 :)");
});

app.get("/", (req, res) => {
    console.log("Get Request Recieved on /")
    res.render("homePage");
})

app.get("/Employees", (req, res) => {
    DAOsql.getEmployees()
        .then((emp) => {
            res.render('employees', { employee: emp })
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else (
                res.send(error)
            )

        })

})

app.get("/Departments", (req, res) => {
    res.send("Departments page")

})

app.get("/EmployeesMongo", (req, res) => {
    res.send("Employees Mongo page")

})