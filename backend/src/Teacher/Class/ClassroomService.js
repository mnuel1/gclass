const db = require("../../database/db");

function generateClassStringID(teacher_id, className) {    
    let classStringID = 'C';
        
    const classNameInitials = className
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
        
    classStringID += classNameInitials + '-00' + teacher_id;
        
    return classStringID;
}


const CreateClassService = async (classData) => {
    
    try {
        
        const {teacher_id, name, description} = classData

        const class_string_id = generateClassStringID(teacher_id, name);

        const [result] = await db.query(
            `INSERT INTO class (class_string_id, teacher_id, name, description) VALUES (?, ?, ?, ?)`,
            [class_string_id, teacher_id, name, description]
        )

        const class_id = result.insertId

        if (!result.affectedRows) {
            return {
                error: false,
                succesfull: false,
            };
        }
        const now = new Date();
        const created_time = now.toLocaleString();         

        return {
            error: false,
            succesfull: true,
            data: {class_id, teacher_id, class_string_id, name, description,created_time }
        };
    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }
}

const EditClassService = async (classData) => {
    
    try {
        const { name, description, class_id } = classData 
    
        const [result] = await db.query(
            `UPDATE class SET name = ?, description = ? WHERE class_id = ?`,
            [name, description, class_id]
        )

        if (!result.length) {
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

const RemoveClassService = async (class_id) => {
    
    try {
            
        const [result] = await db.query(
            `DELETE FROM class WHERE class_id = ?`,
            [class_id]
        )

        if (!result.length) {
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

const GetClassesService = async (teacher_id) => {
    
    try {
            
        const [result] = await db.query(
            `SELECT * FROM class WHERE teacher_id = ?`,
            [teacher_id]
        )

        if (!result.length) {
            return {
                error: false,
                succesfull: false,
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
    CreateClassService,
    EditClassService,
    RemoveClassService,
    GetClassesService,
}