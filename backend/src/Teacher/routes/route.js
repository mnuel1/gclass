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
    GetActivities,
    AddMeetingActivity } = require("../Activity/ActivityController")

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
    GetStudentGrades,
    GradeAssignment } = require("../Assignment/AssignmentController")
const {
    CreateMeeting,
    EditMeeting,
    RemoveMeeting,
    GetMeetings } = require("../Calendar/CalendarController")
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
router.post("/assignment/grade", GradeAssignment) 
router.get("/assignment/:assignment_id/view", GetAssignStudents) 
router.get("/assignment/:class_id", GetAssignments) 
router.get("/assignment/:class_id/grade", GetStudentGrades) 

/* 
 * MEETING ROUTE
 * 
 * 
 **/
router.post("/meeting", CreateMeeting)
router.post("/meeting/edit", EditMeeting)
router.post("/meeting/remove/:class_meeting_id", RemoveMeeting)
router.get("/meeting/:teacher_id", GetMeetings) 

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
router.post("/class/activity", AddMeetingActivity)
router.get("/class/:class_id/activity", GetActivities) 




module.exports = router