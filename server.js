var app = require('./app');
var express = require('express');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    app.use(express.urlencoded({extended: false}));
   // app.use(bodyParser.urlencoded({ extended: false }));
               
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
 
});
