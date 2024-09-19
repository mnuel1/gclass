const db = require("../database/db")
const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './uploads/', // Directory to save uploaded files
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size (1MB in this example)
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf|txt/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File type not supported!');
        }
    },
});


router.post('/upload/assignment', upload.single('attachment'), 
async(req, res) => {
    const { assignment_id } = req.body
    const attachment = req.file.path; 
        
    const [ result ] = await db.query(
        `UPDATE assignments SET attachment = ? WHERE assignment_id = ?`,
        [attachment, assignment_id]
    )
    
    
    if (!result.affectedRows) {
        throw error
    }            
    return res.status(200).json({ 
        title: "Assignment Edited", 
        message: `The assignment was succesfully edited`,
    })
});

module.exports = router