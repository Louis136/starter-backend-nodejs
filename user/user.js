const db = require("../db");
const Functions = require("../helpers/functions");



var client = {
    get: function (req, callback) {
        //getting all our stuff in the body with some condition
        var body = (typeof req.body != "undefined") ? Functions.cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined") && Array.isArray(body.where) && body.where.length > 0 ? body.where : ""
        // only deserve to precise SQL columns to get, if only is not in the body it'll replace by a SQL * 
        let only = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; 
        // generating arrays composed by SQL piece of queries, they'll be .join() after.
        var whereSend = Functions.WhereSql(where);

        (whereSend.length > 0) ? db.query("SELECT " + only + " FROM client WHERE " + whereSend.join(" AND "), function (err, rows) {
            if (err) callback(err)
          else{
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            return callback(null, result)
          }
      
        }) : db.query("SELECT " + only + " FROM user ", function (err, rows) {
            if (err) callback(err)
         else{
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            return callback(null, result)
         }
        });
    },

    insert: function (req, callback) {
        //getting all our stuff in the body with some condition
        var body = (typeof (req.body) != 'undefined') ? Functions.cleanQuery(req.body) : req;
        var insertObj =  (typeof body.insert != "undefined") ?  body.insert : {}

        // generating arrays composed by SQL piece of queries, they'll be .join() after.
        let insert = Functions.InsertSql(insertObj)
      

    
        return db.query(
            "INSERT INTO user (" +
            insert.keys.join(",") +
            ") VALUES  (" +
            insert.values.join(",") +
            ")",
            callback
        );
    },

    update: function (req, callback) {

      
        var body = (typeof (req.body) != 'undefined') ? Functions.cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined")  ? body.where : ""   
        var update =  (typeof body.update != "undefined") && Array.isArray(body.update) && body.update.length > 0 ? body.update : ""
        var whereSend = Functions.WhereSql(where);
        var updateSend = Functions.UpdateSql(update)
        // condition on the callback 
        console.log("UPDATE user SET " + updateSend.join(" , ") + " WHERE "+ whereSend.join(" AND "));
        return  updateSend.length>0 && whereSend.length>0 ? db.query("UPDATE user SET " + updateSend.join(" , ") + " WHERE "+ whereSend.join(" AND "), callback) : callback("no update")
    },

    delete : function(req,callback){

   
        var body = (typeof req.body != "undefined") ? Functions.cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined") && Array.isArray(body.where) && body.where.length > 0 ? body.where : ""

        var whereSend = Functions.WhereSql(where);
        console.log("DELETE FROM user WHERE " + whereSend.join(" AND "))
        return (whereSend.length > 0) ? db.query("DELETE FROM user WHERE " + whereSend.join(" AND "),callback) :  callback("no delete");    
    },

}

module.exports = client