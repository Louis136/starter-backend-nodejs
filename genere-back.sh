#!/bin/bash
for var in "$@"
do
    mkdir ${var}
	cd ${var}
	touch ${var}Model.js
	echo "var db = require('../db');" > ${var}Model.js
    echo "const { createGetQuery, createUpdateInsertQuery, createDeleteQuery } = require('../helpers/generiqueQuery');" >> ${var}Model.js
    echo "const tableName = '${var}';" >> ${var}Model.js
    echo " " >> ${var}Model.js
    echo "var ${var}Model = {" >> ${var}Model.js
    echo "    get${var^}: function (req, callback) {" >> ${var}Model.js
    echo "        let query = createGetQuery(req, tableName);" >> ${var}Model.js
    echo "        return db.query(query, callback)" >> ${var}Model.js
    echo "    }," >> ${var}Model.js
    echo " " >> ${var}Model.js
    echo "    updateInsert${var^}: function (req, callback) {" >> ${var}Model.js
    echo "        let query = createUpdateInsertQuery(req, callback, tableName);" >> ${var}Model.js
    echo "        return db.query(query, callback);" >> ${var}Model.js
    echo "    }," >> ${var}Model.js
    echo " " >> ${var}Model.js
    echo "    delete${var^}: function(req, callback) {" >> ${var}Model.js
    echo "        let query = createDeleteQuery(req, callback, tableName);" >> ${var}Model.js
    echo "        return db.query(query, callback);" >> ${var}Model.js
    echo "    }" >> ${var}Model.js
    echo "}" >> ${var}Model.js
    echo "module.exports = ${var}Model;" >> ${var}Model.js
    touch ${var}Controller.js
    echo "var express = require('express');" > ${var}Controller.js
    echo "var router = express.Router();" >> ${var}Controller.js
    echo "var ${var}Model = require('./${var}Model');" >> ${var}Controller.js
    echo " " >> ${var}Controller.js
    echo "router.post('/', function (req, res) {" >> ${var}Controller.js
    echo "    ${var}Model.get${var^}(req, function(err, rows){" >> ${var}Controller.js
    echo "        if(err) res.status(400).json(err);" >> ${var}Controller.js
    echo "        else res.json(rows)" >> ${var}Controller.js
    echo "    });" >> ${var}Controller.js
    echo "});" >> ${var}Controller.js
    echo " " >> ${var}Controller.js
    echo "router.post('/update-insert', function (req, res) {" >> ${var}Controller.js
    echo "    ${var}Model.updateInsert${var^}(req, function(err, rows){" >> ${var}Controller.js
    echo "        if(err) res.status(400).json(err);" >> ${var}Controller.js
    echo "        else res.json(rows);" >> ${var}Controller.js
    echo "    });" >> ${var}Controller.js
    echo "});" >> ${var}Controller.js
    echo " " >> ${var}Controller.js
    echo "router.post('/delete', function (req, res) {" >> ${var}Controller.js
    echo "    ${var}Model.delete${var^}(req, function(err, rows){" >> ${var}Controller.js
    echo "        if(err) res.status(400).json(err);" >> ${var}Controller.js
    echo "        else res.json(rows);" >> ${var}Controller.js
    echo "    });" >> ${var}Controller.js
    echo "});" >> ${var}Controller.js
    echo " " >> ${var}Controller.js
    echo "module.exports = router;" >> ${var}Controller.js
	cd ..
done