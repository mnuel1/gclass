import React from 'react'

interface Props{
    teacher_name: string;
    posts: string;
    formatted_created_time: string;
    link: string;
}

export const PostBlock:React.FC<Props> = ({teacher_name, posts, formatted_created_time, link}) => {
    console.log(link);
    
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
                        {link &&
                        // <button
                        //     className='mt-4 p-2 rounded-lg flex justify-start items-center gap-4
                        //     bg-blue-600 hover:bg-blue-700 text-white'
                        //     type='button'>
                           

                            <a href={link} className='mt-4 p-2 rounded-lg flex justify-start items-center gap-4
                            bg-blue-600 hover:bg-blue-700 text-white'> 
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            Join Meeting</a>
                        // </button>
                        }
                    </div>                                
                </div>

            </div>
        
        </>
    )

}
