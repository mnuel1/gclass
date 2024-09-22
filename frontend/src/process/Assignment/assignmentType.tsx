interface AssignedStudents {
    assignment_status : string
    attachments: string
    email_address: string
    form_answers: string
    form_id: string
    fullname: string
    grade: string
    pass_date: string
    student_code: string
    student_id : string
}
export interface AssignmentType {
    assignment_status : string
    attachments: string
    email_address: string
    form_answers: string
    form_id: string
    fullname: string
    grade: string
    pass_date: string
    student_code: string
    student_id : string
    assignment_id: string,
    class_id: string,
    name: string,
    instruction?: string ,
    attachment?: any
    points: string,
    start_date: string,
    due_date: string,
    modified_time: string,
    formatted_start_date: string
    students?: AssignedStudents[]
}

export interface Assignments {
    [date: string] : AssignmentType[]
}