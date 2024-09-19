const db = require("../database/db");

const SearchAll = async (req, res) => {
    try {
        const { name } = req.params;
        const searchTerm = `%${name}%`; 

        const [result] = await db.query(
            `
            SELECT 'student' AS type, CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) AS full_name, student_id, student_string_id, email_address 
            FROM students 
            WHERE CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) LIKE ?
            UNION
            SELECT 'teacher' AS type, CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) AS full_name, teacher_id, teacher_string_id, email_address
            FROM teachers 
            WHERE CONCAT(first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) LIKE ?
            `,
            [searchTerm, searchTerm] 
        );

        if (!result.length) {
            return res.status(200).json({ 
                title: "Not Found", 
                message: "The name is not found." 
            });
        }

            return res.status(200).json({ 
            title: "Name found", 
            message: "The name is found.", 
            data: result 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
};

const SearchStudents = async (req, res) => {
    try {
        const { name, class_id } = req.params;
        const searchTerm = `%${name}%`; 
       
        const [result] = await db.query(
            `
            SELECT 'student' AS type, 
                CONCAT(s.first_name, ' ', COALESCE(s.middle_name, ''), ' ', s.last_name) AS fullname,
                s.student_id, 
                s.student_string_id AS student_code, 
                s.email_address
            FROM students s
            WHERE CONCAT(s.first_name, ' ', COALESCE(s.middle_name, ''), ' ', s.last_name) LIKE ?
            AND NOT EXISTS (
                SELECT 1 
                FROM class_students cs 
                WHERE cs.student_id = s.student_id
                AND cs.class_id = ?
            )
            `,
            [searchTerm, class_id] 
        );

        if (!result.length) {
            return res.status(200).json({ 
                title: "Not Found", 
                message: "The name is not found." 
            });
        }
        
        return res.status(200).json({ 
            title: "Name found", 
            message: "The name is found.", 
            data: result 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
};

module.exports = {
    SearchAll,
    SearchStudents
};
