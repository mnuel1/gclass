import React, { useState } from "react"

import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type MainMenuProps = {
    name:string
    children: React.ReactNode
}

const notExpand = "hidden rounded-b-md"
const expand = " border-2 border-gray-200 rounded-b-md"

export const Accordion:React.FC<MainMenuProps> = ({name, children}) => {

    const [collapsed, setCollapsed] = useState(false)

    const handleExpand = () => {        
        setCollapsed(prev => !prev)
    }
    return (
        <>

            <div className="flex border-2 border-gray-200 items-center rounded-t-md  h-[3rem] px-4 py-2 cursor-pointer gap-4 " 
                onClick={handleExpand}>
                {collapsed ? <FaChevronDown/> : <FaChevronUp/> }
                <span className="text-lg font-bold"> {name} </span>
            </div>
            <div className={!collapsed ? expand : notExpand}>
                {children}
            </div>
        
        </>
    )
}