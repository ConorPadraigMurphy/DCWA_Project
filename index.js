const e = require('express');
var express = require('express')
var app = express();
let ejs = require("ejs");
app.set("view engine", "ejs");

var DAOsql = require("./DAOsql");
var DAOmongo = require("./DAOmongo");
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
            res.render('employees', { employees: emp })
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
    DAOsql.getDepartments()
        .then((dep) => {
            res.render('departments', { departments: dep })
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

app.get("/EmployeesMongo", (req, res) => {
    DAOmongo.findAll()
        .then((monemp) => {
            res.render('employeesmongo', { employeesmongo: monemp })
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

app.get("/EmployeesMongo", (req, res) => {
    res.send("Employees Mongo page")

})