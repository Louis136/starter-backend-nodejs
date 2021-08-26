const { isDef, isArrayAndNotEmpty } = require('./utils');

var recursiveQuery = {
    // exemple -> { "only": ["nom"], "id": [1, 2]}
    createGetQuery: function (req, tableName) {
        let body = isDef(req.body) ? req.body : req;
        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
        let table = []

        if (isDef(body.id)) {
            (Array.isArray(body.id))
                ? table.push("id IN (" + body.id.join(',') + ")")
                : table.push("id = " + body.id)
        }
        if (!isDef(body.id)) table.push("1")

        let query = "SELECT " + target + " FROM " + tableName + " WHERE " + table.join('AND ')
        console.log('query ' + tableName + ' -> ' + query);
        return query;
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
                                valuesEntries.push(
                                    "(" + value + ""
                                );
                            } else if (i < maxLength) {
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
            console.log("getQuery -> " + queryToReturn);
            return queryToReturn;
        } else {
            // exemple de body {"id": 4, "idItems": "array id", "nom": "le pur name"}
            let valuesTable = [];
            let valuesEntries = [];
            let keyUpdate = [];
            let i = 1;
            let maxLength = Object.keys(body).length;
            for (const [key, value] of Object.entries(body)) {
                if(isDef(value)){
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
                }else{
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

    createDeleteQuery: function(req, callback, tableName){
        let body = isDef(req.body) ? req.body : req;
        let table = [];
        console.log("body", body);
        if (isDef(body.id)) {
            (Array.isArray(body.id))
                ? table.push("id IN (" + body.id.join(',') + ")")
                : table.push("id = " + body.id)
        }
        if (isDef(body.id)) {
            let queryToReturn = "DELETE FROM " + tableName + " WHERE " + table.join(" AND ")
            console.log("delete query -> " + queryToReturn);
            return queryToReturn;
        }
        else return callback("ERROR PARAMETERS")
    }

};  

module.exports = recursiveQuery;