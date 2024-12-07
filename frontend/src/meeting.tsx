import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import necessary hooks
import { Authentication } from './Auth/Authentication';

const MeetingPage = () => {
    const { getUser, getRole } = Authentication()
    const navigate = useNavigate();
    const { class_id, meeting_name } = useParams();
    
    
    useEffect(() => {
        
        if (getRole() === null ) {
            navigate(-1)
        }
                
        const meet_name = decodeURIComponent(meeting_name || "");        
        // if (getRole() === 'Teacher') {
                        
        //     sessionStorage.setItem('user', getUser() || "");
        //     sessionStorage.setItem('role', "teacher");
        //     // navigate(`/teacher/${getID()}/class/${class_id}/meeting`);            
                    
        // } else if (getRole() === 'Student') {                        
        //     sessionStorage.setItem('user', getUser() || "");
        //     sessionStorage.setItem('role', "student");            
       
        //     // navigate(`/student/${getID()}/class/${class_id}/meeting`);
        // } 
        navigate(`/room/${meet_name}`);
    }, [getRole(), navigate, class_id, meeting_name]);

    return null;
};

export default MeetingPage;
