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
            `INSERT INTO assignments (class_id, name, instruction, points, due_date)
            VALUES (?, ?, ?, ?, ?)`,
            [class_id, name, instruction, points, due_date]
        )
               
        if (!assignmentResult.affectedRows) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };            
        }
        const post = `A new assignment, ${name}, has been created. Please review 
        the assignment details and submit it before the deadline.`
        const [activityResult] = await connection.query(
            `INSERT INTO activity (class_id, posts) VALUES (?, ?)`,
            [class_id, post]
        )

        if (!activityResult.affectedRows) {
            await connection.rollback();
            return { 
                error: false,
                succesfull: false   
            };            
        }
       
        for (const student of student_ids) {        
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
            
            assignment.due_date = dueDate;
            assignment.start_date = dateStart;
            assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
            assignment.students = student_ids
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

const EditAssignmentService = async(assignmentData) => {
    try {
        const {
            assignment_id,
            name,
            instruction,            
            points,
            due_date,            
            student_ids,
            past_student_ids,
            formId } = assignmentData
        
                    
        const connection = await db.getConnection()

        await connection.beginTransaction()
        
        const currentStudentIds = student_ids && student_ids.map(student => student.student_id);
        const previousStudentIds = past_student_ids && past_student_ids.map(student => student.student_id);

        const studentsToRemove = past_student_ids && past_student_ids.filter(
            pastStudent => !currentStudentIds.includes(pastStudent.student_id)
        );

        for (const student of studentsToRemove) {
            await connection.query(
                `DELETE FROM class_assignments WHERE assignment_id = ? AND student_id = ?`,
                [assignment_id, student.student_id]
            )
        }

        const studentsToAdd = student_ids.filter(
            student => !previousStudentIds.includes(student.student_id)
        );
       
        
        for (const student of studentsToAdd) {                      
            await connection.query(
                `INSERT INTO class_assignments (assignment_id, student_id, form_id)
                VALUES (?, ?, ?)`,
                [assignment_id, student.student_id, formId]
            )
        }
                         
        const [assignmentResult] = await connection.query(
            `UPDATE assignments 
                SET name = ?, instruction = ?, points = ?, due_date = ? 
                WHERE assignment_id = ?`,
            [name, instruction, points, due_date, assignment_id]
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
                assignments.*, 
                GROUP_CONCAT(
                    CONCAT(
                        '{"',
                            'form_id": "', IFNULL(class_assignments.form_id, ''), '",',
                            'form_answers": "', IFNULL(class_assignments.form_answers, ''), '",',
                            'assignment_status": "', IFNULL(class_assignments.assignment_status, ''), '",',
                            'pass_date": "', IFNULL(class_assignments.pass_date, ''), '",',
                            'grade": "', IFNULL(class_assignments.grade, ''), '",',
                            'attachments": "', IFNULL(class_assignments.attachments, ''), '",',
                            'student_id": "', IFNULL(students.student_id, ''), '",',
                            '"student_code": "', IFNULL(students.student_string_id, ''), '",',
                            '"fullname": "', IFNULL(CONCAT(students.last_name, ' ', students.first_name, ' ', COALESCE(students.middle_name, '')), ''), '",',
                            '"email_address": "', IFNULL(students.email_address, ''), '"'                            
                        '}'
                    )
                    SEPARATOR ','
                ) AS students                            
            FROM assignments
            LEFT JOIN class_assignments ON class_assignments.assignment_id = assignments.assignment_id            
            LEFT JOIN students ON students.student_id = class_assignments.student_id
            WHERE assignments.class_id = ?
            GROUP BY assignments.assignment_id
            ORDER BY start_date ASC`, [assignment_id]
        )

        if (!result.length) {
            return { 
                error: false,
                succesfull: false   
            };
        }

                
        const res = result.map((assignment) => {
            const startDate = new Date(assignment.start_date);  
            const dueDate = formatDateTimeForFullDetail(new Date(assignment.due_date));
            const dateStart = formatDateTimeForFullDetail(new Date(assignment.start_date));
        
            assignment.due_date = dueDate;
            assignment.start_date = dateStart;
            assignment.formatted_start_date = formatDateTimeForAssignment(startDate);
            assignment.students = JSON.parse(`[${assignment.students}]`)
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
        const { grade, student_id, assignment_id } = assignmentData
        const status = 'Returned'
        const [result] = await db.query(
            `UPDATE class_assignments SET grade = ?, assignment_status = ?
            WHERE assignment_id = ? AND student_id = ?`,
            [grade, status, assignment_id, student_id]
        )

        if (!result.affectedRows) {
            return {
                error: false,
                succesfull: false,
            };
        }
        
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

const GetGradeAssignmentService = async(class_id) => {
    try {        
        const [result] = await db.query(
            `
            SELECT
                assignments.*,
                GROUP_CONCAT(
                    CONCAT(
                        '{',
                            '"form_id": "', IFNULL(class_assignments.form_id, ''), '",',
                            '"form_answers": "', IFNULL(class_assignments.form_answers, ''), '",',
                            '"assignment_status": "', IFNULL(class_assignments.assignment_status, ''), '",',
                            '"pass_date": "', IFNULL(class_assignments.pass_date, ''), '",',
                            '"grade": "', IFNULL(class_assignments.grade, 0), '",',
                            '"attachments": "', IFNULL(class_assignments.attachments, ''), '",',
                            '"student_id": "', IFNULL(students.student_id, ''), '",',
                            '"student_code": "', IFNULL(students.student_string_id, ''), '",',
                            '"fullname": "', IFNULL(CONCAT(students.last_name, ', ', students.first_name, ' ', COALESCE(students.middle_name, '')), ''), '",',
                            '"email_address": "', IFNULL(students.email_address, ''), '",',
                            '"is_assigned": "', IF(class_assignments.assignment_id IS NOT NULL, '1', '0'), '"'
                        '}'
                    )
                    SEPARATOR ','
                ) AS students
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
        // console.log(result[0].students);
        
        
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
            assignment.students = JSON.parse(`[${assignment.students}]`);
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

const GetAssignmentsService = async (class_id) => {

    try {        
        const [result] = await db.query(
            `
            SELECT
                assignments.*,
                GROUP_CONCAT(                   
                    CONCAT(
                        '{',
                            '"form_id": "', IFNULL(class_assignments.form_id, ''), '",',
                            '"form_answers": "', IFNULL(class_assignments.form_answers, ''), '",',
                            '"assignment_status": "', IFNULL(class_assignments.assignment_status, ''), '",',
                            '"pass_date": "', IFNULL(class_assignments.pass_date, ''), '",',
                            '"grade": "', IFNULL(class_assignments.grade, ''), '",',
                            '"attachments": "', IFNULL(class_assignments.attachments, ''), '",',
                            '"student_id": "', IFNULL(students.student_id, ''), '",',
                            '"student_code": "', IFNULL(students.student_string_id, ''), '",',
                            '"fullname": "', IFNULL(CONCAT(students.last_name, ' ', students.first_name, ' ', COALESCE(students.middle_name, '')), ''), '",',
                            '"email_address": "', IFNULL(students.email_address, ''), '"'                            
                        '}'
                    )
                    SEPARATOR ','
                ) AS students
            FROM assignments
            LEFT JOIN class_assignments ON class_assignments.assignment_id = assignments.assignment_id
            LEFT JOIN students ON students.student_id = class_assignments.student_id            
            WHERE assignments.class_id = ? 
            GROUP BY assignments.assignment_id
            ORDER BY start_date ASC`,
            [class_id]
        );

        
        
               
        if (!result.length) {
            return { 
                error: false,
                succesfull: false
            };
        }
        // console.log(result[0].students);
        
        
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
           
            assignment.students = JSON.parse(`[${assignment.students}]`);
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
    GetAssignmentsService,
    GetGradeAssignmentService
}