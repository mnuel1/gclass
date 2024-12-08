// @ts-nocheck

import { create } from "zustand";
import { Assignments, AssignmentType } from "./calendarType";

interface AssignmentState {
  assignment: Assignments;
  selectedAssignment: AssignmentType | null;
  getAssignment: (assignment: Assignments) => void;
  createAssignment: (newAssignment: AssignmentType) => void;
  editAssignment: (assignment: AssignmentType) => void;
  removeAssignment: (assignment_id: string) => void;
  selectAssignment: (assignment: AssignmentType) => void;
}

const useAssignmentStore = create<AssignmentState>((set) => ({
  assignment: {},
  selectedAssignment: null,

  getAssignment: (assignment) => {
    set(() => ({
      assignment: { ...assignment },
    }));
  },
  createAssignment: (newAssignment: AssignmentType) =>
    set((state) => {
      const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = {
          month: "short",
          day: "numeric",
          year: "numeric",
        };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
      };

      const todayDate = formatDate(newAssignment.start_date);

      return {
        assignment: {
          ...state.assignment,
          [todayDate]: [...(state.assignment[todayDate] || []), newAssignment],
        },
      };
    }),
  editAssignment: (updatedAssignment: AssignmentType) =>
    set((state) => {
      const date = updatedAssignment.start_date.split("T")[0];
      const updatedAssignments =
        state.assignment[date]?.map((assignment) =>
          assignment.assignment_id === updatedAssignment.assignment_id
            ? updatedAssignment
            : assignment
        ) || [];

      return {
        assignment: {
          ...state.assignment,
          [date]: updatedAssignments,
        },
      };
    }),
  removeAssignment: (assignment_id: string) =>
    set((state) => {
      const newAssignments = { ...state.assignment };

      Object.keys(newAssignments).forEach((date) => {
        newAssignments[date] = newAssignments[date].filter(
          (assignment) => assignment.assignment_id !== assignment_id
        );
      });

      return {
        assignment: newAssignments,
      };
    }),
  selectAssignment: (selectedAssignment) => {
    set(() => ({
      selectedAssignment: selectedAssignment,
    }));
  },
}));

export default useAssignmentStore;
