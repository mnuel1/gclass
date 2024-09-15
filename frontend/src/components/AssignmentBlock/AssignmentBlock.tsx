import React from 'react'


export const AssignmentBlock:React.FC<({name: string, date: string})> = ({name, date}) => {

    return (
        <>
            <div className='flex gap-4 cursor-pointer'>
        
                <div className='flex items-center gap-2 my-2 p-2'>
                    
                    <div className='flex flex-col bg-gray-200 p-3 rounded-md '>
                        <div className='flex items-center gap-4'>
                            <h1 className='font-bold'>{name}</h1>
                            <span className='text-xs text-gray-400'>{date}</span>
                        </div>

                        <h4 className='text-sm text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur maiores repellat, 
                            rem maxime eos dolorum unde, aperiam itaque autem assumenda ut accusamus, id culpa recusandae aspernatur voluptates deserunt 
                            debitis perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur maiores repellat, 
                            rem maxime eos dolorum unde, aperiam itaque autem assumenda ut accusamus, id culpa recusandae aspernatur voluptates deserunt 
                            debitis perferendis.</h4>
                    </div>
                    
                </div>

            </div>
        
        </>
    )

}
