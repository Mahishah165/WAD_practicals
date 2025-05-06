const express = require('express')
const {addStudent,getBrowser, DSBDA_Marks,addMarks, above25,below40,deleteStd,inBrowser} = require('../Controllers/StudentController.js');

const router = express.Router();

router.post('/addStd',addStudent);
router.get('/getAll',getBrowser);
router.get('/dsbda_marks',DSBDA_Marks);
router.put('/addMarks/:roll',addMarks);
router.get('/above25',above25);
router.delete('/deleteStd/:roll',deleteStd);
router.get('/below40',below40);
router.get('/inBrowser',inBrowser);

module.exports = router;