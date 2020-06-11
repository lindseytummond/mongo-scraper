// Dependencies
const express = require("express"); 
var exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio"); 

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// API Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
// If deployed, use the depoyed database.  Otherwise, use the local scraper db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

// Start server
app.listen(PORT, function() {
    console.log("App running on " + PORT + "...Click on the link" + "http://localhost:3000");
});