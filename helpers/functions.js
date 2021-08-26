
var Functions = {
    dateNow: function (onlyDate = false) {
      var date = new Date();
      var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());
  
      var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
      finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
    
      return finalDate
    },
  
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
  
    WhereSql(where){
        console.log(where)
      var whereSend =[]
        if(where==""){return whereSend}
        else{
            for (const[key,value] of Object.entries(where)){
                console.log(key, value);
                (typeof value == "number" ) ? whereSend.push(key+" = "+value) : null;
                (typeof value == "string" ) ? whereSend.push(key+" = '"+value+"'") : null;
                (Array.isArray(value)) && value.length>0 ? whereSend.push(key+" IN("+value.join(",")+")") : null;
             
            }
         
        return whereSend
        }

    },
    UpdateSql(update){
      var updateSend = []
      if(update != ""){
          update.forEach(el => {
  
              for (const[key,value] of Object.entries(el)){
                // if((value == null || value =="")&&Array.isArray(value)==false){
                //   console.log(value,"first if statement");
                //   updateSend.push(key+" = "+null)
                // }else{
                  (typeof value == "number" ) ? updateSend.push(key+" = "+value) : null;
                  (typeof value == "string" ) ? updateSend.push(key+" = '"+value+"'") : null;
                  (Array.isArray(value)) ? updateSend.push(key+" = '"+JSON.stringify(value)+"'") : null;
                }
          });
          return updateSend
      }else{
        return []
      }
  
    },
    InsertSql(body){
      
      var keys = [];
      var values = [];
      for (const [key, value] of Object.entries(body)) {
          if (value != null && value!="") {
              typeof value == "string"
                  ? values.push("'" + value + "'")
                  : typeof value == "int" ?
                      values.push(value) : values.push("'" + JSON.stringify(value) + "'")
              keys.push(key);
          }
      }
      // keys.push("date_added");
      // values.push("'" + Functions.dateNow() + "'");
      
  let a = {keys : keys,values:values}
  return a
    }
  
  }
  module.exports = Functions
  