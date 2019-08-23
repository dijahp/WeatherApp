var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + "/public"));

app.get("/signup", function(req, res, next) {
  res.render("signup");
});

app.post("/signup", function(req, res) {
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
  console.log(units);
  console.log(location);
});

app.listen(3000, function() {
  console.log("listening on port 3000...");
});
