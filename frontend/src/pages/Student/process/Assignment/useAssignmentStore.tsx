import { create } from 'zustand';
import { Assignments, AssignmentType } from './assignmentType';


interface AssignmentState {
    assignment: Assignments,
    selectedAssignment : AssignmentType | null
    getAssignment: (assignment : Assignments) => void
    createAssignment: (newAssignment : AssignmentType) => void
    editAssignment: (assignment : AssignmentType) => void    
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
    selectAssignment: (selectedAssignment) => {
        set(() => ({
            selectedAssignment: selectedAssignment,
        }))
    },
}))

export default useAssignmentStore