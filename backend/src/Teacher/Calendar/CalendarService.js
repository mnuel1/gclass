const db = require("../../database/db")
const transporter = require("../../../mailer")

const CreateMeetingService = async (meetingData) => {
    const connection = await db.getConnection()
    try {
        const {class_id, title, start_date} = meetingData
        const link = `/meeting/${class_id}/${encodeURIComponent(title + class_id)}`
        const [result] = await connection.query(
            `
            INSERT INTO class_meetings (class_id, title, link, start_date)
            VALUES (?, ?, ?, ?)`,
            [class_id, title, link, start_date]
        )

        if (!result.affectedRows) {
            return { 
                error: false,
                succesfull: false,
                data: []
            };
        }

        const [getStudentsResult] = await connection.query(
            `SELECT students.email_address FROM students 
            LEFT JOIN class_students ON class_students.student_id = students.student_id
            WHERE class_students.class_id = ?`,
            [class_id]
        )
        
        const emailAddresses = getStudentsResult.map(student => student.email_address).join(',');
       
        const date = new Date(start_date); 

        const month = date.getMonth() + 1; 
        const day = date.getDate();
        const year = date.getFullYear();

        const mailOptions = {
            from: 'nreplyedusync@resiboph.site',
            to: emailAddresses,
            subject: `Scheduled Meeting on ${month}/${day}/${year}`,
            html: `<h4 class='text-sm'>
            <strong>Meeting now!</strong><br />
            <strong>${title}</strong><br />
            Don't forget, we've got a meeting today! Check our class in Edusync to join<br />                        
            See you there!
            </h4>`,            
        };
        
        if (!transporter.sendMail(mailOptions)) {
            await connection.rollback()
            return {
                error: true
            }  
        } else {
            await connection.commit()
            return {
                error: false,
                succesfull: true,
                data: []
            };

        }
                            
    } catch (error) {
        await connection.rollback()
        console.error(error);
        return {
            error: true
        }            
    }
}

const EditMeetingService = async (meetingData) => {
    const connection = await db.getConnection()
    try {
        
        const {start_date, class_meeting_id, class_id} = meetingData
        const [result] = await connection.query(
            `
            UPDATE class_meetings SET start_date = ? WHERE class_meeting_id = ?`,
            [start_date, class_meeting_id]
        )

        if (!result.affectedRows) {
            return { 
                error: false,
                succesfull: false,
                data: []
            };
        }

        const [getStudentsResult] = await connection.query(
            `SELECT students.email_address FROM students 
            LEFT JOIN class_students ON class_students.student_id = students.student_id
            WHERE class_students.class_id = ?`,
            [class_id]
        )
        
        const emailAddresses = getStudentsResult.map(student => student.email_address).join(',');
        
        const mailOptions = {
            from: 'nreplyedusync@resiboph.site',
            to: emailAddresses,
            subject: "Meeting now",
            html: `<h4 className='text-sm'>
            <strong>Meeting now!</strong><br />
            <strong>${title}</strong><br />
            Don't forget, we've got a meeting today! Click the link below to join:<br />
            <a href=${link} target="_blank" rel="noopener noreferrer" style="
                display: inline-block; 
                padding: 10px 20px; 
                font-size: 16px; 
                color: white; 
                background-color: #007bff; 
                border: none; 
                border-radius: 5px; 
                text-decoration: none; 
                text-align: center; 
                transition: background-color 0.3s, transform 0.2s;
            ">Join Meeting</a><br />
            See you there!
            </h4>`,            
        };
        
        if (!transporter.sendMail(mailOptions)) {
            await connection.rollback()
            return {
                error: true
            }  
        } else {
            await connection.commit()
            return {
                error: false,
                succesfull: true,
                data: []
            };

        }
                            
    } catch (error) {
        await connection.rollback()
        console.error(error);
        return {
            error: true
        }            
    }
}

const RemoveMeetingService = async (class_meeting_id) => {

    try {

        const [result] = await db.query(
            `DELETE FROM class_meetings WHERE class_meeting_id = ?`,
            [class_meeting_id]
        )

        if (!result.affectedRows) {
            return { 
                error: false,
                succesfull: false,
                data: []
            };
        }
    
        return {
            error: false,
            succesfull: true,
            data: []
        };
    } catch (error) {
        console.error(error);
        return {
            error: true
        }            
    }

}

const GetMeetingsService = async (teacher_id) => {
    try {

        const [result] = await db.query(
            `SELECT cm.* FROM class_meetings cm JOIN class c ON cm.class_id = c.class_id WHERE c.teacher_id = ?`,
            [teacher_id]
        )

        if (!result.length) {
            return { 
                error: false,
                succesfull: false,
                data: []
            };
        }

        const res = result.map((meeting) => {
            
            const dateObject = new Date(meeting.start_date);
                    
            const dayName = dateObject.toLocaleString('en-US', { weekday: 'short' }); 
            const monthName = dateObject.toLocaleString('en-US', { month: 'short' }); 
            const day = String(dateObject.getDate()).padStart(2, '0'); 
            const year = dateObject.getFullYear(); 
                    
            const hours = String(dateObject.getHours()).padStart(2, '0'); 
            const minutes = String(dateObject.getMinutes()).padStart(2, '0'); 
                                
            const formattedDate = `${dayName} ${monthName} ${day} ${year} ${hours}:${minutes}:00 ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
                    
            meeting.date = formattedDate; 
            meeting.time = `${hours}:${minutes}`; 
        
            return meeting; 
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

module.exports = {    
    CreateMeetingService,
    EditMeetingService,
    RemoveMeetingService,
    GetMeetingsService
}