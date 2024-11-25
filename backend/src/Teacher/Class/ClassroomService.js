const db = require("../../database/db");

function generateClassStringID(teacher_id) {
  const today = new Date();
  const seed = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today
    .getDate()
    .toString()
    .padStart(2, "0")}${teacher_id}`;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash = hash & hash;
  }

  function randomChar() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return chars[
      Math.abs((hash = (hash * 1664525 + 1013904223) % 2147483648)) %
        chars.length
    ];
  }

  let randomString = "";
  for (let i = 0; i < 6; i++) {
    randomString += randomChar();
  }

  return randomString;
}

const CreateClassService = async (classData) => {
  try {
    const { teacher_id, name, description } = classData;

    const class_string_id = generateClassStringID(teacher_id);

    const [result] = await db.query(
      `INSERT INTO class (class_string_id, teacher_id, name, description) VALUES (?, ?, ?, ?)`,
      [class_string_id, teacher_id, name, description]
    );

    const class_id = result.insertId;

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
      data: {
        class_id,
        teacher_id,
        class_string_id,
        name,
        description,
        created_time,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
    };
  }
};

const EditClassService = async (classData) => {
  try {
    const { name, description, class_id } = classData;

    const [result] = await db.query(
      `UPDATE class SET name = ?, description = ? WHERE class_id = ?`,
      [name, description, class_id]
    );

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
      error: true,
    };
  }
};

const RemoveClassService = async (class_id) => {
  try {
    const [result] = await db.query(`DELETE FROM class WHERE class_id = ?`, [
      class_id,
    ]);

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
      error: true,
    };
  }
};

const GetClassesService = async (teacher_id) => {
  try {
    const [result] = await db.query(
      `SELECT 
                class.*,
                (
                    SELECT COUNT(*) 
                    FROM class_students 
                    WHERE class_students.class_id = class.class_id 
                    AND class_students.status = 'Approved'
                ) as student_count,
                (
                    SELECT GROUP_CONCAT(
                        CONCAT(
                            '{"student_id":', s.student_id,
                            ',"first_name":"', s.first_name,
                            '","last_name":"', s.last_name,
                            '","email_address":"', s.email_address,
                            '"}'
                        )
                    )
                    FROM class_students cs
                    JOIN students s ON s.student_id = cs.student_Id
                    WHERE cs.class_id = class.class_id AND cs.status = 'Approved'
                ) AS class_students
            FROM class 
            WHERE teacher_id = ?`,
      [teacher_id]
    );

    const processedResult = result.map((item) => ({
      ...item,
      class_students: item.class_students
        ? JSON.parse(`[${item.class_students}]`)
        : [],
    }));

    return {
      error: false,
      successful: processedResult.length > 0,
      message:
        processedResult.length > 0
          ? "Classes retrieved successfully"
          : "No classes found",
      data: processedResult,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      successful: false,
      message: "Error retrieving classes",
      data: [],
    };
  }
};

module.exports = {
  CreateClassService,
  EditClassService,
  RemoveClassService,
  GetClassesService,
};
