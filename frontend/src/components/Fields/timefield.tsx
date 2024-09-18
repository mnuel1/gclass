
import React from 'react';

type props = {    
    value: string;
    setValue: (value: string) => void;
}

export const TimeField:React.FC<props> = ({value, setValue}) => {
    return (
        <>            
            <input 
            value={value}
            className='mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm p-4 
            border focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
            onChange={(e) => setValue(e.target.value)}
            type="time" />

           
        </>
    )
  
};
