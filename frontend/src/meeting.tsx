import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import necessary hooks
import { Authentication } from './Auth/Authentication';

const MeetingPage = () => {
    const { getID, getRole } = Authentication()
    const navigate = useNavigate();
    const { class_id, meeting_name } = useParams(); // Get class_id from the URL
    console.log(getRole());
    
    useEffect(() => {
        // Redirect based on user role
        const meet_name = decodeURIComponent(meeting_name || "");
        if (getRole() === 'Teacher') {
            localStorage.setItem('meetingName', meet_name || "");
            window.open(`/teacher/${getID()}/class/${class_id}/meeting`, '_blank');
                    
        } else if (getRole() === 'Student') {            
            localStorage.setItem('meetingName', meet_name || "");
            window.open(`/student/${getID()}/class/${class_id}/meeting`, '_blank');
        }
    }, [getRole(), navigate, class_id, meeting_name]);

    return null; // No need to render anything as you are redirecting
};

export default MeetingPage;
