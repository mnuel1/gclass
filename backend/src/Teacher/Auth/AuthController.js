const db = require("../../database/db")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();


const Register = async (req, res) => {
    
    const {email, password, firstName, lastName, middleName} = req.body

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    try {
    
        const [checkEmailExist] = await db.query(
            "SELECT * FROM teachers WHERE email_address = ?",
            [email]
        )

        if (checkEmailExist) {
            return res.status(40).json({ 
                title: "Registration Failed.", 
                message: "The email address you entered is already belong to an existing account" 
            });
        }

        const [registerResult] = await db.query(
            `INSERT INTO teachers (first_name, last_name, middle_name, 
            email_address, password) VALUES (?, ?, ?, ?, ?)`, 
            [firstName, lastName, middleName, email, hashedPassword]
        )

        if (!registerResult) {
            return res.status(400).json({ 
                title: "Registration Failed", 
                message: "Something went wrong. Please try again later. " 
            });
        }

        const token = jwt.sign(
            {username: email},
            process.env.JWT_TOKEN,
            {expiresIn: '1d'}
        )
        
        return res.status(200).json({ 
            title: "Successful Registration", 
            message: "!",
            teacherID: registerResult.insertId,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            email: email,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const Login = async (req, res) => {

    const {email, password} = req.body

    try {
        
        const [result] = await db.query(
            "SELECT * FROM admin WHERE email = ? AND password = ?", 
            [email, password]
        )

        if (!result) {
            return res.status(401).json({ 
                title: "Wrong Credentials", 
                message: "Wrong username and password" 
            });
        }

        const token = jwt.sign(
            {username: result[0].email_address},
            process.env.JWT_TOKEN,
            {expiresIn: '1d'}
        )
        
        return res.status(200).json({ 
            title: "Successful Registration", 
            message: "!",
            teacherID: result[0].teacher_id,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            middleName: result[0].middleName,
            email: result[0].email_address,
            token: token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
    
}

module.exports = { 
    Login,
    Register
};