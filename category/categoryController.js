var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser');
//router.use(express.json());
var categoryModel = require("./categoryModel");

router.post('/', function (req, res) {
    categoryModel.getCategory(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    });
});

router.post('/update-insert', function (req, res) {
    categoryModel.updateInsertCategory(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

router.post('/delete', function (req, res) {
    categoryModel.deleteCategory(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

module.exports = router;