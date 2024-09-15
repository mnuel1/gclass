const db = require("../../../database/db")


const CreateClass = async (req, res) => {

    const { name, description, teacher_id, } = req.body
    
    const class_string_id = 'STRING ALGO'

    try {
        const [result] = await db.query(
            `INSERT INTO class (class_string_id, teacher_id, name, description) VALUES (?, ?, ?, ?)`,
            [class_string_id,teacher_id,name, description]
        )

        if (!result.length) {
            return res.status(400).json({ 
                title: "Creating new  Class failed", 
                message: "Something went wrong." 
            });
        }

        
        return res.status(200).json({ 
            title: "Created Class ", 
            message: `The new class was successfully created. `,
            data: result
            
        });
    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }

}


const EditClass = async (req, res) => {

    const { name, description, class_id } = req.body 
    try {
        const [result] = await db.query(
            `UPDATE class SET name = ?, description = ?, WHERE class_id = ?`,
            [name, description, class_id]
        )

        if (!result.length) {
            return res.status(400).json({ 
                title: "Edit Class failed", 
                message: "Something went wrong." 
            });
        }

        
        return res.status(200).json({ 
            title: "Edit Classes Success", 
            message: `The class was edited successfully.`,
            data: result
            
        });

    } catch (error) {
       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}


const RemoveClass = async (req, res) => {

    const { class_id } = req.params

    try {
        const [result] = await db.query(
            `DELETE FROM class WHERE class_id = ?`,
            [class_id]
        )

        if (!result.length) {
            return res.status(400).json({ 
                title: "Remove Class Failed", 
                message: "Something went wrong." 
            });
        }

        
        return res.status(200).json({ 
            title: "Class Removed", 
            message: `The class was succesfully removed.`,            
        });

    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}

const GetClasses = async (req, res) => {
    const { teacher_id } = req.params

    try {
        const [result] = await db.query(
            `SELECT * FROM class WHERE teacher_id = ?`,
            [teacher_id]
        )

        if (!result.length) {
            return res.status(400).json({ 
                title: "Get Classes failed", 
                message: "Something went wrong." 
            });
        }

        
        return res.status(200).json({ 
            title: "Get Classes Success", 
            message: `clasess get`,
            data: result
            
        });

    } catch (error) {
      
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}


exports.module = {
    CreateClass,
    EditClass,
    RemoveClass,
   
    GetClasses,

}