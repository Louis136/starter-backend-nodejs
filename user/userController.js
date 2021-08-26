var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser');
//router.use(express.json());
var categoryModel = require("./user");


router.post('/', function (req, res) {
    categoryModel.get(req,function(err,rows){
        if(err){ res.status(400).json(err); }
        else{ res.json(rows); }
    });
});

router.post('/insert', function (req, res) {
    categoryModel.insert(req,function(err,rows){
        if(err){ res.status(400).json(err); }
        else{ res.json(rows); }
    });
});

router.post('/update', function (req, res) {
    categoryModel.update(req,function(err,rows){
        if(err){ res.status(400).json(err); }
        else{ res.json(rows); }
    });
});

router.post('/delete', function (req, res) {
    categoryModel.delete(req,function(err,rows){
        if(err){ res.status(400).json(err); }
        else{ res.json(rows); }
    });
});


module.exports = router;