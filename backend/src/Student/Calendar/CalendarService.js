const db = require("../../database/db")


const GetMeetingsService = async (student_id) => {
    try {

        const [result] = await db.query(
            `SELECT 
                class_students.*,
                class_meetings.*
            FROM class_students 
            LEFT JOIN class_meetings ON class_meetings.class_id = class_students.class_id            
            WHERE student_id = ?`,
            [student_id]
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
    GetMeetingsService
}