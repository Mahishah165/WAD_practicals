const express = require('express')
const mongoose = require('mongoose')
const empRouter = require('./Routes/employeeRoute.js');

const app = express();

app.use(express.json());

//connection
mongoose.connect('mongodb://127.0.0.1:27017/W20')
.then(()=>console.log("Mongo Connected"))
.catch(error=>{
    console.error("Error",error);
});

//router
app.use('/',empRouter);

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});