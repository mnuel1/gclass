const { 
    Login, 
    Register, 
    EditAccount,
    ChangePassword,
    ResetPassword } = require("../Auth/AuthController")

const { JoinClass, GetClasses } = require("../Class/ClassroomController")

const { GetActivities } = require("../Activity/ActivityController")

const { GetMembers } = require("../Members/MemberController")

const {
    CreateAssignment,
    EditAssignment,   
    GetAssignments, 
    GetStudentGrades } = require("../Assignment/AssignmentController")
const { GetMeetings } = require("../Calendar/CalendarController")
const VerifyStudent = require("../../middleware/verify")
const express = require('express');
const router = express.Router();


/* 
 * AUTHENTICATION ROUTE
 * 
 * 
 **/ 

router.post("/login", Login);
router.post("/register", Register);
router.post("/reset", ResetPassword);

router.post("/edit/account", EditAccount);
router.post("/change/password", ChangePassword);

/* 
 * CLASS ROUTE
 * 
 * 
 **/ 
router.post("/join/class", JoinClass)
router.get("/class/:student_id", GetClasses)

/* 
 * ASSIGNMENT ROUTE
 * 
 * 
 **/
router.post("/assignment", CreateAssignment)
router.post("/assignment/edit", EditAssignment)
router.get("/assignment/:class_id/:student_id", GetAssignments) 
router.get("/assignment/:class_id/:student_id/grade", GetStudentGrades) 

/* 
 * MEETING ROUTE
 * 
 * 
 **/
router.get("/meeting/:student_id", GetMeetings) 

/* 
 * MEMBER ROUTE
 * 
 * 
 **/ 

router.get("/member/:class_id", GetMembers)


/* 
 * ACTIVITY ROUTE
 * 
 * 
 **/
router.get("/class/:class_id/activity", GetActivities) 




module.exports = router