const db = require("../../database/db")

const formatDateForGrouping = (date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};


const formatDateTimeForAssignment = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(date);
};

const formatDateTimeForFullDetail = (date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(date);
}

const CreateAssignmentService = async(assignmentData) => {

    try {

        const { 
            name,
            instruction,
            attachment,
            points,
            dueDate,
            classId,
            studentIds,
            formId } = assignmentData
        
        const connection = await db.getConnection()

        await connection.beginTransaction()

        const [assignmentResult] = await connection.query(
            `INSERT INTO assignments (name, instruction, attachment, points, due_date)
            VALUES (?, ?, ?, ?, ?)`,
            [name, instruction, attachment, points, dueDate]
        )

        if (!assignmentResult.length) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };            
        }

        for (const id of studentIds) {
            // assign the assignment to the selected students
            await connection.query(
                `INSERT INTO class_assignments (assignment_id, class_id, student_id, form_id)
                VALUES (?, ?, ?, ?)`,
                [assignmentResult.insertId, classId, id, formId]
            )
        }

        await connection.commit();

        
        return {
            error: false,
            succesfull: true,
        };

    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}

const EditAssignmentService = async(assignmentData) => {
    try {
        const { 
            name, 
            instruction, 
            attachment, 
            points,
            dueDate, 
            classId, 
            studentIds, 
            formId } = assignmentData

        
        
        return {
            error: false,
            succesfull: true,
        };

    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}

const RemoveAssignmentService = async(assignment_id) => {

    try {

        const connection = await db.getConnection();
        
        await connection.beginTransaction();

        const [result] = await connection.query(
            "DELETE FROM class_assignments WHERE assignment_id = ?"
            , [assignment_id]
        )

        if (result.affectedRows) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };
        }

        await connection.commit();

        return {
            error: false,
            succesfull: true,
        };

    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}

const GetAssignStudentsService = async(assignment_id) => {
    try {
        
        const [result] = await db.query(
            `
            SELECT                 
                class_assignments.*,
                students.student_id,
                students.student_string_id,
                CONCAT(students.last_name, students.first_name, students.middle_name) AS fullname,
                students.email_address
            FROM class_assignments            
            LEFT JOIN students ON students.student_id = class_assignments.student_id
            WHERE class_assignments.assignment_id = ?
            `, [assignment_id]
        )

        if (!result.length) {
            return { 
                error: false,
                succesfull: false   
            };
        }

        return {
            error: false,
            succesfull: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}


const GradeAssignmentService = async(assignmentData) => {
    try {
        return {
            error: false,
            succesfull: true,
        };
    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}



const GetAssignmentsService = async (class_id) => {

    try {        
        const [result] = await db.query(
            `SELECT * FROM assignments WHERE class_id = ? 
            ORDER BY start_date ASC`,
            [class_id]
        );

        if (!result.length) {
            return { 
                error: false,
                succesfull: false   
            };
        }
        
        const groupedResult = result.reduce((acc, assignment) => {
            const startDate = new Date(assignment.start_date);  
            const dueDate = formatDateTimeForFullDetail(new Date(assignment.due_date))
            const dateStart = formatDateTimeForFullDetail(new Date(assignment.start_date))
            const groupKey = formatDateForGrouping(startDate);  
            

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            assignment.due_date = dueDate
            assignment.start_date = dateStart
            assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
            acc[groupKey].push(assignment);

            return acc;
        }, {});

        return {
            error: false,
            succesfull: true,
            data: groupedResult
        };
    } catch (error) {
        console.error(error);
        return {
            error: true
        };            
    }
};

module.exports = {
    GetAssignmentsService
};



module.exports = {
    CreateAssignmentService,
    EditAssignmentService,
    RemoveAssignmentService,
    GetAssignStudentsService,
    GradeAssignmentService,
    GetAssignmentsService
}