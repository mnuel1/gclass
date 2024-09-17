
import { create } from 'zustand';
import { ClassroomTypes } from '../../../types/classroomTypes';


interface ClassroomState {
  classrooms: ClassroomTypes[];
  getClassrooms: (classrooms : ClassroomTypes[]) => void
  addClassroom: (classroom: ClassroomTypes) => void;
  joinClassroom: (classroomId: string) => void;
  addMemberClassroom: (studentID: string[]) => void;
  editClassroom: (classData: ClassroomTypes) => void;
  deleteClassroom: (class_id: string) => void;
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
  editClassroom: (classData) => {
    set((state) => ({
      classrooms: state.classrooms.map((classroom) =>
        classroom.class_id === classData.class_id
          ? { ...classroom, ...classData }  
          : classroom
      ),
    }));
  },

  deleteClassroom: (class_id) => {
    set((state) => ({
      classrooms: state.classrooms.filter(
        (classroom) => classroom.class_id !== class_id  
      ),
    }));
  },
}));

export default useClassroomStore;
