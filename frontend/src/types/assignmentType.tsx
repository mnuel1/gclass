export interface AssignmentType {
    assignment_id: string,
    class_id: string,
    name: string,
    instruction: string,
    attachment: string
    points: string,
    start_date: string,
    due_date: string,
    modified_time: string,
    formatted_start_date: string
}

export interface Assignments {
    [date: string] : AssignmentType[]
}