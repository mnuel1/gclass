import { create } from 'zustand';
import { Assignments, AssignmentType } from './assignmentType';


interface AssignmentState {
    assignment: Assignments,
    selectedAssignment : AssignmentType | null
    getAssignment: (assignment : Assignments) => void
    createAssignment: (newAssignment : AssignmentType) => void
    editAssignment: (assignment : AssignmentType) => void
    editGrade: (assignment : any) => void
    removeAssignment: (assignment_id : string) => void
    selectAssignment: (assignment : AssignmentType) => void
}

const useAssignmentStore = create<AssignmentState>((set) => ({
    assignment: {},
    selectedAssignment: null,

    getAssignment: (assignment) => {
        set(() => ({
            assignment: {...assignment},
        }))
    },
    createAssignment: (newAssignment: AssignmentType) => set((state) => {
        return {
            assignment: {
                ...state.assignment,
                [newAssignment.start_date]: [
                    ...(state.assignment[newAssignment.start_date] || []),
                    newAssignment
                ]
            }
        };
    }),
    editAssignment: (updatedAssignment: AssignmentType) => 
        set((state) => {
        const date = updatedAssignment.start_date.split('T')[0];
        const updatedAssignments = state.assignment[date]?.map((assignment) =>
            assignment.assignment_id === updatedAssignment.assignment_id
                ? {
                    name: updatedAssignment.name,
                    instruction: updatedAssignment.instruction,
                    attachment: updatedAssignment.attachment,
                    students: updatedAssignment.students,
                    points: updatedAssignment.points,
                    due_date: updatedAssignment.due_date,
                }
                : assignment
        ) || [];

        return {
            assignment: {
                ...state.assignment,
                [date]: updatedAssignments
            }
        };
    }),
    editGrade: (updatedAssignment: { assignment_id: string; student_id: string; grade: number; status: string; }) => 
        set((state) => {
            const updatedAssignments = Object.keys(state.assignment).reduce((acc, date) => {
                const updatedDateAssignments = state.assignment[date]?.map((assignment) => {
                    // Check if the assignment matches the assignment_id
                    if (assignment.assignment_id === updatedAssignment.assignment_id) {
                        // Find the specific student within the assignment's students array
                        const updatedStudents = assignment.students?.map(student => 
                            student.student_id === updatedAssignment.student_id
                                ? { ...student, grade: updatedAssignment.grade, assignment_status: updatedAssignment.status }
                                : student
                        );
                        
                        // Return the updated assignment with the modified students array
                        return { ...assignment, students: updatedStudents };
                    }
                    return assignment; // Return unchanged assignment if no match
                });
    
                return { ...acc, [date]: updatedDateAssignments };
            }, {});
    
            return {
                assignment: {
                    ...state.assignment,
                    ...updatedAssignments
                }
            };
        }
    ),
    removeAssignment: async (assignment_id: string) => 
        set((state) => {
        const newAssignments = { ...state.assignment };

        Object.keys(newAssignments).forEach((date) => {
            newAssignments[date] = newAssignments[date].filter(
                (assignment) => assignment.assignment_id !== assignment_id
            );
        });

        return {
            assignment: newAssignments
        };
    }),
    selectAssignment: (selectedAssignment) => {
        set(() => ({
            selectedAssignment: selectedAssignment,
        }))
    },
}))

export default useAssignmentStore