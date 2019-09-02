var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var session = require("express-session");
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var db = require("./models");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var PORT = process.env.PORT || 3000;

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
app.set("views", "app/views");

app.use(express.static(__dirname + "/public"));

<<<<<<< HEAD
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

=======
app.use(function(req, res, next) {
  if (req.session.user_id !== undefined) {
    next();
  } else if (req.path === "/signin") {
    next();
  } else if (req.path === "/signup") {
    next();
  } else {
    res.redirect("/signin");
  }
});

app.get("/signup", function(req, res, next) {
  res.render("signup");
});
app.get("/", (req, res, next) => {
  res.redirect("/signup");
});
app.get("/signin", function(req, res, next) {
  res.render("signin", {
    error_message: " "
  });
});

app.post("/signin", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  db.user.findOne({ where: { email: email } }).then(function(user) {
    if (user != null) {
      bcrypt.compare(password, user.password_hash, function(err, matched) {
        if (matched) {
          // set user_id in the session
          req.session.user_id = user.id;
          // redirect to welcome page
          res.redirect("/dashboard");
        } else {
          // render the login form
          res.render("signin", { error_message: "Bad Password" });
        }
      });
    } else {
      res.render("signin", { error_message: "User Not Found" });
    }
  });
});

app.post("/signup", function(req, res) {
>>>>>>> master
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
<<<<<<< HEAD
=======

>>>>>>> master
  var location = req.body.location;
  location = location.substr(0, location.indexOf(","));
  bcrypt.hash(password, 10, function(err, hash) {
    db.user
      .create({
        email: email,
        password_hash: hash,
        firstName: firstName,
        lastName: lastName,
        location: location
      })
      .then(function(user) {
        req.session.user_id = user.id;
        res.redirect("/dashboard");
      });
  });
});

<<<<<<< HEAD
  // create new user in db with encrypted password
  bcrypt.hash(password, 10, function (err, hash) {
    db.user.create({ email: email, password_hash: hash, firstName: firstName, lastName: lastName, location: location }).then(function (user) {
      req.session.user_id = user.id; // set session for the signed in user
      // When user successfully created, use the user's id to populate the
      // card_locations table with the location entered at signup
      db.card_locations.create({ id: req.session.user_id, location_1: req.session.location })
      // Signup location is not being pulled into the card_locations table

      // Send the first location to the default card on the dashboard

      // Need to check for other locations in the card_locations table

      // If other locations exist in the table, create cards for each location
      // up to 5 total
      res.redirect("/dashboard");
    });
  });
});

// Sign-in section
app.get("/signin", function (req, res, next) {
  res.render("signin", { error_message: " " });
=======
app.get("/dashboard", function(req, res, next) {
  var user_id = req.session.user_id;

  db.user
    .findByPk(user_id)
    .then(function(user) {
      var firstName = user.firstName;
      var location = user.location;
      res.render("dashboard", {
        firstName: firstName,
        location: location
      });
    })
    .then(function(user) {});
>>>>>>> master
});

app.post("/signin", function(req, res) {
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

    // how is the city name stripped out of the entire location input?
    var city = user.location;

    res.render('dashboard', {
      firstName: name
    }, 'cards', {
        location: city
      })
    // Render the individual cards for the locations in the table
    res.render('cards', {

    })

  })
});

<<<<<<< HEAD
// Add card for initial location and one card per check weather button press (up to 5 total)
// Cards should populate using the openweather API information
var cards = [];

// Sign-out section
app.get("/signout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/signin");
})



app.listen(3000, function () {
=======
app.listen(PORT, function() {
>>>>>>> master
  console.log("listening on port 3000...");
});
