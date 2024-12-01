const db = require("../../database/db")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();


const Register = async (req, res) => {
    
    const {email_address, password, first_name, last_name, middle_name} = req.body

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
    
        const [checkEmailExist] = await db.query(
            "SELECT * FROM teachers WHERE email_address = ?",
            [email_address]
        )

        if (checkEmailExist.length > 0) {
            return res.status(201).json({ 
                title: "Registration Failed.", 
                message: "The email address you entered is already belong to an existing account" 
            });
        }        
        const [registerResult] = await db.query(
            `INSERT INTO teachers (first_name, last_name, middle_name, 
            email_address, password) VALUES (?, ?, ?, ?, ?)`, 
            [first_name, last_name, middle_name, email_address, hashedPassword]
        )
        
        if (!registerResult) {
            return res.status(400).json({ 
                title: "Registration Failed", 
                message: "Something went wrong. Please try again later. " 
            });
        }       
        return res.status(200).json({ 
            title: "Successful Registration", 
            message: "!",           
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const Login = async (req, res) => {

    const {email_address, password} = req.body

    try {
                
        const [result] = await db.query(
            "SELECT * FROM teachers WHERE teacher_string_id = ?", 
            [email_address]
        )
        
        if (!result.length) {
            return res.status(401).json({ 
                title: "Login Failed", 
                message: "Wrong username!",                
            });
        }

        if (result[0].status === 'Pending') {
            return res.status(201).json({ 
                title: "Login Failed", 
                message: "Pending account!",                
            });
        }
        if (result[0].status === 'Rejected') {
            return res.status(202).json({ 
                title: "Login Failed", 
                message: "Rejected Account!",                
            });
        }
        bcrypt.compare(password, result[0].password, 
            async (err, passResult) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.status(404).json({ title: "Internal Error", msg: "Something went wrong. Please try again later!" });
                }
                if (!passResult) {
                    return res.status(401).json({ 
                        title: "Login Failed", 
                        msg: "Wrong Password!",                        
                    });
                }

                const token = jwt.sign(
                    {email_address: result[0].email_address},
                    process.env.JWT_TOKEN,
                    {expiresIn: '1d'}
                )

                
                
                return res.status(200).json({ 
                    title: "Successful Registration", 
                    message: "!",
                    teacher_id: result[0].teacher_id,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    middle_name: result[0].middle_name,
                    email_address: result[0].email_address,
                    token: token
                });
            }
        )

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
    
}

const ChangePassword = async (req, res) => {

    try {
        const {password, teacher_id} = req.body
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [ result ] = await db.query(
            `UPDATE teachers SET password = ? WHERE teacher_id = ?`,
            [hashedPassword, teacher_id]
        )

        if (!result.affectedRows) {
            return res.status(400).json({ 
                title: "", 
                message: "" 
            });
        }

        return res.status(200).json({ 
            title: "Done", 
            message: "" 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }

}

const EditAccount = async (req, res) => {

    try {

        const {first_name, middle_name, last_name, email_address, teacher_id} = req.body                

        const [ result ] = await db.query(
            `UPDATE teachers SET first_name = ?, middle_name = ?, last_name = ?, email_address = ? WHERE teacher_id = ?`,
            [first_name, middle_name, last_name, email_address, teacher_id]
        )

        if (!result.affectedRows) {
            return res.status(400).json({ 
                title: "", 
                message: "" 
            });
        }

        const token = jwt.sign(
            {email_address: email_address},
            process.env.JWT_TOKEN,
            {expiresIn: '1d'}
        )

        return res.status(200).json({ 
            title: "Done", 
            message: "",
            teacher_id: teacher_id,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            email_address: email_address,
            token: token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const ResetPassword = async (req, res) => {
    try {
        const {email, password} = req.body

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [ result ] = await db.query(
            `UPDATE teachers SET password = ? WHERE email_address = ?`,
            [hashedPassword, email]
        )

        if (!result.affectedRows) {
            return res.status(400).json({ 
                title: "", 
                message: "" 
            });
        }

        return res.status(200).json({ 
            title: "Done", 
            message: "" 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}
module.exports = { 
    Login,
    Register,
    ChangePassword,
    EditAccount,
    ResetPassword
};