
const db = require("../../../database/db")

const AddMembers = async (req, res) => {
    try {
        const {class_id, student_ids} = req.body

        for (const student_id of student_ids ) {
            await db.query(
                `INSERT INTO class_students (class_id, student_id) VALUES (?, ?)`,
                [class_id, student_id]
            )
        }
        
        return res.status(200).json({ 
            title: "Member/s Added", 
            message: `Members was added succesfully.`,
            data: result
            
        });
    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}

const GetMembers = async (req, res) => {

    try {
        const { class_id } = req.params

        const [ result ] = await db.query(
            `
                SELECT 
                    class_students.*,
                    students.*
                FROM class_students
                LEFT JOIN students ON students.student_id = class_students.student_id
                WHERE class_id = ?
            `,
            [class_id]
        )
        

        if (!result.length) {
            return res.status(200).json({ 
                title: "No Members Found", 
                message: "There's no members yet." 
            });
        }

        return res.status(200).json({ 
            title: "Members Found", 
            message: `Members found`,
            data: result
            
        });

    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}

const RemoveMembers = async (req, res) => {

    try {

        const {class_id, student_ids} = req.body

        for (const student_id of student_ids ) {
            await db.query(
                `DELETE FROM class_students WHERE class_id = ? AND student_id = ?`,
                [class_id, student_id]
            )
        }
        
        return res.status(200).json({ 
            title: "Member/s Deleted", 
            message: `Members was deleted succesfully.`,
            data: result
            
        });
    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}

module.exports = {
    AddMembers,
    GetMembers,
    RemoveMembers
}