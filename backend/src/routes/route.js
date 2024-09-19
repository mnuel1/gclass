const { SearchAll, SearchStudents } = require("../Search/search")
// const VerifyTeacher = require("../../middleware/verify")
const express = require('express');
const router = express.Router();

/* 
 * AUTHENTICATION ROUTE
 * 
 * 
 **/ 

router.get("/search/:name", SearchAll);
router.get("/search/students/:name/:class_id", SearchStudents);

module.exports = router