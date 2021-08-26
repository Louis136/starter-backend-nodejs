# starter-backend-nodejs
starter pack to create backend 

create db.js 
exemple of one : 


--------------------------------------


var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port:  3308,
    password: '',
    database: 'tryqrcode'
});


module.exports = connection;


--------------------------------------

npm i 
