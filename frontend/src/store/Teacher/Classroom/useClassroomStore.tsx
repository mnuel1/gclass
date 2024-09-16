
import { create } from 'zustand';
import { ClassroomTypes } from '../../../types/classroomTypes';


interface ClassroomState {
  classrooms: ClassroomTypes[];
  getClassrooms: (classrooms : ClassroomTypes[]) => void
  addClassroom: (classroom: ClassroomTypes) => void;
  joinClassroom: (classroomId: string) => void;
  addMemberClassroom: (studentID: string[]) => void;
  editClassroom: (id: string) => void;
  deleteClassroom: (id: string) => void;
}

const useClassroomStore = create<ClassroomState>((set) => ({
  classrooms: [],
  
  getClassrooms: (classrooms) =>{      
    set(() => ({
      classrooms: [...classrooms],       
    }))   
  },      
  addClassroom: (newClassroom) =>{
    set((state) => ({
      classrooms: [...state.classrooms, newClassroom],
    }))
  },

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
