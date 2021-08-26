var db = require('../db');
const { isDef, isArrayAndNotEmpty } = require("../helpers/utils");
const { createGetQuery, createUpdateInsertQuery, createDeleteQuery } = require("../helpers/recursiveQuery");
const tableName = "tbl_category";

var categoryModel = {
    getCategory: function (req, callback) {
         // rajouter dans le body -> "only": ["name"] <- où name correspond aux noms de colonnes que l'on veut ressortir
        let query = createGetQuery(req, tableName);
        return db.query(query, callback)
    },

    updateInsertCategory: function (req, callback) {
        let query = createUpdateInsertQuery(req, callback, tableName);
        return db.query(query, callback);
    },
    
    deleteCategory: function(req, callback) {
        let query = createDeleteQuery(req, callback, tableName);
        return db.query(query, callback);
    }
}

module.exports = categoryModel;