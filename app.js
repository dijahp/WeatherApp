var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "app/views");

app.get("/signup", function(req, res, next) {});

app.get("/signup", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var units = req.body.units;
  var location = req.body.location;

  console.log(email);
  console.log(firstName);
  console.log(password);
  console.log(lastName);
  console.log(unit);
  console.log(location);
});

app.listen(3000, function() {
  console.log("listening on port 3000...");
});
