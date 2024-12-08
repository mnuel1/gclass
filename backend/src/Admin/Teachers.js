const db = require("../database/db");
const bcrypt = require("bcrypt")

const transporter = require("../../mailer")

function generateTeacherStringID(email_address) {    
    const today = new Date();
    const seed = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}${email_address}`;

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash = hash & hash; 
    }

    function randomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return chars[Math.abs(hash = (hash * 1664525 + 1013904223) % 2147483648) % chars.length];
    }

    let randomString = '';
    for (let i = 0; i < 6; i++) {
        randomString += randomChar();
    }

    return randomString;
}


const Login = async (req, res) => {

    const {email_address, password} = req.body

    try {
        
        const [result] = await db.query(
            "SELECT * FROM admin WHERE user = ?", 
            [email_address]
        )

        if (!result.length) {
            return res.status(401).json({ 
                title: "Login Failed", 
                message: "Wrong username!",                
            });
        }
            
        bcrypt.compare(password, result[0].pass, 
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
             
                return res.status(200).json({ 
                    title: "Successful Registration", 
                    message: "!",
                    id: result[0].id,                
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
        const {password, id} = req.body
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [ result ] = await db.query(
            `UPDATE admin SET password = ? WHERE id = ?`,
            [hashedPassword, id]
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

const GetTeachers = async (req, res) => {
    try {

        const [result] = await db.query(`SELECT * FROM teachers`) 
        
        
        return res.status(200).json({ 
            title: "Success", 
            message: "Get Teachers",
            data: result
        });

    } catch (error) {        
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const ChangeStatus = async (req, res) => {
    try {
        const {status, teacher_id, email_address} = req.body
        const username = generateTeacherStringID(email_address)
        const [result] = await db.query(`UPDATE teachers SET status = ?, teacher_string_id = ? WHERE teacher_id = ?`,
            [status, username, teacher_id]
        ) 

        if (result.affectedRows < 0) {
            return res.status(401).json({ 
                title: "Error", 
                message: "Something went wrong",            
            });
        }
        

        const mailOptions = {
            from: 'noreply@resiboph.site',
            to: email_address,
            subject: `Your account has been approved!`,
            html: `<h4 class='text-sm'>
            <strong>Welcome to ActClassroom!</strong><br />
            <strong>Your account has been approved by the admin</strong><br />
            You can now access the portal and start using our services.<br />
            Your username is: <strong>${username}</strong><br />
            Use this to log in to your account and explore the platform.<br />
            We're excited to have you on board!
            </h4>`,            
        };
        
        
        if (!transporter.sendMail(mailOptions)) {
            return res.status(401).json({ 
                title: "Error", 
                message: "Something went wrong",            
            });
        }

        return res.status(200).json({ 
            title: "Success", 
            message: "Status updated",            
        });
    } catch (error) {        
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}


module.exports = {
    Login,
    ChangePassword,
    GetTeachers,
    ChangeStatus
}
