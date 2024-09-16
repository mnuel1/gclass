import { create } from 'zustand';
import { Assignments } from '../../../types/assignmentType';


interface AssignmentState {
    assignment: Assignments,
    getAssignment: (assignment : Assignments) => void
}

const useAssignmentStore = create<AssignmentState>((set) => ({
    assignment: {},

    getAssignment: (assignment) => {
        set(() => ({
            assignment: {...assignment},
        }))
    },
}))

export default useAssignmentStore