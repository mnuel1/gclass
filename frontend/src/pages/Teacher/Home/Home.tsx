import React from 'react'

import { Classroom } from '../../../components/Classroom/Classroom'


interface dataprops {
    id: string,
    name: string,
    description: string
}

const data : dataprops[] = [
    {
        id: '123131313',
        name: "Classroom 1",
        description: 'this is classroom cool'
    },

    {
        id: '123131313',
        name: "Classroom 2",
        description: 'this is classroom hot'
    },

    {
        id: '123131313',
        name: "Classroom 3",
        description: 'this is classroom warm'
    },

]

export const Home:React.FC = () => {
    
    
    return(
        <>
            <div className='flex flex-col h-full'>

                <div className='bg-white'>
                    <div className='flex items-center justify-between border-b-2 border-gray-300 px-8 py-4'>
                    
                        <h1 className='text-2xl font-bold'>Classes</h1>
                        <div className='flex gap-2'>

                            <button 
                                type='button' 
                                className='flex items-center hover:bg-gray-300 rounded-lg p-2 gap-2 border-2 border-gray-300'                        
                                > 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                                Create Class
                            </button>
                            <button 
                                type='button' 
                                className='flex items-center hover:bg-gray-300 rounded-lg p-2 gap-2 border-2 border-gray-300'                        
                                > 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>


                                Join Class
                            </button>

                        </div>
                        
                    </div>
                </div>
                <div className='flex flex-wrap gap-4 flex-col md:flex-row p-6 bg-white grow'>
                                    
                    {data.map((item, index) => (                    
                        <Classroom key={index} dataprops={item}/>                    
                    ))}          
                                                

                </div>
                
            </div>
            
        </>
    )
}

