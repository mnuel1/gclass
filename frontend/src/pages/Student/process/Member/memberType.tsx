export interface Member {    
    student_id: string,    
    fullname: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    email_address: string,    
    created_time: string,
    student_ids?: string[]
    assignment_status : string
    attachments: string
    form_answers: string
    form_id: string    
    grade: string
    pass_date: string
    student_code: string    

}