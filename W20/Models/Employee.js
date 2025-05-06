const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    dept:{type:String,required:true},
    desg:{type:String,required:true},
    salary:{type:Number,required:true},
    joining_date:{type:Date,required:true}
});

module.exports = mongoose.model('employee',employeeSchema);