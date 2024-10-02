const db = require("../../database/db");

const formatDateForGrouping = (date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

const formatDateTimeForActivity = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(date);
};

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'edusync@resiboph.site',
        pass: '|N3qrKEp?'
    }
});


const GetActivityService = async (class_id) => {
    try {        
        const [result] = await db.query(
            `SELECT * FROM activity 
             WHERE class_id = ? 
             ORDER BY created_time DESC`, 
            [class_id]
        );

        if (!result.length) {
            return { 
                error: false,
                succesfull: false   
            };
        }
        
        const groupedResult = result.reduce((acc, activity) => {
            const createdTime = new Date(activity.created_time);  
            const groupKey = formatDateForGrouping(createdTime);  

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            
            activity.formatted_created_time = formatDateTimeForActivity(createdTime);
            acc[groupKey].push(activity);

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

const CreateMeetingActivityService = async (meetingData) => {

    const connection = await db.getConnection();
    try {
        const { class_id, title } = meetingData;
        const link = `http://localhost:5173/meeting/${class_id}/${encodeURIComponent(title)}`;
        
        const post = `<h4 class='text-sm'>
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
            </h4>`;
        
        const [result] = await connection.query(
            `
            INSERT INTO activity (class_id, posts)
            VALUES (?, ?)`,
            [class_id, post]
        );

        if (!result.affectedRows) {  
            await connection.rollback();          
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
        );

        const emailAddresses = getStudentsResult.map(student => student.email_address).join(',');

        const mailOptions = {
            from: 'edusync@resiboph.site',
            to: emailAddresses,
            subject: "Meeting now",
            html: `<h4 class='text-sm'>
            <strong>Meeting now!</strong><br />
            <strong>${title}</strong><br />
            Don't forget, we've got a meeting today! Click the link below to join:<br />
            <a href="${link}" target="_blank" rel="noopener noreferrer" style="
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
            ">Join Meeting</a>
            <br />
            See you there!
            </h4>`,            
        };

        
        const emailResult = await transporter.sendMail(mailOptions); 
        if (!emailResult) {
            await connection.rollback();
            console.log("error send email");
            
            return {
                error: true,
                message: "Failed to send email."
            };  
        } else {
            await connection.commit();
            return {
                error: false,
                succesfull: true, 
                data: []
            };
        }
    } catch (error) {
        await connection.rollback();
        console.error('Error:', error);
        return {
            error: true,
            message: error.message || 'An unknown error occurred.'
        };            
    }
}

module.exports = {
    GetActivityService,
    CreateMeetingActivityService
};
