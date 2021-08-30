const { isDef, isArrayAndNotEmpty } = require('./utils');
const {cleanQuery} = require('./functions')
var recursiveQuery = {
  
    createGetQuery: function (req, callback,tableName) {
        // WHERE clause possible : "where" :{ "id" : 1 }/  "where" : {"id" : [1,2]} / "where" : {"name" : "lui"}  "where":{"name": {"like" : "e"}}
  // exemple -> { "only": ["nom"], "id": [1, 2]}
        var body = (typeof req.body != "undefined") ? cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined") ? body.where : ""
        let only = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; 
        var whereSend = []
        for (const[key,value] of Object.entries(where)){
            (typeof value == "number" ) ? whereSend.push(key+" = "+value) : null;
            (typeof value == "string" ) ? whereSend.push(key+" = '"+value+"'") : null;
            (Array.isArray(value)) && value.length>0 ? whereSend.push(key+" IN("+value.join(",")+")") : null;
            (typeof value =="object" && typeof value.length == "undefined" ) ? typeof value.like != "undefined" ? whereSend.push(key +" LIKE '%"+value.like+"%'") :null :null
            
        }
let sql = whereSend.length>0 ? "SELECT " + only + " FROM category WHERE " + whereSend.join(" AND ") : "SELECT " + only + " FROM user "
console.log(sql)
return sql

    },

    createUpdateInsertQuery: function (req, callback, tableName) {
        let body = isDef(req.body) ? req.body : req;
        if (isArrayAndNotEmpty(body)) {
            let valuesTable = [];
            let valuesEntries = [];
            let keyUpdate = [];
            // [{"id": 1, "idItems": "c lid", "nom": "trnk"}, {"id": 2, "idItems": "hello lid", "nom": "pppp"}]
            body.forEach((el, index) => {
                if (isDef(el.id)) {
                    let i = 1;
                    let maxLength = Object.keys(el).length;
                    for (const [key, value] of Object.entries(el)) {
                        if (index == 0) {
                            keyUpdate.push(
                                key + "=VALUES(" + key + ")"
                            );
                            if (i == 1) {
                                valuesTable.push(
                                    " (" + key + ""
                                );
                            } else if (i < maxLength) {
                                valuesTable.push(
                                    key + ""
                                );
                            } else {
                                valuesTable.push(
                                    key + ") "
                                );
                            }
                        }
                        if (isDef(value)) {
                            if (i == 1) {
                                if(key="id"){
                                    valuesEntries.push(
                                        "(" + value + ""
                                    );
                                }else{
                                    valuesEntries.push(
                                        "('" + value + "'"
                                    );
                                }
                            
                            } else if (i < maxLength) {
                                switch (typeof value) {
                                    case "number":
                                        valuesEntries.push(
                                            value + ")"
                                        );
                                        break;
                                    case "string":
                                        valuesEntries.push(
                                            "'" + value + "')"
                                        );
                                        break;
                                    case "object" :
                                       valuesEntries.push("'"+JSON.stringify(value)+"')"
                                        );
                                        break;
                                }
                            } else {
                                switch (typeof value) {
                                    case "number":
                                        valuesEntries.push(
                                            value + ")"
                                        );
                                        break;
                                    case "string":
                                        valuesEntries.push(
                                            "'" + value + "')"
                                        );
                                        break;
                                    case "object" :
                                       valuesEntries.push("'"+JSON.stringify(value)+"')"
                                        );
                                        break;
                                }
                            }
                            i++;
                        }
                    }
                } else {
                    callback("MISSING ID");
                }
            });
            let finalStringValues = "";
            let finalStringColumn = "";
            let finalStringUpdate = "";
            finalStringValues = valuesEntries.join(', ');
            finalStringColumn = valuesTable.join(', ');
            finalStringUpdate = keyUpdate.join(', ');
            let queryToReturn = "INSERT INTO " + tableName + finalStringColumn + "VALUES " + finalStringValues + " ON DUPLICATE KEY UPDATE " + finalStringUpdate;
            console.log("insert-update Query -> " + queryToReturn);
            return queryToReturn;
        } else {
            // exemple de body {"id": 4, "idItems": "array id", "nom": "le pur name"}
            let valuesTable = [];
            let valuesEntries = [];
            let keyUpdate = [];
            let i = 1;
            let maxLength = Object.keys(body).length;
            for (const [key, value] of Object.entries(body)) {
                if (isDef(value)) {
                    keyUpdate.push(
                        key + "=VALUES(" + key + ")"
                    );
                    if (i == 1) {
                        valuesTable.push(
                            " (" + key + ""
                        );
                        valuesEntries.push(
                            "(" + value + ""
                        );
                    } else if (i < maxLength) {
                        valuesTable.push(
                            key + ""
                        );
                        if (typeof value == "number") {
                            valuesEntries.push(
                                value + ""
                            );
                        } else {
                            valuesEntries.push(
                                "'" + value + "'"
                            );
                        }
                    } else {
                        valuesTable.push(
                            key + ") "
                        );
                        if (typeof value == "number") {
                            valuesEntries.push(
                                value + ")"
                            );
                        } else {
                            valuesEntries.push(
                                "'" + value + "')"
                            );
                        }
                    }
                } else {
                    callback(null, "ERROR BODY");
                }
                i++;
            }
            let finalStringValues = "";
            let finalStringColumn = "";
            let finalStringUpdate = "";
            finalStringValues = valuesEntries.join(', ');
            finalStringColumn = valuesTable.join(', ');
            finalStringUpdate = keyUpdate.join(', ');
            let queryToReturn = "INSERT INTO " + tableName + finalStringColumn + "VALUES " + finalStringValues + " ON DUPLICATE KEY UPDATE " + finalStringUpdate;
            console.log("insert-update query -> " + queryToReturn);
            return queryToReturn;
        };

    },

    createDeleteQuery: function (req, callback, tableName) {
      // WHERE clause possible : "where" :{ "id" : 1 }/  "where" : {"id" : [1,2]} / "where" : {"name" : "lui"}  "where":{"name": {"like" : "e"}}
        var body = (typeof req.body != "undefined") ? cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined") ? body.where : ""
        let table = [];
        for (const[key,value] of Object.entries(where)){
            (typeof value == "number" ) ? table.push(key+" = "+value) : null;
            (typeof value == "string" ) ? table.push(key+" = '"+value+"'") : null;
            (Array.isArray(value)) && value.length>0 ? table.push(key+" IN("+value.join(",")+")") : null;
            (typeof value =="object" && typeof value.length == "undefined" ) ? typeof value.like != "undefined" ? whereSend.push(key +" LIKE '%"+value.like+"%'") :null :null

        }
   
            let queryToReturn = "DELETE FROM " + tableName + " WHERE " + table.join(" AND ")
            console.log("delete query -> " + queryToReturn);
            return queryToReturn;
    }

};

module.exports = recursiveQuery;