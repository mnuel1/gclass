
const {
    CreateMemberService,
    GetMemberService,
    RemoveMemberService } = require("./MemberService")



const AddMembers = async (req, res) => {

    try {
        const memberData = req.body

        const addMemberResult = await CreateMemberService(memberData)

        if (addMemberResult.error) {
            return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
        }

        return res.status(200).json({ 
            title: "Member/s Added", 
            message: `Members was added succesfully.`,
        });

    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
    
}

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

const RemoveMembers = async (req, res) => {

    try {

        const memberData = req.body

        const removeMemberResult = RemoveMemberService(memberData)

        if (removeMemberResult.error) {
            return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
        }

        return res.status(200).json({ 
            title: "Member/s Deleted", 
            message: `Members was deleted succesfully.`,            
        });                
    } catch (error) {       
        console.log(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

module.exports = {
    AddMembers,
    GetMembers,
    RemoveMembers
}