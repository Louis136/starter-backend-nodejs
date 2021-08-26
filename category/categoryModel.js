var db = require('../db');
const { createGetQuery, createUpdateInsertQuery, createDeleteQuery } = require('../helpers/generiqueQuery');
const tableName = 'category';
const {isDef} = require("../helpers/utils");

var categoryModel = {
    getCategory: function (req, callback) {
        let query = createGetQuery(req, callback,tableName);
        return db.query(query,  function(err, res){
        if(err) return callback(err, 'ERROR UPDATE ARRAY ACTIVITIES')
        if(isDef(res)) return callback(null, res);
        else{
              return callback(err,"ERROR CANT FIND ID")
          }
        })
    },

    updateInsertCategory: function (req, callback) {
        let query = createUpdateInsertQuery(req, callback, tableName);
        return db.query(query, callback);
    },
 
    deleteCategory: function(req, callback) {
        let query = createDeleteQuery(req, callback, tableName);
        return db.query(query,  function(err, res){
            if(err) return callback(err, 'ERROR UPDATE ARRAY ACTIVITIES')
            if(isDef(res)) return callback(null, res);
            else{
                  return callback(err,"ERROR CANT FIND ID")
              }
            })    }
}
module.exports = categoryModel;
