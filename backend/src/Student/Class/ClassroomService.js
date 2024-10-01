const db = require("../../database/db");


const JoinClassService = async (class_string_id, student_id) => {
    const connection = await db.getConnection()
    try {
                
        const [findClassResult] = await connection.query(
            `SELECT * FROM class WHERE class_string_id = ?`,
            [class_string_id]
        )        
        if (!findClassResult.length) {
            connection.rollback()
            return {    
                error: false,
                succesfull: false,
                joined: false,
            };
        }

        const [isJoinResult] = await connection.query(
            `SELECT COUNT(*) as count FROM class_students WHERE class_id = ? AND student_id = ?`,
            [findClassResult[0].class_id, student_id]
        );
        
        if (isJoinResult[0].count > 0) {
            await connection.rollback(); 
            return {    
                error: false,
                successful: false,
                joined: true
            };
        }
               
        const [joinClassResult] = await connection.query(
            `INSERT INTO class_students (class_id, student_id) 
            VALUES (?, ?)`,
            [findClassResult[0].class_id, student_id]
        )

        if(!joinClassResult.affectedRows) {
            connection.rollback()
            return {
                error: false,
                succesfull: false,
                joined: false,                
            };
        }        
        
        await connection.commit()
        

        return {
            error: false,
            succesfull: true,
            joined: false,
            data: findClassResult
        };
    } catch (error) {
        connection.rollback()
        console.error(error);
        return {
            error: true
        }            
    }
}

const GetClassesService = async (student_id) => {
    
    try {
            
        const [result] = await db.query(
            `SELECT 
                class_students.*,
                class.*,
                CONCAT(teachers.last_name, ', ', teachers.first_name, ' ', COALESCE(teachers.middle_name, '')) AS teacher_name
            FROM 
                class_students             
            LEFT JOIN 
                class ON class.class_id = class_students.class_id
            LEFT JOIN 
                teachers ON teachers.teacher_id = class.teacher_id
            WHERE 
                student_id = ?
`,
            [student_id]
        )

        if (!result.length) {
            return {
                error: false,
                succesfull: false,
                data: []
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


module.exports = {
    JoinClassService,
    GetClassesService,
}