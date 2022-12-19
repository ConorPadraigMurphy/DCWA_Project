const e = require('express');
var express = require('express')
var app = express();
let ejs = require("ejs");
app.set("view engine", "ejs");
const { ReturnDocument } = require('mongodb');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const { check, validationResult } = require('express-validator');


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

app.get("/edit/:eid", (req, res) => {
    DAOsql.getEmployeeforUpdate(req.params.eid)
        .then((ee) => {
            res.render('editEmployee', { editEmployee: ee[0] })
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

app.post("/edit/:eid",
    [
        check("ename").isLength({ min: 1 })
            .withMessage("Name should be a minimum of 5 characters.")
    ],
    [
        check("role").contains({ contains: "Manager" })
            .withMessage("Role should be Manager or Employee.")
    ],
    [
        check("salary").isNumeric({ min: 1 })
            .withMessage("Salary should be > 0.")
    ],
    (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            res.render("editEmployee",
                { errors: errors.errors })
        } else {
            DAOsql.updateEmployee(req.body)
                .then((ue) => {
                    console.log("Worked")
                }).catch((error) => {
                    console.log("Did not work")
                })

            res.redirect("/")

        }
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

app.get("/Departments/deleteDepartments/:did", (req, res) => {
    DAOsql.deleteDepartment(req.params.did)
        .then((ed) => {
            res.redirect("/departments")
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else {
                res.render("deleteDepartment")
            }
        })
})

app.get("/EmployeesMongo", (req, res) => {
    DAOmongo.findAll()
        .then((monemp) => {
            res.render("employeesmongo", { employeesmongo: monemp })
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

app.get("/EmployeesMongo/add", (req, res) => {
    res.render("addEmployeeMongo", { addEmployeeMongo: e, errors: undefined })

    console.log(error)
    if (error.errno == 1146) {
        res.send("Invalid table: " + error.sqlMessage)
    }
    else {
        res.send(error)
    }

})

app.post("/EmployeesMongo/add",
    [
        check("_id").isLength({ min: 4 })
            .withMessage("EID must be 4 characters")
    ],
    [
        check("phone").isLength({ min: 5 })
            .withMessage("Phone must be >5 characters")
    ],
    [
        check("email").isEmail()
            .withMessage("Email must be a valid email address.")
    ],
    (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("addEmployeeMongo",
                { errors: errors.errors })
        } else {
            DAOmongo.addEmployee(req.body)
                .then((e) => {
                    console.log("Worked")
                    res.redirect("/EmployeesMongo")
                }).catch((error) => {
                    console.log("Did not work")
                    res.render("errorMessage")
                })
        }


    })

