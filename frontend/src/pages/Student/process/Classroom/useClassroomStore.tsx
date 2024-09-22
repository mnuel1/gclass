
import { create } from 'zustand';
import { ClassroomTypes } from './classroomTypes';

const defaultClass: ClassroomTypes = {
  class_id: "",
  teacher_id: "",
  teacher_name: "",
  class_string_id: "",
  name: "",
  description: "",
  created_time: new Date()
}

interface ClassroomState {
  classrooms: ClassroomTypes[];
  selectedClassroom: ClassroomTypes;
  getClassrooms: (classrooms : ClassroomTypes[]) => void;
  addClassroom: (classroom: ClassroomTypes) => void;
  deleteClassroom: (class_id: string) => void;
  selectClassroom: (classroom: ClassroomTypes) => void;
}

const useClassroomStore = create<ClassroomState>((set) => ({
  classrooms: [],
  selectedClassroom : defaultClass,
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
  deleteClassroom: (class_id) => {
    set((state) => ({
      classrooms: state.classrooms.filter(
        (classroom) => classroom.class_id !== class_id  
      ),
    }));
  },
  selectClassroom: (classroom) => {
    localStorage.setItem('selectedClassroom', JSON.stringify(classroom));
    set(() => ({
      selectedClassroom : classroom     
    }))
  }
}));

export default useClassroomStore;
