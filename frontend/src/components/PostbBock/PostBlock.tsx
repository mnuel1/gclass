import React from 'react'


export const PostBlock:React.FC = () => {

    return (
        <>
            <div className='flex gap-4'>
            
                <div className='flex items-center gap-2 my-2 p-2'>
                    <div className='rounded-full w-[40px] flex justify-center p-2 bg-[green] font-bold flex-none self-start'> T </div>
                    <div className='flex flex-col bg-white p-3 rounded-md'>
                        <div className='flex items-center gap-4'>
                            <h1 className='font-bold'>Teacher Name</h1>
                            <span className='text-xs text-gray-400'>Jan 20, 4:40 PM</span>
                        </div>

                        <h4 className='text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur maiores repellat, 
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
