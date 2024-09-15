const { Search } = require("../Search/search")
// const VerifyTeacher = require("../../middleware/verify")
const express = require('express');
const router = express.Router();

/* 
 * AUTHENTICATION ROUTE
 * 
 * 
 **/ 

router.get("/search/:name", Search);

module.exports = router