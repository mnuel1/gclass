import React from "react";

type props = {
    name : string;
    icon : React.ReactNode;
    buttonName: string;
    
    
}

export const ContentHeader:React.FC<props> = ({name, icon, buttonName}) => {

    return (
        <div className='flex items-center justify-between border-b-2 border-gray-300 p-4'>                    
            <h1 className='text-2xl font-bold'>{name}</h1>
            <button 
                type='button' 
                className='p-2 bg-gray-600 rounded-md text-white flex 
                items-center gap-2 hover:bg-gray-700'
                // onClick={isClick}
                > 
                {icon}
                {buttonName}
            </button>
        </div>
    )
}