
const jwt = require('jsonwebtoken');
const db = require("../database/db")

require('dotenv').config();

const VerifyTeacher = async (req, res, next) => {

    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ title: "401 Error Code", message: "Not Authorized!" });
    }

    try {
        jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {

            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ title: "401 Error Code", message: "Not Authorized!" });
                }
                return res.status(401).json({ title: "Error", message: "Not Authorized!", token: token });
            }
            
            const username = decoded.username;
            
            const [result] = await db.query(
                `SELECT * FROM admin where username = ?`,
                [username]
            )

            if (!result) {
                return res.status(404).json({ title: "Error", message: "Not Authorized!!" });
            }
            next();
        })

    } catch (error) {
        return res.status(500).json({ title: "Error", message: `Something went wrong in server ${error}` });
    }

    
}

module.exports = VerifyTeacher
 
