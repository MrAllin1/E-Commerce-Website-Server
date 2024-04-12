
var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    database:'e_commerce_database',
    user:'root',
    password:'password',    
});

module.exports=connection;