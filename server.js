// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Require axios and cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// API Routes
//---------------------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;

// // // If deployed, use the depoyed database.  Otherwise, use the local scraper db
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// // // Connect to the Mongo DB
// mongoose.connect(MONGODB_URI); 
const MONGODB_URI = 'mongodb+srv://lindseytummond:test@mongo-scraper-cluster.wam9n.mongodb.net/mongoHeadlines?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/mongoHeadlines', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!')
})


app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});

