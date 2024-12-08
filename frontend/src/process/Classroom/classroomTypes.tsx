export interface StudentTypes {
  student_id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email_address: string;
}

export interface ClassroomTypes {
  class_id: string;
  teacher_id: string;
  teacher_name: string;
  class_string_id: string;
  name: string;
  description: string;
  created_time: Date;
  class_students?: StudentTypes[]; // Optional array of students
}
