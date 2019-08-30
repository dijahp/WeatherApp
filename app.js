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

app.use(session({
  secret: 'appSecret',
  resave: false,
  saveUninitialized: true,
  store: sessionStorage
}));

sessionStorage.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "app/views");

app.use(express.static(__dirname + "/public"));

// Sign-up section
app.get("/signup", function (req, res, next) {
  if (req.session.user_id) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

app.post("/signup", function (req, res, next) {
  if (req.session.user_id) {
    res.redirect("/dashboard");
    return;
  }

  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var location = req.body.location;

  // create new user in db with encrypted password
  bcrypt.hash(password, 10, function (err, hash) {
    db.user.create({ email: email, password_hash: hash, firstName: firstName, lastName: lastName, location: location }).then(function (user) {
      req.session.user_id = user.id; // set session for the signed in user
      res.redirect("/dashboard");
    });
  });
});

// Sign-in section
app.get("/signin", function (req, res, next) {
  res.render("signin", { error_message: " " });
});

app.post("/signin", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  db.user.findOne({ where: { email: email } }).then(function (user) {
    if (user === null) {
      // need message to say there is no existing user with that login
      res.render("signin", { error_message: "User not found" });
    } else {
      // check password for match
      bcrypt.compare(password, user.password_hash, function (err, matched) {
        if (matched) {
          // set user_id in the session and redirect to dashboard
          req.session.user_id = user.id;
          res.redirect("/dashboard");
        } else {
          // send to signin page
          res.render("signin", { error_message: "Incorrect login entered" });
        }
      });
    }
  });
});


// Dashboard section
app.get("/dashboard", function (req, res, next) {
  if (req.session.user_id === undefined) {
    res.redirect("/signin");
    return;
  }
  var user_id = req.session.user_id;
  db.user.findByPk(user_id).then(function (user) {
    var name = user.firstName;
    res.render('dashboard', {
      firstName: name
    })
  })
});

// Add card for initial location and one card per check weather button press (up to 5 total)
// Cards should populate using the openweather API information
var cards = [];

// Sign-out section
app.get("/signout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/signin");
})



app.listen(3000, function () {
  console.log("listening on port 3000...");
});
