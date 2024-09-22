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
            assignment_id,
            student_id,
            form_answers,
            pass_date,
            attachments } = assignmentData
        
        const connection = await db.getConnection()
                
        await connection.beginTransaction()

        const [assignmentResult] = await connection.query(
            `UPDATE class_assignments SET form_answers = ?, pass_date = ?, attachments = ?
            WHERE assignment_id = ? AND student_id = ?`,
            [form_answers, pass_date, attachments, assignment_id, student_id]
        )
               
        if (!assignmentResult.affectedRows) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };            
        }
                       
        await connection.commit();
                
        // const [insertedData] = await connection.query(
        //     `SELECT * FROM assignments WHERE assignment_id = ?`,
        //     [assignment_id]
        // );
        
        // const res = insertedData.map((assignment) => {            
        //     const startDate = new Date(assignment.start_date);  
        //     const dueDate = formatDateTimeForFullDetail(new Date(assignment.due_date));
        //     const dateStart = formatDateForGrouping(new Date(assignment.start_date));
            
        //     assignment.due_date = dueDate;
        //     assignment.start_date = dateStart;
        //     assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
        //     assignment.students = student_ids
        //     return assignment;
        // });
    
        return {
            error: false,
            succesfull: true,
            // data: res
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
            assignment_id,
            student_id,
            form_answers,
            pass_date,
            attachments } = assignmentData
                            
        const connection = await db.getConnection()

        await connection.beginTransaction()
        
        const [assignmentResult] = await connection.query(
            `UPDATE class_assignments SET form_answers = ?, pass_date = ?, attachments = ?
            WHERE assignment_id = ? AND student_id = ?`,
            [form_answers, pass_date, attachments, assignment_id, student_id]
        )
        
        if (!assignmentResult.affectedRows) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };            
        }

        await connection.commit();
        
      
        // const [insertedData] = await connection.query(
        //     `SELECT * FROM assignments WHERE assignment_id = ?`,
        //     [assignment_id]
        // );
        
        // const res = insertedData.map((assignment) => {            
        //     const startDate = new Date(assignment.start_date);  
        //     const dueDate = formatDateTimeForFullDetail(new Date(assignment.due_date));
        //     const dateStart = formatDateForGrouping(new Date(assignment.start_date));            
        //     assignment.due_date = dueDate;
        //     assignment.start_date = dateStart;
        //     assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
        
        //     return assignment;
        // });
       
        
        return {
            error: false,
            succesfull: true,
            // data: res
        };

    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}

const GetAssignmentsService = async (class_id, student_id) => {

    try {        
        const [result] = await db.query(
            `
            SELECT
                assignments.*,
                class_assignments.form_id,
                class_assignments.form_answers,
                class_assignments.assignment_status,
                class_assignments.pass_date,
                class_assignments.grade,
                class_assignments.attachments,
                students.student_id,
                students.student_string_id AS student_code,
                CONCAT(students.last_name, ' ', students.first_name, ' ', COALESCE(students.middle_name, '')) AS fullname,
                students.email_address
            FROM assignments
            LEFT JOIN class_assignments ON class_assignments.assignment_id = assignments.assignment_id
            LEFT JOIN students ON students.student_id = class_assignments.student_id            
            WHERE assignments.class_id = ? AND class_assignments.student_id = ?
            GROUP BY assignments.assignment_id
            ORDER BY start_date ASC`,
            [class_id, student_id]
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
            // assignment.students = JSON.parse(`[${assignment.students}]`);
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

const GetGradeAssignmentService = async(class_id) => {
    try {        
        const [result] = await db.query(
            `
            SELECT
                assignments.*,
                class_assignments.form_id,
                class_assignments.form_answers,
                class_assignments.assignment_status,
                class_assignments.pass_date,
                IFNULL(class_assignments.grade, 'Not assigned') AS grade,
                class_assignments.attachments,
                students.student_id,
                students.student_string_id AS student_code,
                CONCAT(students.last_name, ' ', students.first_name, ' ', COALESCE(students.middle_name, '')) AS fullname,
                students.email_address
            FROM assignments
            LEFT JOIN class_students ON class_students.class_id = assignments.class_id
            LEFT JOIN students ON students.student_id = class_students.student_id
            LEFT JOIN class_assignments ON class_assignments.assignment_id = assignments.assignment_id
                AND class_assignments.student_id = students.student_id
            WHERE assignments.class_id = ? 
            GROUP BY assignments.assignment_id
            ORDER BY assignments.start_date ASC`,
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
}

module.exports = {
    CreateAssignmentService,
    EditAssignmentService,    
    GetAssignmentsService,
    GetGradeAssignmentService
}