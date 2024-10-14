interface ActivityType {
    activity_id: string;
    class_id: string;    
    posts: string;    
    created_time: string;
    formatted_created_time: string;
    link: string;
}

export interface Activities {
    [date: string] : ActivityType[]
}