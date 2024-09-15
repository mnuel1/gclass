const db = require("../../../database/db")


const CreateAssignment = async (req, res) => {

    const { name, instruction, attachment, points,
        dueDate, classId, studentIds, formId} = req.body
    
    try {
        const connection = await db.getConnection();
        
        await connection.beginTransaction()

        const [assignmentResult] = await connection.query(
            `INSERT INTO assignments (name, instruction, attachment, points, due_date)
            VALUES (?, ?, ?, ?, ?)`,
            [name, instruction, attachment, points, dueDate]
        )
        
        if (!assignmentResult.length) {
            return res.status(400).json({ 
                title: "Create New Assignment Failed", 
                message: "Something went wrong." 
            });
        }


        for (const id of studentIds) {
            // assign the assignment to the selected student    s
            await connection.query(
                `INSERT INTO class_assignments (assignment_id, class_id, student_id, form_id)
                VALUES (?, ?, ?, ?)`,
                [assignmentResult.insertId, classId, id, formId]
            )
        }
    
        await connection.commit();
        
        return res.status(200).json({ 
            title: "New Assignment Created", 
            message: `The assignment ${name} was succesfully created and sent to your students.`,
            
        });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }

}


const EditAssignment = async (req, res) => {

    const { name, instruction, attachment, points, startDate, 
        dueDate, classId, studentIds, formId } = req.body 
    try {

    } catch (error) {
       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}


const RemoveAssignment = async (req, res) => {

    const { assignment_id } = req.params

    try {
        const connection = await db.getConnection();
        
        await connection.beginTransaction()
        
        await connection.query(
            "DELETE FROM class_assignments WHERE assignment_id = ?"
            , [assignment_id]
        )
        
        await connection.query(
            "DELETE FROM assignments WHERE assignment_id = ?"
            , [assignment_id]
        )

        await connection.commit();
        
        return res.status(200).json({ 
            title: "Assignment Deleted", 
            message: `The assignment was succesfully deleted and all of the student record for this assignment was deleted.`,
            
        });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }
}

const GetAssignment = async (req, res) => {
    const { assignment_id } = req.params

    try {
        


    } catch (error) {
      
        console.log(error);
        return res.status(500).json({ title: "Internal Error", msg: "Something went wrong!" });
    }

}

const GetAssignments = async (req, res) => {

}

const GradeAssignment = async (req, res) => {

}

exports.module = {
    CreateAssignment,
    EditAssignment,
    RemoveAssignment,
    GetAssignment,
    GetAssignments,
    GradeAssignment

}