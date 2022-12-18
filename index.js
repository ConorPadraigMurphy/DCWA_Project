const e = require('express');
var express = require('express')
var app = express();
let ejs = require("ejs");
app.set("view engine", "ejs");

var mySQLDAO = require("./DAOsql");

app.listen(3004, () => {
    console.log("Server is listening on port 3004 :)");
});

app.get('/', (req, res) => {
    console.log("Get Request Recieved on /")
    res.render('homePage');
})

