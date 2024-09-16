
import React from 'react';
import { DatePicker} from 'antd';

export const DateField:React.FC = () => {
    return (
        <>            
            <DatePicker style={{zIndex:0}}
                showTime
                onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                }}     
            />

           
        </>
    )
  
};
