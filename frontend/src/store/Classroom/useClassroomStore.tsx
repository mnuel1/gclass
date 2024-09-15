// src/stores/useClassroomStore.ts
import { create } from 'zustand';

interface Classroom {
  id: string;
  name: string;
  description: string;
}

interface ClassroomState {
  classrooms: Classroom[];
  addClassroom: (classroom: Classroom) => void;
  joinClassroom: (classroomId: string) => void;
  addMemberClassroom: (studentID: string[]) => void;
  editClassroom: (id: string) => void;
  deleteClassroom: (id: string) => void;
}

const useClassroomStore = create<ClassroomState>((set) => ({
  classrooms: [
    {
      id: '123131313',
      name: "Classroom 1",
      description: 'this is classroom cool',
    },
    {
      id: '123131314',
      name: "Classroom 2",
      description: 'this is classroom hot',
    },
    {
      id: '123131315',
      name: "Classroom 3",
      description: 'this is classroom warm',
    },
  ],
  
  addClassroom: (newClassroom) =>
    set((state) => ({
      classrooms: [...state.classrooms, newClassroom],
    })),

  joinClassroom: (classroomId) => {
    console.log(`Joined classroom with ID: ${classroomId}`);
  },

  addMemberClassroom: (studentID) => {
      console.log('call service')
  },
  editClassroom: (id) => {
    console.log('call service')
  },
  deleteClassroom: (id) => {
    console.log('call service')
  },
}));

export default useClassroomStore;
