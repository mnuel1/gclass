const db = require("../database/db")
const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './uploads', // Directory to save uploaded files
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size (1MB in this example)
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File type not supported!');
        }
    },
});


router.post('/teacher/upload/assignment', upload.single('attachment'), 
async(req, res) => {
    try {
        const { assignment_id } = req.body
        const attachment = req.file.path.replace(/\\/g, '/'); 
            
        const [ result ] = await db.query(
            `UPDATE assignments SET attachment = ? WHERE assignment_id = ?`,
            [attachment, assignment_id]
        )
        
        
        if (!result.affectedRows) {
            return res.status(400).json({ 
                title: "", 
                message: ``,
            })
        }            
        return res.status(200).json({ 
            title: "Assignment Edited", 
            message: `The assignment was succesfully edited`,
        })

    }  catch (error) {        
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
   
});

router.post('/student/upload/assignment', upload.single('attachment'), 
async (req, res) => {

    try {
        const { assignment_id, student_id, status } = req.body;
        const attachment = req.file.path.replace(/\\/g, '/'); 
        let ass_status = status

        const [assignment] = await db.query(
            `SELECT due_date FROM assignments WHERE assignment_id = ?`,
            [assignment_id]
        );

        if (!assignment || assignment.length === 0) {
            return res.status(404).json({
                title: "Assignment Not Found",
                message: "The specified assignment does not exist.",
            });
        }

        const dueDate = new Date(assignment[0].due_date);
        const currentDate = new Date();

        if (ass_status === "Pending" || (currentDate < dueDate && ass_status === "Turned In")) {
            ass_status = "Turned In"
        } else if (ass_status === "Not Turned In" || (currentDate > dueDate && ass_status === "Turned In")) {
            ass_status = "Late Turned In"
        }
                
        const [result] = await db.query(
            `UPDATE class_assignments SET attachments = ?, pass_date = ?, assignment_status = ? 
            WHERE assignment_id = ? AND student_id = ?`,
            [attachment, currentDate, ass_status, assignment_id, student_id]
        );

        if (!result.affectedRows) {
            return res.status(400).json({
                title: "Update Failed",
                message: "The assignment could not be updated.",
            });
        }

        return res.status(200).json({
            title: "Assignment Edited",
            message: "The assignment was successfully edited.",
        });

    }  catch (error) {        
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
    
});



module.exports = router