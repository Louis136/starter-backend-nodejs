var Utils = {
    cleanQuery: function (query) {
        var query_clean = query;
        for (const i in query_clean) {
            if (typeof (query_clean[i]) == "string") {
                if (query_clean[i].indexOf("'")) {
                    query_clean[i] = query_clean[i].replace("'", "''");

                }
            }
        }
        return query_clean;
    },
    isDefArray: function (val) {

        if (typeof val == 'undefined') return false
        if (!Array.isArray(val)) return false
        if (val.length == 0) return false
        if (!(val.every(el => typeof el != 'undefined'))) return false

        return true
    },


    isDef: function (val) {
        return Array.isArray(val)
            ? (val.every(el => typeof el != 'undefined'))
            : typeof val != 'undefined';
    },

    isArrayAndNotEmpty: function (arr) {
        return Array.isArray(arr) && arr.length > 0
    },

    createGetQuery: function (req) {
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
        console.log('query getCategory->', query);
    }
  
}

module.exports = Utils;