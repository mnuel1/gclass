import React from 'react'

interface Props{
    teacher_name: string    
    posts: string,    
    formatted_created_time: string
}

export const PostBlock:React.FC<Props> = ({teacher_name, posts, formatted_created_time}) => {

    return (
        <>
            <div className='flex gap-4 w-full'>        
                <div className='flex items-center gap-2 my-2 p-2 w-full'>
                    <div className='rounded-full w-[40px] flex justify-center 
                    p-2 bg-blue-300 font-bold flex-none self-start'> {teacher_name.charAt(0).toUpperCase()} </div>
                    <div className='flex flex-col bg-gray-200 p-3 rounded-lg w-full'>
                        <div className='flex items-center gap-4'>
                            <h1 className='font-bold'>{teacher_name}</h1>
                            <span className='text-xs text-gray-400'>{formatted_created_time}</span>
                        </div>

                        <div className="meeting-post" dangerouslySetInnerHTML={{ __html: posts }} />
                    </div>                                
                </div>

            </div>
        
        </>
    )

}
