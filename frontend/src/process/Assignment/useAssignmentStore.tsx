import { create } from 'zustand';
import { Assignments, AssignmentType } from './assignmentType';


interface AssignmentState {
    assignment: Assignments,
    selectedAssignment : AssignmentType | null
    getAssignment: (assignment : Assignments) => void
    createAssignment: (newAssignment : AssignmentType) => void
    editAssignment: (assignment : AssignmentType) => void
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
        console.log(newAssignment.start_date);
        
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
                ? updatedAssignment
                : assignment
        ) || [];

        return {
            assignment: {
                ...state.assignment,
                [date]: updatedAssignments
            }
        };
    }),
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