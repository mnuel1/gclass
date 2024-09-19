const { 
    Login, 
    Register, 
    EditAccount,
    ChangePassword } = require("../Auth/AuthController")

const {
    CreateClass,
    EditClass,
    RemoveClass,
    GetClasses } = require("../Class/ClassroomController")

const {
    GetActivities } = require("../Activity/ActivityController")

const {
    AddMembers,
    GetMembers,
    RemoveMembers } = require("../Members/MemberController")

const {
    CreateAssignment,
    EditAssignment,
    RemoveAssignment,
    GetAssignStudents,
    GetAssignments,
    GradeAssignment } = require("../Assignment/AssignmentController")

const VerifyTeacher = require("../../middleware/verify")
const express = require('express');
const router = express.Router();


/* 
 * AUTHENTICATION ROUTE
 * 
 * 
 **/ 

router.post("/login", Login);
router.post("/register", Register);


router.post("/edit/account", EditAccount);
router.post("/change/password", ChangePassword);

/* 
 * CLASS ROUTE
 * 
 * 
 **/ 
router.post("/class", CreateClass)
router.post("/class/edit", EditClass)
router.post("/class/remove/:class_id", RemoveClass)
router.get("/class/:teacher_id", GetClasses)

/* 
 * ASSIGNMENT ROUTE
 * 
 * 
 **/
router.post("/assignment", CreateAssignment)
router.post("/assignment/edit", EditAssignment)
router.post("/assignment/remove/:assignment_id", RemoveAssignment)
router.post("/assignment/grade/:class_assignment_id ", GradeAssignment) 
router.get("/assignment/:assignment_id/view", GetAssignStudents) 
router.get("/assignment/:class_id", GetAssignments) 


/* 
 * MEMBER ROUTE
 * 
 * 
 **/ 
router.post("/member", AddMembers)
router.post("/member/remove", RemoveMembers)
router.get("/member/:class_id", GetMembers)


/* 
 * ACTIVITY ROUTE
 * 
 * 
 **/
router.get("/class/:class_id/activity", GetActivities) 




module.exports = router