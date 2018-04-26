var express = require("express");
var bodyParser = require("body-parser");
var morgan  = require('morgan')

var app = express();
var PORT = process.env.PORT || 8080; 

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});



