const express = require('express')
const {addEmp,getEmps,updateEmp,deleteEmp} = require('../Controllers/employeeController.js');

const router = express.Router();
router.post('/addEmp',addEmp);
router.get('/getEmps',getEmps);
router.put('/updateEmp/:id',updateEmp);
router.delete('/deleteEmp/:id',deleteEmp);
module.exports = router;