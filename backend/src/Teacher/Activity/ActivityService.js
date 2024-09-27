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
        user: 'jobportal@resiboph.site',
        pass: '9@omljoYWV'
    }
});


const GetActivityService = async (class_id) => {
    try {        
        const [result] = await db.query(
            `SELECT * FROM activity 
             WHERE class_id = ? 
             ORDER BY created_time ASC`, 
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

    try {
        const {class_id, title} = meetingData
        const link = `http://localhost:5173/meeting/${class_id}/${encodeURIComponent(title)}`
        const post = `<h4 className='text-sm'>
            🚨 <strong>Meeting now!</strong><br />
            <strong>${title}</strong><br />
            Don't forget, we've got a meeting today! Click the link below to join:<br />
            👉 <a href=${link} target="_blank" rel="noopener noreferrer">Join Meeting</a><br />
            See you there!
            </h4>`
        
        const [result] = await db.query(
            `
            INSERT INTO activity (class_id, posts)
            VALUES (?, ?)`,
            [class_id, post]
        )

        if (!result.affectedRows) {
            return { 
                error: false,
                succesfull: false,
                data: []
            };
        }

        const [getStudentsResult] = await db.query(
            `SELECT students.email_address FROM students 
            LEFT JOIN class_students ON class_students.student_id = students.student_id
            WHERE class_students.class_id = ?`,
            [class_id]
        )
        
        const emailAddresses = getStudentsResult.map(student => student.email_address).join(',');
        
        const mailOptions = {
            from: 'jobportal@resiboph.site',
            to: emailAddresses,
            subject: "Meeting now",
            html: `<h4 className='text-sm'>
            🚨 <strong>Meeting now!</strong><br />
            <strong>${title}</strong><br />
            Don't forget, we've got a meeting today! Click the link below to join:<br />
            👉 <a href=${link} target="_blank" rel="noopener noreferrer">Join Meeting</a><br />
            See you there!
            </h4>`,            
        };
        
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent to all students');
        } catch (error) {
            console.error('Failed to send email:', error);
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

module.exports = {
    GetActivityService,
    CreateMeetingActivityService
};
