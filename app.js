var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");

var app = express();
