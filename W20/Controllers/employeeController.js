const mongoose = require('mongoose');
const Emp = require('../Models/Employee.js');

const addEmp = async(req,res)=>{
    try {
        const {name,dept,desg,salary,joining_date} = req.body;
        if(!name || !dept || !desg || salary==null || !joining_date){
            return res.status(404).json({"Message":"All fields are mandatory"});
        }
        if(typeof salary !== 'number' || salary<0){
            return res.status(404).json({"Message":"Salary should be a non negative number"});
        }
        if(isNaN(Date.parse(joining_date))){
            return res.status(404).json({"Message":"Date should be a number"});
        }

        const emp = new Emp({name,dept,desg,salary,joining_date});
        await emp.save();
        return res.status(200).json({"Message":"Entity added successfully"});
    } catch (error) {
        return res.status(500).json({"message":error});
    }
};

const getEmps = async(req,res)=>{
    try{
        const emps = await Emp.find();
        return res.status(200).json(emps);
    }catch(error){
        return res.status(500).json({"message":error});
    }
};

const updateEmp = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,dept,desg,salary,joining_date} = req.body;
        if(!name || !dept || !desg || salary==null || !joining_date){
            return res.status(404).json({"Message":"All fields are mandatory"});
        }
        if(typeof salary !== 'number' || salary<0){
            return res.status(404).json({"Message":"Salary should be a non negative number"});
        }
        if(isNaN(Date.parse(joining_date))){
            return res.status(404).json({"Message":"Date should be a number"});
        }
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({"Message":"Invalid Id"});
        }
        const Employee = await Emp.findByIdAndUpdate(id,{name,dept,desg,salary,joining_date},{new:true});
        if(!Employee){
            return res.status(404).json({"message":"Employee not found"});
        }
        return res.status(200).json({ "Message": "Entity updated successfully", Employee });
    } catch (error) {
        return res.status(500).json({"message":error});
    }
};

const deleteEmp = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({"Message":"Invalid Id"});
        }
        const result = await Emp.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({"Message":"Employee not found"});
        }
        return res.status(200).json({"Message":"Employee deleted successfully"});
    }catch (error) {
        return res.status(500).json({"message":error});
    }
};

module.exports = {addEmp,getEmps,updateEmp,deleteEmp};