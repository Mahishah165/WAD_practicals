const express = require('express');
const mongoose = require('mongoose');
const StudentRoute = require('./Routers/StudentRoute.js');
const app = express();
app.use(express.json());

//connect mongo DB
mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(()=>{
    console.log("Mongo Connected");
})
.catch(error=>{
    console.error("Error",error);
});



app.use('/',StudentRoute);

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});