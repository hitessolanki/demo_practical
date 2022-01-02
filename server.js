var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var sequelize = require('./config/db')

const user = require('./routes/user');

//Compress images size through sharp
app.get(function (req, res) {
  res.send("No Api found");
})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// for parsing application/json
app.use(bodyParser.json());

user(app);
sequelize.sync().then(() => {
  var server = app.listen(2000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("app listening at http://%s:%s", host, port);
  });
});