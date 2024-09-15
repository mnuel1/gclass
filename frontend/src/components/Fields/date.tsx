
import React from 'react';
import { DatePicker} from 'antd';

type props = {
    name : string;
    
}

export const DateField:React.FC<props> = ({name}) => {
    return (
        <>
            <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
            >
            {name}  
            </label>
            <DatePicker
                showTime
                onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                }}     
            />
        </>
    )
  
};
