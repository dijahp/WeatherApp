var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var session = require("express-session");
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var db = require("./models");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var axios = require("axios");

var city = "Atlanta";

var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=8e9a4b4545a680355a95d6c810a6f708`;

var sessionStorage = new SequelizeStore({
  db: db.sequelize
});

var app = express();

app.use(cookieParser());

app.use(
  session({
    secret: "appSecret",
    resave: false,
    saveUninitialized: true,
    store: sessionStorage
  })
);

sessionStorage.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(__dirname + "/public"));

app.get("/signup", function(req, res, next) {
  res.render("signup");
});
app.get("/", (req, res, next) => {
  res.redirect("/signin");
});
app.get("/signin", function(req, res, next) {
  res.render("signin");
});

app.get("/dashboard", function(req, res, next) {
  res.render("dashboard", {});
});

var cards = [];

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

app.post("/signin", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  console.log(email);
  console.log(password);
});

app.listen(3000, function() {
  console.log("listening on port 3000...");
});
