const db = require("../../database/db")
const {
    CreateClassService,
    EditClassService,
    RemoveClassService,
    GetClassesService } = require("./ClassroomService")

const CreateClass = async (req, res) => {

   
    try {
        const createClassResult = await CreateClassService(req.body)

        if (!createClassResult.succesfull) {
            return res.status(400).json({ 
                title: "Creating new  Class failed", 
                message: "Something went wrong." 
            });
        }
        
        return res.status(200).json({ 
            title: "Created Class ", 
            message: `The new class was successfully created. `,
            data: createClassResult.data
        });
    } catch (error) {       
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }

}


const EditClass = async (req, res) => {

    
    try {

        const editClassResult = await EditClassService(req.body)
        

        if (!editClassResult.succesfull) {
            return res.status(400).json({ 
                title: "Edit Class failed", 
                message: "Something went wrong." 
            });
        }        
        return res.status(200).json({ 
            title: "Edit Classes Success", 
            message: `The class was edited successfully.`,
        });

    } catch (error) {       
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}


const RemoveClass = async (req, res) => {

    const { class_id } = req.params

    try {

        const removeClassResult = await RemoveClassService(class_id)

        if (!removeClassResult.succesfull) {
            return res.status(400).json({ 
                title: "Remove Class Failed", 
                message: "Something went wrong." 
            });
        }
            
        return res.status(200).json({ 
            title: "Class Removed", 
            message: `The class was succesfully removed.`,            
        });

    } catch (error) {       
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const GetClasses = async (req, res) => {
    const { teacher_id } = req.params

    try {

        const getClassesResult = await GetClassesService(teacher_id)

        if (!getClassesResult.succesfull) {
            return res.status(200).json({ 
                title: "Get Classes failed", 
                message: "Something went wrong.", 
                data: []
            });
        }
        
        return res.status(200).json({ 
            title: "Get Classes Success", 
            message: `clasess get`,
            data: getClassesResult.data
            
        });

    } catch (error) {      
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}



module.exports = {
    CreateClass,
    EditClass,
    RemoveClass,   
    GetClasses,

}