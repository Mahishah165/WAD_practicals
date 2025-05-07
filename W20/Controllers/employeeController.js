const mongoose = require('mongoose');
const Emp = require('../Models/Employee.js');

// // <form id="empForm">
//   <input name="name" placeholder="Name"><br>
//   <input name="dept" placeholder="Department"><br>
//   <input name="desg" placeholder="Designation"><br>
//   <input name="salary" placeholder="Salary" type="number"><br>
//   <input name="joining_date" placeholder="Joining Date" type="date"><br>
//   <button type="submit">Submit</button>
// </form>

// <script>
//   document.getElementById("empForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const data = {
//       name: form.name.value,
//       dept: form.dept.value,
//       desg: form.desg.value,
//       salary: Number(form.salary.value),
//       joining_date: form.joining_date.value
//     };

//     const res = await fetch("http://localhost:3000/add-employee", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });

//     const result = await res.json();
//     alert(result.Message || result.message);
//   });
// </script>
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