var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.header("Content-Type", "application/*+json");
  req.header("Accept", "application/json");
  next();
});

app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
//app.use(express.static('./dist/'));

// app.get('/', function (req, res) {
//   res.render('./dist/index.html', {});
// });


const slug = '/test';

var categoryController = require('./category/categoryController')
app.use(slug + '/category', categoryController);

var categoryController = require('./user/userController')
app.use(slug + '/user', categoryController);


module.exports = app;
