import React from 'react';
import { Input } from 'antd';

interface TextfieldProps {
    value: string;
    setValue: (value: string) => void;
}


export const Textfield: React.FC<TextfieldProps> = ({ value, setValue }) => (
    <Input 
        placeholder="" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}/>
)

