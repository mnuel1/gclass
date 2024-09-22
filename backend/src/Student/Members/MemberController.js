
const { GetMemberService } = require("./MemberService")

const GetMembers = async (req, res) => {

    try {        
        const { class_id } = req.params

        const getMemberResult = await GetMemberService(class_id)
                
        if (getMemberResult.error) {
            return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
        }

        return res.status(200).json({ 
            title: "Members Fetched", 
            message: `Members fetched`,
            data: getMemberResult.data
            
        });
        
    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

module.exports = {    
    GetMembers
}