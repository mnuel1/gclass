
const { GetActivityService } = require("./ActivityService")

const GetActivities = async (req, res) => {

    try {

        const { class_id } = req.params
        const getActivityResult = await GetActivityService(class_id)
        

        if (!getActivityResult.succesfull) {
            return res.status(200).json({ 
                title: "No Activity Found", 
                message: "There's no record for activity yet." 
            });
        }
        console.log(getActivityResult);
        
        return res.status(200).json({ 
            title: "Activity Found", 
            message: "There's a record for activity.",
            data: getActivityResult.data
        });
        
    } catch (error) {        
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }

}

module.exports = {
    GetActivities
}