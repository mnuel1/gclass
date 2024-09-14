const { 
    Login, 
    Register } = require("../Teacher/Controllers/Auth/auth")

const VerifyTeacher = require("../middleware/verify")
const express = require('express');
const router = express.Router();

/* 
 * AUTHENTICATION ROUTE
 * 
 * 
 **/ 

router.post("/login", Login);
router.post("/register", Register);

module.exports = router