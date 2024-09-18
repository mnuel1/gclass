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
            due_date,
            class_id,
            student_ids,
            formId } = assignmentData
        
        const connection = await db.getConnection()

        await connection.beginTransaction()

        const [assignmentResult] = await connection.query(
            `INSERT INTO assignments (class_id, name, instruction, attachment, points, due_date)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [class_id, name, instruction, attachment, points, due_date]
        )
       
        if (!assignmentResult.affectedRows) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };            
        }
       
        for (const student of student_ids) {
            // assign the assignment to the selected students
            await connection.query(
                `INSERT INTO class_assignments (assignment_id, student_id, form_id)
                VALUES (?, ?, ?)`,
                [assignmentResult.insertId, student.student_id, formId]
            )
        }
       
        await connection.commit();
        
        const assignment_id = assignmentResult.insertId;

        const [insertedData] = await connection.query(
            `SELECT * FROM assignments WHERE assignment_id = ?`,
            [assignment_id]
        );
        
        const res = insertedData.map((assignment) => {            
            const startDate = new Date(assignment.start_date);  
            const dueDate = formatDateTimeForFullDetail(new Date(assignment.due_date));
            const dateStart = formatDateForGrouping(new Date(assignment.start_date));
            formatDateForGrouping
            assignment.due_date = dueDate;
            assignment.start_date = dateStart;
            assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
        
            return assignment;
        });
        console.log(res);
        

        return {
            error: false,
            succesfull: true,
            data: res
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
            due_date,
            class_id,
            student_ids,
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
            "DELETE FROM assignments WHERE assignment_id = ?"
            , [assignment_id]
        )
                
        if (!result.affectedRows) {
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

const GetAssignStudentsWorkService = async(assignment_id) => {
    try {
        
        const [result] = await db.query(
            `
            SELECT                
                GROUP_CONCAT(
                    CONCAT(
                        '{"',
                            'student_id": "', students.student_id, '",',                            
                            '"student_code": "', students.student_string_id, '",',
                            '"fullname": "', CONCAT(students.last_name, ' ' ,students.first_name, ' ' ,students.middle_name), '",',
                            '"email_address": "', students.email_address, '"'                            
                        '}'
                    )
                    SEPARATOR ','
                ) AS students                            
            FROM assignments
            LEFT JOIN class_assignments ON class_assignments.assignment_id = assignments.assignment_id            
            LEFT JOIN students ON students.student_id = class_assignments.student_id
            WHERE assignments.assignment_id = ?
            `, [assignment_id]
        )

        if (!result.length) {
            return { 
                error: false,
                succesfull: false   
            };
        }

        result[0].students = JSON.parse(`[${result[0].students}]`);
        
        const res = result.map((assignment) => {
            const startDate = new Date(assignment.start_date);  
            const dueDate = formatDateTimeForFullDetail(new Date(assignment.due_date));
            const dateStart = formatDateTimeForFullDetail(new Date(assignment.start_date));
        
            assignment.due_date = dueDate;
            assignment.start_date = dateStart;
            assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
        
            return assignment;
        });

        return {
            error: false,
            succesfull: true,
            data: res
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

const GetGradeAssignmentService = async(assignmentData) => {
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
    CreateAssignmentService,
    EditAssignmentService,
    RemoveAssignmentService,
    GetAssignStudentsWorkService,
    GradeAssignmentService,
    GetAssignmentsService
}