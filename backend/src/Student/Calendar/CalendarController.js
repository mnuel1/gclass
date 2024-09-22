const { GetMeetingsService } = require("./CalendarService")

const GetMeetings = async (req, res) => {
    try {
        const { student_id } = req.params;
            
        const getMeetingResult = await GetMeetingsService(student_id)

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
    GetMeetings
}
