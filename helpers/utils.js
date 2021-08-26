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

    getArray: function (res) {
        return Utils.isDef(res) && Array.isArray(res) && res.length > 0
          ? Object.values(JSON.parse(JSON.stringify(res)))
          : []
    },
    
  
}

module.exports = Utils;