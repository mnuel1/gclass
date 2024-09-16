import React from 'react'

interface Props {
    name: string,
    date:string,
    description: string
}

export const AssignmentBlock:React.FC<Props> = ({name, date, description}) => {

    return (
        <>
            <div className='flex gap-4 cursor-pointer w-full'>
        
                <div className='flex items-center gap-2 my-2 p-2 w-full'>
                    
                    <div className='flex flex-col bg-gray-200 p-3 rounded-md w-full'>
                        <div className='flex items-center gap-4'>
                            <h1 className='font-bold'>{name}</h1>
                            <span className='text-xs text-gray-400'>{date}</span>
                        </div>

                        <h4 className='text-sm text-left'>{description}</h4>
                    </div>
                    
                </div>

            </div>
        
        </>
    )

}
