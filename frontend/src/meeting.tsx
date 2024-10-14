import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import necessary hooks
import { Authentication } from './Auth/Authentication';

const MeetingPage = () => {
    const { getID, getRole } = Authentication()
    const navigate = useNavigate();
    const { class_id, meeting_name } = useParams();
    
    
    useEffect(() => {
        
        if (getRole() === null ) {
            navigate(-1)
        }
                
        const meet_name = decodeURIComponent(meeting_name || "");        
        if (getRole() === 'Teacher') {
                        
            localStorage.setItem('meetingName', meet_name || "");
            localStorage.setItem('classId', class_id || "");
            navigate(`/teacher/${getID()}/class/${class_id}/meeting`);            
                    
        } else if (getRole() === 'Student') {                        
            localStorage.setItem('meetingName', meet_name || "");
            localStorage.setItem('classId', class_id || "");            
       
            navigate(`/student/${getID()}/class/${class_id}/meeting`);
        } 
    }, [getRole(), navigate, class_id, meeting_name]);

    return null;
};

export default MeetingPage;
