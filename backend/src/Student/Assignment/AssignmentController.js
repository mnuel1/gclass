const {
    CreateAssignmentService,
    EditAssignmentService,        
    GetAssignmentsService, 
    GetGradeAssignmentService } = require("./AssignmentService")

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
    
    try {
        const assignmentData = req.body;

        const editAssignmentResult = await EditAssignmentService(assignmentData)

        if (!editAssignmentResult.succesfull) {
            return res.status(400).json({ 
                title: "Edit Assignment Failed", 
                message: "Assignment was not edited.",
                data: []
            });
        }

        return res.status(200).json({ 
            title: "Assignment Edited", 
            message: `The assignment was succesfully edited`,
            data: editAssignmentResult.data
            
        });

    } catch (error) {
       
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

const GetAssignments = async (req, res) => {
    try {
        const { class_id, student_id } = req.params

        const getAssignmentsResult = await GetAssignmentsService(class_id, student_id)

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

const GetStudentGrades = async (req, res) => {
    try {
        const { class_id } = req.params

        const getGradeStudentGrades = await GetGradeAssignmentService(class_id)

        if (!getGradeStudentGrades.succesfull) {
            return res.status(200).json({ 
                title: "No Assignment Found", 
                message: "There's no assignment record.",
                data: []
            });
        }
        return res.status(200).json({ 
            title: "Assignment Found", 
            message: `There's assignment record.`,
            data: getGradeStudentGrades.data
            
        });

    } catch (error) {
      
        console.error(error);
        return res.status(500).json({ title: "Internal Error", message: "Something went wrong!" });
    }
}

module.exports = {
    CreateAssignment,
    EditAssignment,   
    GetAssignments,
    GetStudentGrades

}