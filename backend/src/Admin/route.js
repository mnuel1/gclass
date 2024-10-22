const express = require('express');
const router = express.Router();

const { Login, GetTeachers, ChangePassword, ChangeStatus } = require("./Teachers")


router.post("/login", Login);
router.post("/change/password", ChangePassword);
router.post("/change/status", ChangeStatus);

router.get("/teachers", GetTeachers);

module.exports = router