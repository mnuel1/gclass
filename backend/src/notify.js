const express = require("express");
const router = express.Router();

const transporter = require("../mailer");

router.post("/student/forgot", async (req, res) => {
  try {
    const { email_address } = req.body;
    const forgotPasswordLink = `https://actsclassroom.online/student/reset?email=${encodeURIComponent(
      email_address
    )}`;

    const mailOptions = {
      from: "nreplyedusync@resiboph.site",
      to: email_address, // assuming email is the recipient
      subject: "Password Reset Request",
      html: `<h4 class='text-sm'>
                <strong>Password Reset Request!</strong><br />
                It looks like you requested a password reset. Click the link below to reset your password:<br />
                <a href="${forgotPasswordLink}" target="_blank" rel="noopener noreferrer" style="
                    display: inline-block;
                    margin-top: 10px;
                    padding: 8px 14px;
                    font-size: 16px;
                    color: white;
                    background-color: #007bff;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    text-align: center;
                    transition: background-color 0.3s, transform 0.2s;
                ">Reset Password</a><br />
                If you didn't request this, please ignore this email.<br />
            </h4>`,
    };

    if (!transporter.sendMail(mailOptions)) {
      return res
        .status(500)
        .json({ title: "Internal Error", message: "Something went wrong!" });
    } else {
      return res.status(200).json({
        title: "Done",
        message: "email sent check you email",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ title: "Internal Error", message: "Something went wrong!" });
  }
});

router.post("/teacher/forgot", async (req, res) => {
  try {
    const { email_address } = req.body;
    const forgotPasswordLink = `http://localhost:5173/teacher/reset?email=${encodeURIComponent(
      email_address
    )}`;

    const mailOptions = {
      from: "nreplyedusync@resiboph.site",
      to: email_address, // assuming email is the recipient
      subject: "Password Reset Request",
      html: `<h4 class='text-sm'>
                <strong>Password Reset Request!</strong><br />
                It looks like you requested a password reset. Click the link below to reset your password:<br />
                <a href="${forgotPasswordLink}" target="_blank" rel="noopener noreferrer" style="
                    display: inline-block;
                    margin-top: 10px;
                    padding: 8px 14px;
                    font-size: 16px;
                    color: white;
                    background-color: #007bff;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    text-align: center;
                    transition: background-color 0.3s, transform 0.2s;
                ">Reset Password</a><br />
                If you didn't request this, please ignore this email.<br />
            </h4>`,
    };

    if (!transporter.sendMail(mailOptions)) {
      return res
        .status(500)
        .json({ title: "Internal Error", message: "Something went wrong!" });
    } else {
      return res.status(200).json({
        title: "Done",
        message: "email sent check you email",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ title: "Internal Error", message: "Something went wrong!" });
  }
});

module.exports = router;
