const {   
    CreateMeetingService,
    EditMeetingService,
    RemoveMeetingService,
    GetMeetingsService } = require("./CalendarService")

const CreateMeeting = async (req, res) => {
    try {
        const meetingData = req.body;
            
        const createMeetingResult = await CreateMeetingService(meetingData)

        if (!createMeetingResult.succesfull) {
            return res.status(400).json({ 
                title: "Schedule Meeting Failed", 
                message: "schedule meeting was not created.",
                data: []
            });
        }

        return res.status(200).json({ 
            title: "New meeting Created", 
            message: `The new meeting was succesfully created`,
            data: createMeetingResult.data
            
        });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
}

const EditMeeting = async (req, res) => {
    try {
        const meetingData = req.body;
            
        const editMeetingResult = await EditMeetingService(meetingData)

        if (!editMeetingResult.succesfull) {
            return res.status(400).json({ 
                title: "Schedule Meeting Failed", 
                message: "New assignment was not created.",
                data: []
            });
        }

        return res.status(200).json({ 
            title: "New meeting Created", 
            message: `The new meeting was succesfully created`,
            data: editMeetingResult.data
            
        });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
}

const RemoveMeeting = async (req, res) => {
    try {
        const { class_meeting_id } = req.params;
            
        const removeMeetingResult = await RemoveMeetingService(class_meeting_id)

        if (!removeMeetingResult.succesfull) {
            return res.status(400).json({ 
                title: "Schedule Meeting Failed", 
                message: "New assignment was not created.",
                data: []
            });
        }

        return res.status(200).json({ 
            title: "New meeting Created", 
            message: `The new meeting was succesfully created`,
            data: removeMeetingResult.data
            
        });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
}

const GetMeetings = async (req, res) => {
    try {
        const { teacher_id } = req.params;
            
        const getMeetingResult = await GetMeetingsService(teacher_id)

        if (!getMeetingResult.succesfull) {
            return res.status(400).json({ 
                title: "Schedule Meeting Failed", 
                message: "New assignment was not created.",
                data: []
            });
        }

        return res.status(200).json({ 
            title: "New meeting Created", 
            message: `The new meeting was succesfully created`,
            data: getMeetingResult.data
            
        });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
}

module.exports = {    
    CreateMeeting,
    EditMeeting,
    RemoveMeeting,
    GetMeetings
}
