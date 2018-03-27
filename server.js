const express = require("express")
const bodyParser = require("body-parser")
const expressHandlebars = require("express-handlebars")
const mongoose = require("mongoose")
const routes = require("./controllers/controller.js")


const PORT = process.env.PORT || 3002;

const app = express();

// view engine
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// make this folder availible on the front-end
app.use(express.static("public"));

app.use(routes)

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrapeAndMongoDB");

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });