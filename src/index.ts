import express from 'express';


var connection = require('./database');
const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connection.connect((err:any)=>{
        if(err) throw err;
        console.log('Connected to database');
    });
})