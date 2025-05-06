const Student = require('../Models/studentdb.js');

const addStudent = async(req,res)=>{
    const data = req.body;
    const result = await Student.insertMany(data);
    return res.status(200).send(result);
}

const getBrowser = async(req,res)=>{
    const data = await Student.find();
    const total = await Student.countDocuments();
    res.status(200).send({total,data});
}

const DSBDA_Marks = async(req,res)=>{
    const students = await Student.find({DSBDA_Marks:{$gt:20}},{Name:1,_id:0})
    res.status(200).send(students);
}


const addMarks = async (req, res) => {
    const roll = Number(req.params.roll); // ✅ convert to Number
    const student = await Student.findOne({ Roll_No: roll });
  
    if (student) {
      student.WAD_Marks += 10;
      student.CC_Marks += 10;
      student.DSBDA_Marks += 10;
      student.CNS_Marks += 10;
      student.AI_Marks += 10;
      await student.save();
      return res.status(200).send("Marks Updated");
    } else {
      res.status(404).send("Student not found");
    }
  };
  
const above25 = async(req,res)=>{
    const data  = await Student.find({
        WAD_Marks:{$gt:25},
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    },{Name:1,_id:0});
    res.send(data);
};

const below40 = async(req,res)=>{
    const data = await Student.find({
        DSBDA_Marks: {$lt:40},
        CNS_Marks: {$lt:40}
    },{Name:1,Roll_No:1,_id:0});
    res.send(data);
};

const deleteStd = async(req,res)=>{
    const roll = req.params.roll;
    await Student.deleteOne({Roll_No:roll});
    res.send("Student Deleted");
};

const inBrowser = async(req,res)=>{
    const students = await Student.find();
    let table = `
    <table border="1">
        <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>WAD</th>
            <th>DSBDA</th>
            <th>CNS</th>
            <th>CC</th>
            <th>AI</th>
        </tr>`;

    students.forEach(std=>{
        table+=
        `<tr>
            <td>${std.Name}</td>
            <td>${std.Roll_No}</td>
            <td>${std.WAD_Marks}</td>
            <td>${std.DSBDA_Marks}</td>
            <td>${std.CNS_Marks}</td>
            <td>${std.CC_Marks}</td>
            <td>${std.AI_Marks}</td>
        </tr>`;
    });
    table += `</table>`
    res.send(table);
};
module.exports = {addStudent,getBrowser,DSBDA_Marks,addMarks,above25,below40,deleteStd,inBrowser};