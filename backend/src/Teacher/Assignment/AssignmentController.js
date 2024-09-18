const db = require("../../database/db")
const {
    CreateAssignmentService,
    EditAssignmentService,
    RemoveAssignmentService,
    GetAssignStudentsWorkService,
    GradeAssignmentService,
    GetAssignmentsService } = require("./AssignmentService")

const CreateAssignment = async (req, res) => {
    
    try {
        const assignmentData = req.body;
                
        const createAssignmentResult = await CreateAssignmentService(assignmentData)

        if (!createAssignmentResult.succesfull) {
            return res.status(400).json({ 
                title: "Create New Assignment Failed", 
                message: "New assignment was not created.",
                data: []
            });
        }

        return res.status(200).json({ 
            title: "New Assignment Created", 
            message: `The new assignment was succesfully created`,
            data: createAssignmentResult.data
            
        });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }

}


const EditAssignment = async (req, res) => {

    const { name, instruction, attachment, points, startDate, 
        dueDate, classId, studentIds, formId } = req.body 
    try {

    } catch (error) {
       
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}


const RemoveAssignment = async (req, res) => {
    
    try {
        const { assignment_id } = req.params
                
        const removeAssignmentResult = await RemoveAssignmentService(assignment_id)
        
        if (!removeAssignmentResult.succesfull) {
            return res.status(400).json({ 
                title: "Assignment Delete Failed", 
                message: "The assignment was not deleted successfully." 
            });
        }

        return res.status(200).json({ 
            title: "Assignment Deleted", 
            message: `The assignment was succesfully deleted.`,
            
        });

    } catch (error) {        
        console.error(error);
        return res.status(500).json({ 
            title: "Internal Error", 
            message: "Something went wrong!" 
        });
    }
}

const GetAssignStudents = async (req, res) => {
   
    try {
        const { assignment_id } = req.params

        const getAssignStudentsResult = await GetAssignStudentsWorkService(assignment_id)

        if (!getAssignStudentsResult.succesfull) {
            return res.status(400).json({ 
                title: "No assigned student/s found", 
                message: "There's no students assigned in this assignment." 
            });
        }
        return res.status(200).json({ 
            title: "Assigned student/s found", 
            message: `There's students assigned in this assignment.`,
            data: getAssignStudentsResult.data
            
        });
    } catch (error) {
      
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }

}

const GetAssignments = async (req, res) => {
    try {
        const { class_id } = req.params

        const getAssignmentsResult = await GetAssignmentsService(class_id)

        if (!getAssignmentsResult.succesfull) {
            return res.status(200).json({ 
                title: "No Assignment Found", 
                message: "There's no assignment record.",
                data: []
            });
        }
        return res.status(200).json({ 
            title: "Assignment Found", 
            message: `There's assignment record.`,
            data: getAssignmentsResult.data
            
        });

    } catch (error) {
      
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const GetStudentsAssignments = async (req, res) => {

    try {
        const { class_id } = req.params

        
        

    } catch (error) {
      
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const GradeAssignment = async (req, res) => {
    try {
        const { assignment_id } = req.params


    } catch (error) {
      
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

module.exports = {
    CreateAssignment,
    EditAssignment,
    RemoveAssignment,
    GetAssignStudents,
    GetAssignments,
    GradeAssignment

}